<template>
  <div>
    <h1>管理画面トップページ</h1>
    <p>ここは管理者専用のページです。</p>
  </div>
</template>

<script>
export default {
  middleware: "auth", // 認証ミドルウェアを適用
};
</script>
