<template>
   <div>
     <q-input 
      v-model="currentTask" 
      :placeholder="$t('TODO.ADD')" 
      dense
      outlined
      rounded
      class="new-task q-mt-md"
      @keyup.enter="addTask" 
     />
     <q-list>
       <q-item
         v-for="(task, index) in tasks"
         :key="index"
         :class="{ 'completed-task': completedTasks.includes(index) }"
       >
         <q-item-section>
           <q-item-label>{{ task }}</q-item-label>
         </q-item-section>
         <q-item-section side>
           <q-btn 
           icon="delete" 
           text-color="red"
           @click="deleteTask(index)" />
           <q-btn icon="edit" @click="editTask(index)" />
           <q-btn
             icon="done"
             @click="toggleTaskCompletion(index)"
             :color="completedTasks.includes(index) ? 'green' : 'secondary'"
           />
         </q-item-section>
       </q-item>
     </q-list>
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
       currentTask: '',
       tasks: [],
       completedTasks: [],
       editingIndex: -1,
     };
   },
   methods: {
     addTask() {
       if (this.currentTask.trim() !== '') {
         if (this.editingIndex !== -1) {
            this.tasks[this.editingIndex] = this.currentTask;
            this.editingIndex = -1;
         } else {
            this.tasks.push(this.currentTask);
         }
         this.currentTask = '';
       }
     },
     deleteTask(index) {
       this.tasks.splice(index, 1);
       this.removeTaskFromCompleted(index);
     },
     editTask(index) {
       this.currentTask = this.tasks[index];
       this.editingIndex = index;
     },
     toggleTaskCompletion(index) {
       if (this.completedTasks.includes(index)) {
         this.removeTaskFromCompleted(index);
       } else {
         this.completedTasks.push(index);
       }
     },
     removeTaskFromCompleted(index) {
       const completedIndex = this.completedTasks.indexOf(index);
       if (completedIndex !== -1) {
         this.completedTasks.splice(completedIndex, 1);
       }
     },
   },
 };
 </script>
 
 <style scoped>
 .completed-task {
   text-decoration: line-through;
   opacity: 0.6;
 }
 </style>
 