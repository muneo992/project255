import { createAuth0Client } from '@auth0/auth0-spa-js';

export default defineNuxtPlugin(async (nuxtApp) => {
  // クライアントサイドでのみ実行
  if (process.server) return;

  const auth0 = await createAuth0Client({
    domain: 'YOUR_AUTH0_DOMAIN',
    clientId: 'YOUR_AUTH0_CLIENT_ID',
    authorizationParams: {
      redirect_uri: window.location.origin, // クライアントサイドでのみ使用可能
    },
  });

  nuxtApp.provide('auth0', auth0);
});
