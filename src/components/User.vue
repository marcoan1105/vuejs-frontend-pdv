<template>
    <div>
        <div class="row">
            <div class="col-md-5">
                <label for="name">Nome:</label>
                <input type="email" class="form-control" id="name" v-model="name">
            </div>
            <div class="col-md-5">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="col-md-2">
                <br>
                <button class="btn btn-primary btn-block" @click="sendUser">Cadastrar</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label for="password">Senha: </label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="col-md-6">
                <label for="repassword">Repetir Senha: </label>
                <input type="password" class="form-control" id="repassword" v-model="repassword">
            </div>
        </div>
        <api ref="api"></api>
    </div>    
</template>

<script>
import api from './API.vue'

export default {
    name: 'user',
    data(){
        return {
           name: "",
           email: "",
           password: "",
           repassword: "" 
        }
    },
    components: {
        api
    },
    methods: {
        sendUser(){
            if(this.name == ""){
                this.$swal('Opss...', 'É necessário um nome.', 'warning');
                return;
            }

            if(this.email == ""){
                this.$swal('Opss...', 'É necessário um email.', 'warning');
                return;
            }

            if(this.password == ""){
                this.$swal('Opss...', 'É necessário um senha.', 'warning');
                return;
            }

            if(this.repassword == ""){
                this.$swal('Opss...', 'Digite novamente a senha.', 'warning');
                return;
            }

            if(this.password != this.repassword){
                this.$swal('Opss...', 'As senhas não correspondem.', 'warning');
                return;
            }

            this.$refs.api.createNewUser({
                name: this.name,
                email: this.email,
                password: this.password
            }, (data) => {
                if(data.body.status){
                    this.$swal('Sucesso', 'Usuário cadastrado com sucesso, realize o login para continuar.', 'success');
                    this.$router.push('/home');
                }else{
                    this.$swal('Opss...', 'Esse e-mail já está cadastrado em nosso sistema.', 'warning');
                }      
            });

        }
    }
}
</script>

<style>

</style>
