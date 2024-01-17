<template>
   <div
    class="full-width column"
   >
     <q-input 
        v-model="currentTask" 
        :placeholder="$t('TODO.ADD')" 
        dense
        outlined
        rounded
        class="q-mt-md q-mr-xl q-ml-xl q-mb-lg"
        @keyup.enter="addTask" 
     />
     <q-list
      v-if="tasks.length"
     >
       <q-card
         v-for="(task, index) in tasks"
         :key="index"
         bordered
         :class="{ 'completed-task': completedTasks.includes(index) }"
          class="task-card"
         >
         <q-item-section>
           <span
            class="text-bold h4 text-center"
            v-html="task"
           />
         </q-item-section>

         <q-separator/>

         <q-item-section side>
           <q-btn 
            icon="delete" 
            text-color="red"
            unelevated
            class="q-mb-sm"
            @click="deleteTask(index)" 
           />

           <q-btn 
            icon="edit" 
            unelevated
            class="q-mb-sm"
            @click="editTask(index)" 
           />

           <q-btn
             icon="done"
             unelevated
             :color="completedTasks.includes(index) ? 'green' : 'secondary'"
             @click="toggleTaskCompletion(index)"
           />
         </q-item-section>
       </q-card>
     </q-list>
     <span 
      v-else 
      v-html="$t('TODO.EMPTY_STATE')"
      class="text-center"
     />
   </div>
 </template>
 
 <script>
 export default {
   data() {
     return {
       currentTask: null,
       tasks: [],
       completedTasks: [],
       editingIndex: -1,
     };
   },
   methods: {
     addTask() {
         if (this.editingIndex !== -1) {
            this.tasks[this.editingIndex] = this.currentTask;
            this.editingIndex = -1;
         } else {
            this.tasks.push(this.currentTask);
         }
         this.currentTask = '';
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

 .task-card{
  max-width: 60%;
  margin: auto;
 }
 </style>
 