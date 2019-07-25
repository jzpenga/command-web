import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'
import './plugins/element.js'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import './icons' // icon
import '@/styles/index.scss' // global css
import './permission' // permission control


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
