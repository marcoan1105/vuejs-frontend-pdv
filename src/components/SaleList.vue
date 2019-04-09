<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-2">Codigo</div>
                    <div class="col-md-2">Data</div>
                    <div class="col-md-2">Total</div>
                    <div class="col-md-2">Desconto</div>
                    <div class="col-md-2">Valor Final</div>
                    <div class="col-md-2">
                    </div>
                </div>
                <br>
                <div class="row" v-for="sale in sales" style="margin-bottom: 15px;">
                    <div class="col-md-2">{{ sale.id }}</div>
                    <div class="col-md-2">{{ sale.date }}</div>
                    <div class="col-md-2">{{ sale.total}}</div>
                    <div class="col-md-2">{{ sale.discount}}</div>
                    <div class="col-md-2">{{ sale.final_value}}</div>
                    <div class="col-md-2">
                        <button class="btn btn-warning btn-block" @click="showSale(sale.id)" v-b-modal.modal-1>Visualizar</button>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="modal-1" size="lg" title="Venda" ok-only>
            <div class="row">
                <div class="col-md-12"><h3>Venda: {{ sale.id }}</h3></div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-12"><h4>Cliente: {{ sale.client_id }}</h4></div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-4">
                    <h4>Valor Total: {{ sale.total }}</h4>
                </div>
                <div class="col-md-4">
                    <h4>Desconto: {{ sale.discount }}</h4>
                </div>
                <div class="col-md-4">
                   <h4> Valor Final: {{ sale.final_value }}</h4>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <h4>Produtos:</h4>
                </div>
            </div>
            <br>
            <div class="row" style="margin-bottom: 15px">
                <div class="col-md-3">Id do Produto</div>
                <div class="col-md-3">Quantidade</div>
                <div class="col-md-3">Valor Un</div>
                <div class="col-md-3">Valor Final</div>
            </div>
            <div class="row" v-for="product in sale.products" style="margin-bottom: 15px">
                <div class="col-md-3">{{ product.product_id }}</div>
                <div class="col-md-3">{{ product.quant }}</div>
                <div class="col-md-3">{{ product.value }}</div>
                <div class="col-md-3">{{ (product.value * product.quant) }}</div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <h4>Produtos:</h4>
                </div>
            </div>
            <br>
            <div class="row" style="margin-bottom: 15px">
                <div class="col-md-6">Id do Pagamento</div>
                <div class="col-md-6">Valor do Produto</div>
            </div>
            <div class="row" v-for="payment in sale.payments" style="margin-bottom: 15px">
                <div class="col-md-6">{{ payment.payment_id }}</div>
                <div class="col-md-6">{{ payment.value }}</div>
            </div>

        </b-modal>

    
        <api ref="api"></api>
    </div>
</template>

<script>
import api from './API.vue'

export default {
    name: 'salelist',
    components: {
        api
    },
    data(){
        return {
            sales: [],
            sale: {
                id: "",
                client_id: "",
                total: "",
                discount: "",
                date: "",
                final_value: "",
                payments: [],
                products: [],
            }
        }
    },
    methods:{
        getAllSales(){
            let form = this;
    
            this.$refs.api.getSales((data) => {
                form.sales = data.body;
            });
        },
        showSale(id){
            var form = this;

            this.$refs.api.getSale(id, (data) => {
                form.sale = data.body.data;
            });
        }
    },
    mounted(){
        if(!localStorage.getItem('login') || localStorage.getItem('login') == 'false'){
            this.$router.push('/home');
        }
        
        this.getAllSales();
    }
}
</script>

<style>

</style>
