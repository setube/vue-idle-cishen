import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.mount('#app')
