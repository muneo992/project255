import { writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  // 静的サイト生成を有効化
  target: 'static',

  generate: {
    // 静的ルートの動的生成
    routes: (): string[] => {
      const contentDir = path.resolve('./content/cars');

      // ディレクトリが存在しない場合の処理
      if (!existsSync(contentDir)) {
        console.warn(`Directory ${contentDir} does not exist.`);
        return ['/', '/admin'];
      }

      try {
        // ファイルを読み込み、動的ルートを生成
        const carFiles = readdirSync(contentDir)
          .filter((file: string) => statSync(path.join(contentDir, file)).isFile())
          .map((file: string) => `/cars/${encodeURIComponent(file.replace(/\.md$/, ''))}`);

        console.log('Generated routes:', carFiles);
        return ['/', '/admin', ...carFiles];
      } catch (error) {
        console.error('Error generating routes:', error);
        return ['/', '/admin'];
      }
    },
  },

  // Nuxt Content モジュールの設定
  content: {
    documentDriven: true,
  },

  // Nitro の設定
  nitro: {
    compatibilityDate: '2025-05-16',
    output: {
      publicDir: './dist', // 出力ディレクトリ
    },
    publicAssets: [
      {
        dir: 'public', // 静的アセットのディレクトリ
        baseURL: '/', // ベースURL
      },
    ],
  },

  // ビルド後のフック処理
  hooks: {
    'build:done'() {
      const distDir = './dist';
      try {
        // 出力ディレクトリが存在しない場合は作成
        if (!existsSync(distDir)) {
          mkdirSync(distDir);
        }
        // Netlify 用の _redirects ファイル生成
        const redirects = `
/admin/*    /admin/index.html   200
/*          /index.html         200
`;
        writeFileSync(`${distDir}/_redirects`, redirects.trim());
        console.log('_redirects file generated successfully.');
      } catch (error) {
        console.error('Error generating _redirects file:', error.message);
      }
    },
  },

  // プラグイン設定
  plugins: [{ src: '~/plugins/auth0.js', mode: 'client' }],

  // モジュール設定
  modules: ['@nuxt/content'],

  // ランタイム設定
  runtimeConfig: {
    public: {},
    private: {
      // 環境変数から管理者のユーザー名とパスワードを取得
      adminUsername: process.env.ADMIN_MUNEO || 'defaultUsername', // デフォルト値を設定
      adminPassword: process.env.ADMIN_816 || 'defaultPassword', // デフォルト値を設定
    },
  },
});




    
  

