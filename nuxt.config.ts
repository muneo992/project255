import { writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  target: 'static',

  generate: {
    routes: (): string[] => {
      const contentDir = path.resolve('./content/cars');

      if (!existsSync(contentDir)) {
        console.warn(`Directory ${contentDir} does not exist.`);
        return ['/', '/admin'];
      }

      try {
        const carFiles = readdirSync(contentDir)
          .filter((file: string) => statSync(path.join(contentDir, file)).isDirectory())
          .map((dir: string) => `/cars/${encodeURIComponent(dir)}`);

        console.log('Generated routes:', carFiles);
        return ['/', '/admin', ...carFiles];
      } catch (error) {
        console.error('Error generating routes:', error);
        return ['/', '/admin'];
      }
    },
  },

  content: {
    documentDriven: true,
  },

  nitro: {
    compatibilityDate: '2025-05-16',
    output: {
      publicDir: 'dist',
    },
    publicAssets: [
      {
        dir: 'public',
        baseURL: '/',
      },
    ],
  },

  hooks: {
    'build:done'() {
      const distDir = './dist';
      try {
        if (!existsSync(distDir)) {
          mkdirSync(distDir);
        }
        const redirects = `
/admin/*    /admin/index.html   200
/*          /index.html         200
`;
        writeFileSync(`${distDir}/_redirects`, redirects.trim());
        console.log('_redirects file generated successfully.');
      } catch (error) {
        console.error('Error generating _redirects file:', error);
      }
    },
  },

  plugins: [{ src: '~/plugins/auth0.js', mode: 'client' }],
  modules: ['@nuxt/content'],
  runtimeConfig: {
    public: {},
    private: {
      adminUsername: process.env.ADMIN_MUNEO,
      adminPassword: process.env.ADMIN_816,
    },
  },
});


    
  

