import { ref } from 'vue';

const tasks = ref([]);
const completedTasks = ref([]);

const addTask = (currentTask, editingIndex) => {
  if (editingIndex !== -1) {
    tasks.value[editingIndex] = currentTask;
    editingIndex = -1;
  } else {
    tasks.value.push(currentTask);
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  removeTaskFromCompleted(index);
};

const editTask = (index) => {
  return tasks.value[index];
};

const toggleTaskCompletion = (index) => {
  if (completedTasks.value.includes(index)) {
    removeTaskFromCompleted(index);
  } else {
    completedTasks.value.push(index);
  }
};

const removeTaskFromCompleted = (index) => {
  const completedIndex = completedTasks.value.indexOf(index);
  if (completedIndex !== -1) {
    completedTasks.value.splice(completedIndex, 1);
  }
};

export default {
  tasks,
  completedTasks,
  addTask,
  deleteTask,
  editTask,
  toggleTaskCompletion,
};