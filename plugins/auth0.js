import { createAuth0Client } from '@auth0/auth0-spa-js';

export default defineNuxtPlugin(async (nuxtApp) => {
  const auth0Client = await createAuth0Client({
    domain: 'dev-olkr47luvghfb4t5.us.auth0.com',
    clientId: 'IHA75IDoCPFQcPHneVkn4viHW6eE1KWc',
    authorizationParams: {
      redirect_uri: window.location.origin, // 認証後のリダイレクト先
    },
  });

  // リダイレクト後の処理
  const query = new URLSearchParams(window.location.search);
  if (query.has('code') && query.has('state')) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/'); // 必要に応じてリダイレクト先を変更
  }

  nuxtApp.provide('auth0', auth0Client);
});

