<template>
  <div class="full-width column">

    <q-separator />

    <div class="q-mt-md text-center">
      <q-btn
        :label="$t('TODO.END_BACKLOG')"
        color="secondary"
        no-caps
        dense
        @click="saveBacklog"
      />
    </div>

    <q-input
      v-model="currentTask"
      :placeholder="$t('TODO.ADD')"
      dense
      outlined
      rounded
      class="q-mt-md q-mr-xl q-ml-xl q-mb-lg"
      @keyup.enter="handleAddTask"
    />

    <q-list v-if="tasks.length">
      <q-card
        v-for="(task, index) in tasks"
        :key="index"
        bordered
        :class="{ 'completed-task': completedTasks.includes(index) }"
        class="task-card"
      >
        <q-item-section>
          <span class="text-bold h4 text-center" v-html="task" />
        </q-item-section>

        <q-separator />

        <q-item-section side>
          <q-btn
            icon="delete"
            text-color="red"
            unelevated
            class="q-mb-sm"
            @click="deleteTask(index)"
          />

          <q-btn icon="edit" unelevated class="q-mb-sm" @click="editTask(index)" />

          <q-btn
            icon="done"
            unelevated
            :color="completedTasks.includes(index) ? 'green' : 'secondary'"
            @click="toggleTaskCompletion(index)"
          />
        </q-item-section>
      </q-card>
    </q-list>

    <span v-else v-html="$t('TODO.EMPTY_STATE')" class="text-center" />
  </div>
</template>

<script>
import TaskService from '@/services/TaskService';
import BacklogService from '@/services/BacklogService';
import { ref } from 'vue';

export default {
  setup() {
    const { tasks, completedTasks, addTask, deleteTask, editTask, toggleTaskCompletion } = TaskService;
    const currentTask = ref('');
    const editingIndex = ref(-1);

    const handleAddTask = () => {
      addTask(currentTask.value, editingIndex.value);
      currentTask.value = '';
    };

    const saveBacklog = () => {
      BacklogService.saveBacklog(tasks.value, completedTasks.value);

      tasks.value = [];
      completedTasks.value = [];
    };

    return {
      currentTask,
      editingIndex,
      tasks,
      completedTasks,
      handleAddTask,
      deleteTask,
      editTask,
      toggleTaskCompletion,
      saveBacklog,
    };
  },
};
</script>

<style scoped>
.completed-task {
  text-decoration: line-through;
  opacity: 0.6;
}

.task-card {
  max-width: 60%;
  margin: auto;
}
</style>
