-- ============================================================================
-- FetalCardio — доступ курсантов (отдельный проект Supabase, не Академия УЗИ).
-- Скрипт 1 из 2. Запустить ОДИН раз в НОВОМ проекте:
-- Supabase → SQL Editor → New query → вставить всё → Run.
--
-- Что создаётся:
--   groups    — учебные группы
--   profiles  — курсанты и преподаватель (по одному на аккаунт), статус и срок доступа
-- Вход: логин + код от преподавателя или самостоятельная регистрация по почте
-- (заявка ждёт подтверждения). Один аккаунт курсанта — одно устройство.
-- Правила доступа (RLS): курсант видит только себя; преподаватель — всех.
-- ============================================================================

-- ---------- таблицы ----------
create table public.groups (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (length(trim(name)) between 1 and 80),
  created_at  timestamptz not null default now()
);

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text not null default '' check (length(full_name) <= 120),
  login         text unique check (login ~ '^[a-z0-9][a-z0-9._-]{2,31}$'),  -- только у аккаунтов «по коду»
  role          text not null default 'student' check (role in ('student', 'teacher')),
  status        text not null default 'pending' check (status in ('pending', 'active', 'blocked')),
  group_id      uuid references public.groups(id) on delete set null,
  access_until  timestamptz,                                                 -- пусто = без срока
  created_at    timestamptz not null default now()
);

-- ---------- вспомогательные функции ----------
create function public.is_teacher() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'teacher' and status = 'active');
$$;

-- «активен» = подтверждён и срок не истёк
create function public.is_active() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and status = 'active'
                 and (access_until is null or access_until > now()));
$$;

create function public.my_group() returns uuid
language sql stable security definer set search_path = public as $$
  select group_id from profiles where id = auth.uid();
$$;

-- ---------- новый аккаунт → профиль ----------
-- Самостоятельная регистрация → профиль «на подтверждении» (pending).
-- Аккаунты «по коду» создаёт только серверная функция преподавателя (app_metadata.by_teacher = true);
-- Supabase Auth записывает app_metadata вторым шагом, поэтому они создаются заблокированными
-- и активируются триггером на обновление.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, full_name, status)
  values (
    new.id,
    left(coalesce(trim(new.raw_user_meta_data ->> 'full_name'), ''), 120),
    case when new.email like '%@fetalcardio.invalid' then 'blocked' else 'pending' end
  );
  return new;
end;
$$;

create function public.handle_teacher_created() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if coalesce((new.raw_app_meta_data ->> 'by_teacher')::boolean, false)
     and not coalesce((old.raw_app_meta_data ->> 'by_teacher')::boolean, false) then
    update profiles set
      login     = new.raw_app_meta_data ->> 'login',
      status    = 'active',
      group_id  = nullif(new.raw_app_meta_data ->> 'group_id', '')::uuid,
      full_name = case when full_name = '' then left(coalesce(trim(new.raw_user_meta_data ->> 'full_name'), ''), 120) else full_name end
    where id = new.id;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create trigger on_auth_user_by_teacher
  after update of raw_app_meta_data on auth.users
  for each row execute function public.handle_teacher_created();

-- ---------- действия преподавателя ----------
create function public.teacher_set_student(p_user uuid, p_status text, p_group uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not is_teacher() then raise exception 'Только для преподавателя'; end if;
  if p_status not in ('pending', 'active', 'blocked') then raise exception 'Неверный статус'; end if;
  update profiles set status = p_status, group_id = p_group where id = p_user and role = 'student';
  if not found then raise exception 'Курсант не найден'; end if;
end;
$$;

create function public.teacher_rename(p_user uuid, p_full_name text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not is_teacher() then raise exception 'Только для преподавателя'; end if;
  update profiles set full_name = left(trim(p_full_name), 120) where id = p_user;
end;
$$;

create function public.teacher_set_access(p_user uuid, p_until timestamptz)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not is_teacher() then raise exception 'Только для преподавателя'; end if;
  update profiles set access_until = p_until where id = p_user and role = 'student';
  if not found then raise exception 'Курсант не найден'; end if;
end;
$$;

create function public.teacher_set_group_access(p_group uuid, p_until timestamptz)
returns integer language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  if not is_teacher() then raise exception 'Только для преподавателя'; end if;
  update profiles set access_until = p_until where group_id = p_group and role = 'student';
  get diagnostics n = row_count;
  return n;
end;
$$;

-- почта и время последнего входа (служебная таблица Auth) — только преподавателю
create function public.teacher_users_meta()
returns table (id uuid, email text, last_sign_in_at timestamptz, created_at timestamptz)
language plpgsql stable security definer set search_path = public, auth as $$
begin
  if not is_teacher() then raise exception 'Только для преподавателя'; end if;
  return query
    select u.id,
           case when u.email like '%@fetalcardio.invalid' then null else u.email::text end,
           u.last_sign_in_at, u.created_at
      from auth.users u;
end;
$$;

-- выход курсанта со всех устройств («Отключить», «Новый код»)
create function public.teacher_revoke_sessions(p_user uuid)
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if not is_teacher() then raise exception 'Только для преподавателя'; end if;
  if exists (select 1 from profiles where id = p_user and role = 'teacher') then
    raise exception 'Нельзя завершить сеансы преподавателя';
  end if;
  delete from auth.refresh_tokens where user_id = p_user::text;
  delete from auth.sessions where user_id = p_user;
end;
$$;

-- один аккаунт курсанта — одно устройство: при входе прежние сеансы завершаются
create function public.keep_only_this_session()
returns integer language plpgsql security definer set search_path = public, auth as $$
declare
  me uuid := auth.uid();
  sid uuid := nullif(auth.jwt() ->> 'session_id', '')::uuid;
  n integer;
begin
  if me is null or sid is null then return 0; end if;
  if exists (select 1 from profiles where id = me and role = 'teacher') then return 0; end if;
  delete from auth.refresh_tokens where user_id = me::text and session_id is distinct from sid;
  delete from auth.sessions where user_id = me and id <> sid;
  get diagnostics n = row_count;
  return n;
end;
$$;

-- ---------- права ----------
revoke all on function public.teacher_set_student(uuid, text, uuid), public.teacher_rename(uuid, text),
  public.teacher_set_access(uuid, timestamptz), public.teacher_set_group_access(uuid, timestamptz),
  public.teacher_users_meta(), public.teacher_revoke_sessions(uuid), public.keep_only_this_session() from anon, public;
grant execute on function public.teacher_set_student(uuid, text, uuid), public.teacher_rename(uuid, text),
  public.teacher_set_access(uuid, timestamptz), public.teacher_set_group_access(uuid, timestamptz),
  public.teacher_users_meta(), public.teacher_revoke_sessions(uuid), public.keep_only_this_session() to authenticated;

-- ---------- правила доступа (RLS) ----------
alter table public.groups   enable row level security;
alter table public.profiles enable row level security;
revoke all on public.groups, public.profiles from anon;

create policy groups_select on public.groups for select to authenticated
  using (is_teacher() or id = my_group());
create policy groups_write on public.groups for all to authenticated
  using (is_teacher()) with check (is_teacher());

-- профиль: курсант видит только себя и ничего не меняет (ФИО, статус, срок — только преподаватель)
create policy profiles_select on public.profiles for select to authenticated
  using (id = auth.uid() or is_teacher());
revoke insert, update, delete on public.profiles from authenticated;
