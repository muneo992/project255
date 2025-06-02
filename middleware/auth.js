export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $auth0 } = useNuxtApp();

  // ユーザーが認証済みか確認
  const isAuthenticated = await $auth0.isAuthenticated();
  if (!isAuthenticated) {
    // 未認証の場合、GitHubログイン画面へリダイレクト
    return $auth0.loginWithRedirect({
      authorizationParams: {
        connection: 'github', // GitHub接続を指定
        appState: { targetUrl: to.fullPath }, // ログイン後にリダイレクトするURL
      },
    });
  }
});
