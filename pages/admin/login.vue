<template>
  <div class="login-page">
    <h1>管理画面ログイン</h1>
    <p>管理者専用のログインページです。</p>
    <button @click="login">ログイン</button>
  </div>
</template>

<script>
import { getAuth0Client } from "~/plugins/auth0";

export default {
  methods: {
    async login() {
      const auth0 = await getAuth0Client();
      // Auth0のログインフローを開始
      await auth0.loginWithRedirect({
        redirect_uri: `${window.location.origin}/admin`, // ログイン後のリダイレクト先
      });
    },
  },
};
</script>

<style>
.login-page {
  text-align: center;
  margin-top: 50px;
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
