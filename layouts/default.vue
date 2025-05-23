<template>
  <div>
    <header>
      <h1>My Nuxt App</h1>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <p>© 2025 My Nuxt App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
};
</script>

<style scoped>
header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  text-align: center;
}
main {
  padding: 2rem;
}
footer {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}
</style>
