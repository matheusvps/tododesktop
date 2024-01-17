<template>
   <div>
     <q-img src="@/assets/todo.png" class="logo" />
     <div class="links">
       <q-btn
         :label="$t('TASKS')"
         icon="list"
         no-caps
         dense
         color="primary"
         class="q-mr-sm"
       >
         <router-link :to="RoutesNames.TODO.PATH"/>
       </q-btn>
 
       <q-btn
         :label="$t('BACKLOG')"
         icon="history"
         color="primary"
         no-caps
         dense
       >
         <router-link :to="RoutesNames.BACKLOG.PATH"/>
       </q-btn>
     </div>
     <router-view />
   </div>
 </template>
 
 <script>
 import { RoutesNames } from '@/router/RoutesNames';
 
 export default {
   name: 'App',
   data: function () {
     return {
       RoutesNames: RoutesNames,
     }
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
 