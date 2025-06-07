export default defineNuxtRouteMiddleware(async (to, from) => {
  // 認証が不要なルートの場合はスキップ
  if (!to.meta.auth) {
    return;
  }

  const { $auth0 } = useNuxtApp();
  const env = process.env.NODE_ENV;

  // 開発環境の場合のみログを出力
  if (env === 'development') {
    console.log('Middleware triggered for route:', to.fullPath);
  }

  try {
    // 認証状態を確認
    const isAuthenticated = await $auth0.isAuthenticated();

    if (env === 'development') {
      console.log('User is authenticated:', isAuthenticated);
    }

    // 認証されていない場合はログインページへリダイレクト
    if (!isAuthenticated) {
      if (env === 'development') {
        console.log('User is not authenticated, redirecting...');
      }

      // 認証プロバイダーを動的に設定（デフォルトは GitHub）
      const provider = to.query.provider || 'github';

      return $auth0.loginWithRedirect({
        authorizationParams: {
          connection: provider,
          appState: { targetUrl: to.fullPath }, // 元のページに戻るための状態を保存
        },
      });
    }

    // 認証後のリダイレクト処理（必要に応じて追加）
    const appState = await $auth0.handleRedirectCallback();
    if (appState?.targetUrl) {
      return navigateTo(appState.targetUrl);
    }

  } catch (error) {
    // エラーが発生した場合の処理
    console.error('Error in middleware:', error);

    // エラーページにリダイレクト
    return navigateTo('/error');
  }
});

