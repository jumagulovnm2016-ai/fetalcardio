# Генератор схемы атласа 4CV

`atlas/4cv-normal.svg` собирается скриптом, руками SVG не правится.

- `build_svg.py` — геометрия (координаты камер, перегородок, клапанов) и подписи 1–17.
- `build_4cv.py` — отрисовка в объёмном стиле, неровный трабекулярный край желудочков.

```bash
pip install svgpathtools numpy matplotlib
cd tools/atlas && python3 build_4cv.py ../../atlas/4cv-normal.svg
```

После сборки: `npm test` и `python3 tests/e2e.py` (проверяют подписи, слои и анатомические соотношения).
