import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { readFileSync } from 'fs-extra'; // ファイル操作用
import path from 'path';

export default defineNuxtConfig({
  target: 'static',

  generate: {
    async routes() {
      // `content/cars` フォルダ内の全ファイルを取得
      const contentDir = path.resolve('./content/cars');
      const carFiles = readFileSync(contentDir, { withFileTypes: true })
        .filter(file => file.isDirectory())
        .map(dir => `/cars/${dir.name}`); // 動的ルートを生成

      return ['/', '/admin', ...carFiles];
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
        const redirects = '/*    /index.html   200\n';
        writeFileSync(`${distDir}/_redirects`, redirects);
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
