<template>
  <div>ログイン処理中...</div>
</template>

<script>
import { getAuth0Client } from "~/plugins/auth0";

export default {
  async mounted() {
    const auth0 = await getAuth0Client();
    await auth0.handleRedirectCallback();
    const user = await auth0.getUser();
    console.log("ログイン成功:", user);
    this.$router.push("/");
  },
};
</script>
