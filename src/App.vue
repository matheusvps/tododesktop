<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  height: 140px;
  max-width: 300px;
}
</style>
