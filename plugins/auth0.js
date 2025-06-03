import { createAuth0Client } from '@auth0/auth0-spa-js';

export default defineNuxtPlugin(async (nuxtApp) => {
  const auth0Client = await createAuth0Client({
    domain: process.env.dev-olkr47luvghfb4t5.us.auth0.com,
    clientId: process.env.IHA75IDoCPFQcPHneVkn4viHW6eE1KWc,
    authorizationParams: {
      redirect_uri: window.location.origin, // 認証後のリダイレクト先
    },
  });

  // リダイレクト後の処理
  const query = new URLSearchParams(window.location.search);
  if (query.has('code') && query.has('state')) {
    try {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, '/'); // 必要に応じてリダイレクト先を変更
    } catch (error) {
      console.error('Error handling redirect callback:', error);
    }
  }

  // 認証済みのセッションを確認
  try {
    const token = await auth0Client.getTokenSilently();
    console.log('User is authenticated, token:', token);
  } catch (error) {
    console.log('User is not authenticated:', error);
  }

  nuxtApp.provide('auth0', auth0Client);
});

