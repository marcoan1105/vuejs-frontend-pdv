import VueRouter from 'vue-router'

// modulos das rotas
import Home from './components/Home.vue'
import User from './components/User.vue'
import Payment from './components/Payment.vue'
import Product from './components/Product.vue'
import Client from './components/Client.vue'
import Sale from './components/Sale.vue'
import SaleList from './components/SaleList.vue'

// const de rotas
const routes = [
    { path: '/',  component: Home },
    { path: '/home',  component: Home },
    { path: '/user',  component: User },
    { path: '/payment', component: Payment },
    { path: '/product', component: Product},
    { path: '/client', component: Client},
    { path: '/sale', component: Sale},
    { path: '/salelist', component: SaleList}
]

const router = new VueRouter({
    routes
})

export default router