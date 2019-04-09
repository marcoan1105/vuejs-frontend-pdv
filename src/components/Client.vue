<template>
    <div>
        <div class="row">
            <div class="col-md-9">
                <label for="name">Nome</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="col-md-3">
                <label for="name">Documento</label>
                <input type="text" class="form-control" v-model="document">
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <label for="name">Endereço</label>
                <input type="text" class="form-control" v-model="address">
            </div>
            <div class="col-md-3">
                <label for="name">Numero</label>
                <input type="number" class="form-control" v-model="number">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <label for="name">Observação</label>
                <input type="text" class="form-control" v-model="obs">
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label for="name">Telefone</label>
                <input type="text" class="form-control" v-model="phone">
            </div>
            <div class="col-md-4">
                <label for="name">Email</label>
                <input type="text" class="form-control" v-model="email">
            </div>
            <div class="col-md-2">
                <br>
                <button class="btn btn-success" @click="saveClient()">Salvar</button>
            </div>
            <div class="col-md-2">
                <br>
                <button class="btn btn-warning" @click="clearClient()">Limpar</button>
            </div>
        </div>
        <br>
        <br>
        <div class="row" v-for="(client, i) in clients">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">{{client.name}}</div>
                    <div class="col-md-4">{{client.document}}</div>
                    <div class="col-md-2">
                        <button class="btn btn-primary btn-block" @click="clientChange(i)">Editar</button>
                    </div>
                    </div>
                    <br>
            </div>  
        </div>

        <api ref="api"></api>
    </div>
</template>

<script>
import api from './API.vue'

export default {
    name: 'client',
    components: {
        api
    },
    data(){
        return {
	        name: "",
	        document: "",
	        address: "",
	        number: "",
	        obs: "",
	        phone: "",
            email: "",
            id: "",
            clients: []
        }
    },
    methods: {
        clearClient(){
            this.name = "";
	        this.document = "";
	        this.address = "";
	        this.number = "";
	        this.obs = "";
	        this.phone = "";
            this.email = "";
            this.id = "";
        },
        saveClient(){
            var data = {
                name: this.name,
                document: this.document,
                address: this.address,
                number: this.number,
                obs: this.obs,
                phone: this.phone,
                email: this.email,
                id: this.id
            }

            this.$refs.api.saveClient(data, (data) => {
                this.clearClient();
                this.getAllClients();
            });
        },
        getAllClients(){
            let form = this;

            this.$refs.api.getAllClients((data) => {
                console.log(data);
                form.clients = data.body;
            });
        },
        clientChange(i){
            this.name = this.clients[i].name;
	        this.document = this.clients[i].document;
	        this.address = this.clients[i].address;
	        this.number = this.clients[i].number;
	        this.obs = this.clients[i].obs;
	        this.phone = this.clients[i].phone;
            this.email = this.clients[i].email;
            this.id = this.clients[i].id;
        }
    },
    mounted(){
        if(!localStorage.getItem('login') || localStorage.getItem('login') == 'false'){
            this.$router.push('/home');
        }
        
        this.getAllClients();
    }

}
</script>

<style>

</style>
