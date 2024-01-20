<template>
  <div class="app">
    <q-img src="./assets/todo.png" class="logo" />
    <div class="links q-mb-lg">
      <q-btn
        :label="$t('TASKS')"
        icon="list"
        no-caps
        dense
        color="primary"
        class="q-mr-sm"
        @click="goToToDoList"
      />
      <q-btn
        :label="$t('BACKLOG.TITLE')"
        icon="history"
        color="primary"
        no-caps
        dense
        @click="goToBacklog"
      />
    </div>
    <router-view />
  </div>
</template>

<script>
import { RoutesNames } from './router/RoutesNames';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();

    const goToBacklog = () => {
      if (router) {
        router.push(RoutesNames.BACKLOG.PATH);
      }
    };

    const goToToDoList = () => {
      if (router) {
        router.push(RoutesNames.TODO.PATH);
      }
    };

    return {
      goToBacklog,
      goToToDoList,
    };
  },
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
