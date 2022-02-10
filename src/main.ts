import './styles/font.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '~/utils/rem'
import './styles/index.scss'

const app = createApp(App)
app.use(router)
app.mount('#app')
