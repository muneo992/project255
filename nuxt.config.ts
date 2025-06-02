import { writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import path from 'path';

export default defineNuxtConfig({
  target: 'static',

  generate: {
    async routes() {
      // `content/cars` フォルダ内の全ファイルを取得
      const contentDir = path.resolve('./content/cars');
      
      // エラーハンドリング: ディレクトリが存在しない場合
      if (!existsSync(contentDir)) {
        console.warn(`Directory ${contentDir} does not exist.`);
        return ['/', '/admin'];
      }

      try {
        // ディレクトリ内のサブディレクトリを取得
        const carFiles = readdirSync(contentDir)
          .filter(file => statSync(path.join(contentDir, file)).isDirectory()) // ディレクトリのみ取得
          .map(dir => `/cars/${encodeURIComponent(dir)}`); // 動的ルートを生成

        console.log('Generated routes:', carFiles); // デバッグ用ログ
        return ['/', '/admin', ...carFiles];
      } catch (error) {
        console.error('Error generating routes:', error);
        return ['/', '/admin']; // エラー発生時のフォールバック
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
