<template>
  <div class="hello">
    <input
      ref="fileInput"
      type="file"
      @change="handleFileSelection"
      directory
      webkitdirectory
      style="display: none"
    />

    <q-btn
      filled
      outlined
      dense
      label="Selecione uma pasta"
      @click="$refs.fileInput.click()"
    />
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

export default {
  name: 'BackLog',
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
