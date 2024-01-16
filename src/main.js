import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n/i18n'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router/index'

console.debug(i18n, 'i18n');

createApp(App).use(router).use(Quasar, quasarUserOptions).use(i18n).mount('#app')
