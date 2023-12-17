import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import '@/assets/css/main.css';

createApp(App).use(router).use(ToastPlugin).mount('#app')
