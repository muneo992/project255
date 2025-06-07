<template>
  <div>
    <h1>ダッシュボード</h1>
    <p>ここは管理者専用のダッシュボードです。</p>
  </div>
</template>

<script>
export default {
  middleware: "auth", // 認証ミドルウェアを適用
};
</script>
