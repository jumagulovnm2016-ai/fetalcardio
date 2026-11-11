-- ============================================================================
-- FetalCardio — скрипт 2 из 2: сделать себя преподавателем.
-- Запустить ПОСЛЕ того, как вы зарегистрировались в FetalCardio
-- (Личный кабинет → Регистрация по почте). Если почта другая — замените адрес.
-- ============================================================================
update public.profiles
   set role = 'teacher', status = 'active', access_until = null
 where id = (select id from auth.users where email = 'jumagulovnm2016@gmail.com');

-- проверка: должна вернуться одна строка с role = teacher
select p.full_name, u.email, p.role, p.status
  from public.profiles p join auth.users u on u.id = p.id
 where p.role = 'teacher';
