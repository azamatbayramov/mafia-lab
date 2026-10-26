# Mafia Lab

Интерактивный русскоязычный учебник по спортивной мафии: статьи, схемы игрового стола, упражнения и разборы игровых ситуаций.

## Технологии

- **Astro + Starlight** — статические статьи, навигация и поиск.
- **MDX** — интерактивные компоненты внутри материалов.
- **React + TypeScript** — интерактивные схемы и тренажёры.
- **GitHub Pages** — бесплатный статический хостинг.

Ни backend, ни база данных для первой версии не нужны.

## Локальный запуск

Требуется Node.js 24 (см. `.nvmrc`).

```bash
npm install
npm run dev
```

Открой адрес, который выведет Astro в терминале (путь включает `/mafia-lab/`).

## Проверки

```bash
npm run test
npm run check
npm run build
```

## Добавление статей

Статьи находятся в `src/content/docs/` и пишутся на Markdown или MDX.

- `basics/` — вводные материалы;
- `reasoning/` — анализ игровых ситуаций;
- `src/components/` — переиспользуемые React-компоненты;
- `src/data/scenarios/` — данные интерактивных примеров.

Пример: `src/content/docs/reasoning/relationships.mdx`.

## Публикация

Workflow `.github/workflows/deploy.yml` публикует сборку после пуша в `main`.

1. В репозитории открой **Settings → Pages**.
2. В разделе **Build and deployment** установи **Source: GitHub Actions**.
3. После мержа и успешного workflow сайт будет доступен по адресу:
   **https://azamatbayramov.github.io/mafia-lab/**

Конфигурация `site` и `base` находится в `astro.config.mjs`.

> Это авторский образовательный ресурс, неофициальный сайт FSM. Игровые наблюдения, стратегические гипотезы и формальные правила нельзя смешивать.
