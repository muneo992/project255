// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true, // サーバーサイドレンダリング（必要に応じて false に設定）
  pages: true, // デフォルトは true
  components: true, // コンポーネントの自動インポートを有効化
  modules: ['@nuxt/content'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true }
});
