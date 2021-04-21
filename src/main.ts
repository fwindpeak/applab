import { createApp } from 'vue'
import App from './App.vue'
import 'vant/lib/index.css'
import Vant from 'vant'

const app = createApp(App)
app.use(Vant)

app.mount('#app')
