import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index.js';
import BaseDialog from './components/ui/BaseDialog.vue';

const app = createApp(App);
app.component('base-dialog', BaseDialog);
app.use(store);
app.use(router);
app.mount('#app');
