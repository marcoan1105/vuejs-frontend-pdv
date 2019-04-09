import Vue from 'vue'
import App from './App.vue'

// extensões utilizadas
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueSweetalert2 from 'vue-sweetalert2'

// arquivos de rotas
import router from './router'

// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueSweetalert2)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
