<template>
    <div id="app-menu">
        <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand" href="/">PDV</a>
            <a class="navbar-brand" v-if="loginValid" href="#/product">Produtos</a>
            <a class="navbar-brand" v-if="loginValid" href="#/payment">Pagamentos</a>
            <a class="navbar-brand" v-if="loginValid" href="#/client">Cliente</a>
            <a class="navbar-brand" v-if="loginValid" href="#/sale">Venda</a>
            <a class="navbar-brand" v-if="loginValid" href="#/salelist">Todas as Vendas</a>
            <Login ref="login"
                :setLoginMenu="setLoginMenu"
            ></Login>
        </nav>
    </div>
</template>

<script>
import Login from './Login.vue'

export default {
    name: 'app-menu',
    data(){
        return {
            loginValid: false
        }
    },
    components: {
        Login
    },
    methods: {
        setLoginMenu(login){
            this.loginValid = login;
        }
    }
}
</script>

<style>

</style>
