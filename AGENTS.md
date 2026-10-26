# Working on Mafia Lab

## Goal

Build a Russian-language, readable, interactive educational site about competitive sports mafia using Astro, Starlight, MDX and small React islands. Deploy statically to GitHub Pages; do not introduce backend services for simple learning exercises.

## Content rules

- Write Russian explanations in a concise, natural style. Explain specialist terms before using them.
- Distinguish **observed events**, **interpretations** and **decisions** explicitly.
- Never infer a player's hidden team or role from a single speech, vote or relationship line.
- Mark invented game examples as hypothetical. Never present invented scenarios as tournament records.
- For formal FSM rules, use a verifiable current regulation and state which regulation is used. Separate tournament rules from local meta and strategy.
- Prefer the structure: concept → concrete game example → interaction → interpretation → common mistake.

## Engineering rules

- Keep articles in `src/content/docs/`; Starlight owns routing and navigation.
- Implement reusable interactive widgets in `src/components/`. Hydrate only where needed using Astro client directives.
- Store scenario state as JSON in `src/data/scenarios/`. Make widgets data-driven.
- Ensure mobile layouts, keyboard-operable controls and meaningful labels.
- Preserve the GitHub Pages base path `/mafia-lab`; prefer relative internal links in Markdown/MDX.
- Keep dependencies minimal; no hidden API keys or third-party telemetry.
- Run `npm run test`, `npm run check`, and `npm run build` before proposing a merge.
