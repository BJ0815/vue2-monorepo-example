import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storeModule from './plugins/storeModule'
import detectBrowser from './plugins/detectBrowser'

Vue.config.productionTip = false
Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.config.devtools = process.env.NODE_ENV !== 'production'

Vue.use(storeModule)
Vue.use(detectBrowser)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
