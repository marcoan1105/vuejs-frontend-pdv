<template>
    <div>
        <div class="form-inline" v-if="!loginValid">
            <input type="email" class="form-control mr-sm-2" placeholder="Usuario" v-model="email">

            <input type="password" class="form-control  mr-sm-2" placeholder="Senha" id="password" v-model="password">

            <button class="btn btn-success my-2 my-sm-0" @click="getUserLogin()">Logar</button>

            <a class="btn btn-primary my-2 my-sm-0" style="margin-left: 25px;"  href="#/user">Cadastrar</a>
        </div>

        <div class="form-inline" v-if="loginValid">
            <div class="navbar-brand">Bem vindo {{ nameLogin }}</div>
            <button class="btn btn-danger my-2 my-sm-0" @click="quitUser" >Sair</button>
        </div>
        <api ref="api"></api>
    </div>    
</template>

<script>
import api from './API.vue'
export default {
    name: 'login',
    components: {
        api
    },
    props: {
        setLoginMenu: Function
    },
    data(){
        return {
            nameLogin: "",
            loginValid: false,

            // inputs
            email: "",
            password: ""
        }
    },
    methods: {
        getUserLogin(){
            let form = this;

            this.$refs.api.getTokens(this.email, this.password, (data) => {
                localStorage.setItem('access_token', data.body.access_token)
                localStorage.setItem('refresh_token', data.body.refresh_token)
                localStorage.setItem('login', 'true')

                this.$router.push('home')
                form.loginValid = true;
                this.setLoginMenu(true);
                this.getDataUser();
            }, (data) => {
                this.$swal('Opss...', 'Verifique o usuario e a senha e tente novamente.', 'warning');
            });
        },
        verifyDataUser(){
            var loginValid = localStorage.getItem('login');

            if(loginValid){
                if(loginValid == 'true'){
                    this.loginValid = true;
                    this.getDataUser();
                    this.setLoginMenu(true);
                }else{
                    this.setLoginMenu(false);
                }
            }else{
                this.setLoginMenu(false);
            }
        },
        getDataUser(){
            let form = this;
            this.$refs.api.getDataUser((data) => {
                form.nameLogin = data.body.data.name;
                localStorage.setItem('userData', JSON.stringify(data.body.data));
            });
        },
        quitUser(){
            localStorage.setItem('access_token', "");
            localStorage.setItem('refresh_token', "");
            localStorage.setItem('login', 'false');
            localStorage.setItem('userData', '');

            location.reload();
        }  
    },
    mounted(){
        this.verifyDataUser();
    }
}
</script>
<style>

</style>

)