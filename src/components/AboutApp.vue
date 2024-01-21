<template>
   <div
      class="absolute-top-right"
   >
      <q-btn
         icon="info"
         size="20px"
         unelevated
         round
         class="cursor-pointer q-mr-md absolute-top-right"
         @click="openDialog"
      />

      <q-dialog v-model="dialogVisible" persistent>
         <q-card>

            <q-card-section class="q-pa-md text-bold text-center">
               <div>{{ $t('ABOUT.TITLE') }}</div>
            </q-card-section>

            <q-separator/>

            <q-card-section class="q-pa-md">
               <div v-html="formatDescription($t('ABOUT.DESCRIPTION'))"></div>
            </q-card-section>

            <q-card-actions vertical>
               <q-btn label="Fechar" color="primary" @click="closeDialog" />
            </q-card-actions>
            
         </q-card>
      </q-dialog>
   </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'AboutApp',
  setup() {
    const dialogVisible = ref(false);

    const openDialog = () => {
      dialogVisible.value = true;
    };

    const closeDialog = () => {
      dialogVisible.value = false;
    };

    return {
      dialogVisible,
      openDialog,
      closeDialog,
    };
  },
  methods: {
   formatDescription(description) {
      return description.replace(/\./g, '.<br>');
   },
  }
}
</script>