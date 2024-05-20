import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


createApp(App).use(router).use(bootstrap).mount('#app')
