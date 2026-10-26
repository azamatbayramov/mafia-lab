import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://azamatbayramov.github.io',
  base: '/mafia-lab',
  integrations: [
    starlight({
      title: 'Mafia Lab',
      description: 'Интерактивный учебник по спортивной мафии: логика, аргументы, игровые ситуации.',
      locales: {
        root: { label: 'Русский', lang: 'ru' },
      },
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/azamatbayramov/mafia-lab',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/azamatbayramov/mafia-lab/edit/main/',
      },
      sidebar: [
        { label: 'Основы', items: [{ autogenerate: { directory: 'basics' } }] },
        { label: 'Игровое мышление', items: [{ autogenerate: { directory: 'reasoning' } }] },
      ],
    }),
    react(),
  ],
});
