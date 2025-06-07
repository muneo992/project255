<template>
  <div>
    <header class="admin-header">
      <h1>管理画面ヘッダー</h1>
      <button @click="login">ログイン</button>
    </header>
    <main>
      <nuxt /> <!-- 各管理画面ページのコンテンツがここに表示される -->
    </main>
  </div>
</template>

<script>
import { getAuth0Client } from "~/plugins/auth0";

export default {
  methods: {
    async login() {
      const auth0 = await getAuth0Client();
      await auth0.loginWithRedirect();
    },
  },
};
</script>

<style>
.admin-header {
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
