<template>
  <div class="full-width column">

    <about-app/>

    <q-separator/>

    <div class="q-mt-md text-center">
      <input
        ref="fileInput"
        type="file"
        @change="handleFileSelection"
        directory
        multiple
        webkitdirectory
        style="display: none"
      />

      <q-btn
        filled
        outlined
        no-caps
        dense
        color="secondary"
        class="directory-button text-center"
        :label="$t('BACKLOG.PICK_DIRECTORY')"
        @click="$refs.fileInput.click()"
      />
    </div>
    
    <q-spinner v-if="loading" />

    <div v-if="backlogData.length">
      <div v-for="(day, index) in backlogData" :key="index">
        <h3>{{ day.date }}</h3>

        <div>
          <strong>{{ $t('BACKLOG.COMPLETED_TASKS') }}</strong>
          <ul v-if="day.completedTasks.lenght">
            <li v-for="task in day.completedTasks" :key="task.name">{{ task.name }}</li>
          </ul>
          <div
            v-else
            v-html="$t('BACKLOG.EMPTY_FINISHED')"
          />
        </div>

        <div>
          <strong>{{ $t('BACKLOG.NOT_FINISHED_TASKS') }}</strong>
          <ul>
            <li v-for="task in day.incompleteTasks" :key="task.name">{{ task.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BacklogService from '@/services/BacklogService';
import AboutApp from '@/components/AboutApp.vue';

export default {
  name: 'BackLog',
  components: {
    AboutApp,
  },
  data() {
    return {
      loading: false,
      backlogData: [],
    };
  },
  methods: {
    handleFileSelection(event) {
      const file = event.target.files[0];
      if (file) {
        this.importBacklogFromFile(file);
      }
    },
    async importBacklogFromFile(file) {
      this.loading = true;

      try {
        const content = await this.readFileAsync(file);
        const backlogData = BacklogService.importBacklog(content);
        this.backlogData = backlogData;
      } catch (error) {
        console.error('Erro ao importar o Backlog:', error);
      } finally {
        this.loading = false;
      }
    },
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    },
  },
};
</script>

<style scoped>
.directory-button {
  max-width: 200px;
}
</style>
