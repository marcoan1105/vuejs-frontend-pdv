<template>
    <div>
        <h2>Venda</h2>
        <div class="row">
            <div class="col-md-9">
            </div>
            <div class="col-md-3">
                <button class="btn btn-primary btn-block" @click="newSale">Nova Venda</button>
            </div>
        </div>
        <br>
        <div v-if="!paymentSale">
            <div class="row">
                <div class="col-md-9">
                    <label for="client">Cliente:</label>
                    <select id="client" class="form-control" v-model="client">
                        <option v-for="(client, i) in clients" v-bind:value="client.id" :disabled="blockedForm">{{ client.name }}</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="discount">Desconto:</label>
                    <input class="form-control" type="text" v-model="discount" :disabled="blockedForm">
                </div>
            </div>
            <div class="row">
                <div class="col-md-7">
                    <label for="product">Produtos:</label>
                    <select id="product" class="form-control" v-model="product" :disabled="blockedForm">
                        <option v-for="(product, i) in products" v-bind:value="i">{{ product.description }}</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="quant">Quantidade:</label>
                    <input class="form-control" type="number" v-model="quant" :disabled="blockedForm">
                </div>
                <div class="col-md-2">
                    <br>
                    <button class="btn btn-primary btn-block" @click="addProduct" :disabled="blockedForm">Adicionar</button>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-8"></div>
                <div class="col-md-2">Valor Final: {{ final_value }}</div>
                <div class="col-md-2">
                    <button class="btn btn-success btn-block" @click="movePayment(true)" :disabled="blockedForm">Pagamento</button>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-6">
                            Descrição:
                        </div>
                        <div class="col-md-2">
                            Quant:
                        </div>
                        <div class="col-md-2">
                            Valor Final:
                        </div>
                        <div class="col-md-2">

                        </div>
                    </div>
                    <br>
                    <div class="row" v-for="(product_sale, i) in products_sale" style="margin-bottom: 20px;">
                        <div class="col-md-6">
                            {{ product_sale.product_description }}
                        </div>
                        <div class="col-md-2">
                            {{ product_sale.quant }}
                        </div>
                        <div class="col-md-2">
                            {{ product_sale.final_value }}
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-danger btn-block" @click="removeProduct(i)" :disabled="blockedForm">Remover</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="paymentSale">
            <div class="row">
                <div class="col-md-2">
                    <button class="btn btn-success btn-block" @click="movePayment(false)" :disabled="blockedForm">Voltar</button>
                </div>
                <div class="col-md-8">

                </div>
                <div class="col-md-2">
                    <button class="btn btn-success btn-block" @click="finishSale()" :disabled="blockedForm">Finalizar Venda</button>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-2">
                </div>
                <div class="col-md-8">

                </div>
                <div class="col-md-2">
                    Restante: {{ restant_value }}
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-8">
                    <label for="payment">Pagamentos:</label>
                    <select id="payment" class="form-control" v-model="payment" :disabled="blockedForm">
                        <option v-for="(payment, i) in payments" v-bind:value="i">{{ payment.description }}</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="value_payment">Valor:</label>
                    <input class="form-control" v-model="value_payment" :disabled="blockedForm">
                </div>
                <div class="col-md-2">
                    <br>
                    <button class="btn btn-danger btn-block" @click="addPayment()" :disabled="blockedForm">Adicionar</button>
                </div>
            </div>
            <br>
            <div class="row" v-for="(payment, i) in payments_sale" style="margin-bottom: 20px;">
                <div class="col-md-7">
                    {{ payment.description }}
                </div>
                <div class="col-md-3">
                    {{ payment.value }}
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary btn-block" @click="removePayment(i)" :disabled="blockedForm">Remover</button>
                </div>
            </div>
        </div>        
        <api ref="api"></api>
    </div>
</template>

<script>
import api from './API.vue'

export default {
    name: 'sale',
    components: {
        api
    },
    data(){
        return {
            //client
            client: "",
            clients: [],

            //product
            product: "",
            products: [],
            quant: "",

            //products sale
            products_sale: [],

            //final value
            discount: "",
            final_value: 0,

            //payment sale
            paymentSale: false,
            payment: "",
            payments: [],
            payments_sale: [],
            value_payment: "",
            restant_value: 0,

            //form
            blockedForm: false
        }
    },
    methods: {
        getAllClients(){
            let form = this;
            this.$refs.api.getAllClients((data) => {
                data.body.unshift({
                    name: "SELECIONE",
                    id: ""
                });
                form.clients = data.body;
            });
        },
        getAllProducts(){
            let form = this;
            this.$refs.api.getAllProducts((data) => {
                data.body.unshift({
                    description: "SELECIONE",
                    id: ""
                });
                form.products = data.body;
            });
        },
        getAllPayments(){
            let form = this;
            this.$refs.api.getAllPayments((data) => {
                data.body.unshift({
                    description: "SELECIONE",
                    id: ""
                });

                form.payments = data.body;
            });
        },
        addProduct(){
            if(this.product == ""){
                this.$swal('Opss', 'Selecione um produto.', 'warning');
                return;
            }

            if(this.quant == ""){
                this.$swal('Opss', 'Informe uma quantidade.', 'warning');
                return;
            }

            this.products_sale.push({
                product_id: this.products[this.product].id,
                product_description: this.products[this.product].description,
                quant: this.quant,
                value: this.products[this.product].value,
                final_value: this.quant * this.products[this.product].value
            });
            
            this.clearProduct();
        },
        removeProduct(i){
            this.products_sale.splice(i, 1);
            this.getFinalValueSale();
        },
        getFinalValueSale(){
            var final_value = 0;
            
            for(var i = 0; i < this.products_sale.length; i++){
                final_value += this.products_sale[i].final_value;
            }

            this.final_value = final_value;
        },
        addPayment(){

            if(this.payment == ""){
                this.$swal('Opss', 'Selecione uma forma de pagamento.', 'warning');
                return;
            }

            if(this.value_payment == ""){
                this.$swal('Opss', 'Informe um valor para o pagamento.', 'warning');
                return;
            }

            if(parseFloat(this.value_payment) <= 0){
                this.$swal('Opss', 'O valor do pagamento deve ser maior que 0,00.', 'warning');
                return;
            }

            if(this.value_payment > this.restant_value){
                this.$swal('Opss', 'O valor do pagamento é maior que o valor restante.', 'warning');
                return;
            }

            this.restant_value -= this.value_payment;

            this.payments_sale.push({
                payment_id: this.payments[this.payment].id,
                description: this.payments[this.payment].description,
                value: this.value_payment
            });
            
            this.clearPayment();
        },
        clearPayment(){
            this.payment = "";
            this.value_payment = "";
        },
        clearProduct(){
            this.product = "";
            this.quant = "";
            this.getFinalValueSale();
        },
        removePayment(i){
            this.restant_value += parseFloat(this.payments_sale[i].value);
            this.payments_sale.splice(i, 1);
        },
        movePayment(paymentStatus){
            if(paymentStatus){
                if(this.final_value == 0){
                    this.$swal('Opss', 'O valor do pedido deve ser maior que 0,00', 'warning');
                    return;
                }

                if(this.client == ""){
                    this.$swal('Opss', 'Selecione um cliente.', 'warning');
                    return;
                }
                
                if(this.discount == ""){
                    this.discount = 0;
                }
                this.restant_value = this.final_value - this.discount;
                this.payments_sale = [];
            }
            this.paymentSale = paymentStatus;
        },
        finishSale(){
            let form = this;
            if(this.restant_value > 0){
                this.$swal('Opss', 'Você possuí valores restantes.', 'warning');
                return;
            }

            var date = new Date();

            this.$refs.api.sendSale({
                client_id: this.client,
                total: this.final_value,
                discount: this.discount,
                final_value: this.final_value - this.discount,
                date: date.getFullYear()+"-"+(("0"+(date.getMonth() + 1)).slice(-2))+"-"+("0"+date.getDate()).slice(-2)+" "+date.getHours()+":"+date.getMinutes(),
                products: this.products_sale,
                payments: this.payments_sale
            }, (data) => {
                if(data.body.status){
                    this.$swal('Sucesso', 'Venda realizada com sucesso.', 'success');
                    form.blockedForm = true;
                }else{
                    this.$swal('Opss', 'Algo deu errado, verifique com o administrador do sistema.', 'warning');
                }
            });
        },
        newSale(){
            this.blockedForm = false;
            this.clearPayment();
            this.clearProduct();
            this.payments_sale = [];
            this.products_sale = [];
            this.client = "";
            this.discount = "";
            this.getFinalValueSale();
            this.movePayment(false);
        }
    },
    mounted(){
        if(!localStorage.getItem('login') || localStorage.getItem('login') == 'false'){
            this.$router.push('/home');
        }
        
        this.getAllClients();
        this.getAllProducts();
        this.getAllPayments();
    }
}
</script>

<style>

</style>
