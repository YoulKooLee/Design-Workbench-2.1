import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/fonts/index.css'
import '@/styles/common/chrome.css'
import '@/styles/common/global.css'
import '@/styles/common/components.css'
import '@/styles/common/fa-icons.css'
import '@/styles/common/command.css'
import '@/styles/common/surface-fx.css'
import App from './App.vue'
import router from './router'
import { installFaIcons } from '@/plugins/fa-icons'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ArcoVue)
installFaIcons(app)
app.mount('#app')
