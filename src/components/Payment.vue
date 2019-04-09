<template>
    <div>
        <h2>Pagamentos</h2>
        <div class="row">
        <div class="col-md-6">
            <label for="description">Descrição:</label>
            <input type="text" class="form-control" id="description" v-model="description">
        </div>
        <div class="col-md-2">
            <label for="type">Tipo:</label>
            <select class="form-control" id="type" v-model="type">
            <option value="1">01 - Dinheiro</option>
            <option value="2">02 - Cheque</option>
            <option value="3">03 - Cartão</option>
            </select>
        </div>
        <div class="col-md-2">
            <br>
            <button class="btn btn-success" @click="savePayment()">Salvar</button>
        </div>
        <div class="col-md-2">
            <br>
            <button class="btn btn-warning" @click="clearPayment()">Limpar</button>
            </div>
        </div>

        <br>
        <br>
        <div class="row" v-for="(payment, i) in payments">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-8">{{payment.description}}</div>
                    <div class="col-md-2">{{payment.type}}</div>
                    <div class="col-md-2">
                        <button class="btn btn-primary btn-block" @click="changePayment(i)">Editar</button>
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
    name: 'payment',
    components: {
        api
    },
    data(){
        return {
            description: "",
            type: "1",
            id: "",
            payments: []
        }
    },
    methods: {
        savePayment(){
            var data = {
                description: this.description,
                type: this.type,
                id: this.id
            }

            this.$refs.api.savePayment(data, (data) => {
                this.clearPayment();
                this.getAllPayments();                
            });
        },
        clearPayment(){
            this.description = "";
            this.type = "";
            this.id = "";
        },
        changePayment(i){
            this.description = this.payments[i].description;
            this.type = this.payments[i].type;
            this.id = this.payments[i].id;
        },
        getAllPayments(){
            let form = this;
            this.$refs.api.getAllPayments((data) => {
                form.payments = data.body;
            });
        }
    },
    mounted(){
        if(!localStorage.getItem('login') || localStorage.getItem('login') == 'false'){
            this.$router.push('/home');
        }
        
        this.getAllPayments();
    }
}
</script>

<style>

</style>
