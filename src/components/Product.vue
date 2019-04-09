<template>
    <div>
        <h2>Produtos</h2>
        <div class="row">
            <div class="col-md-12">
                <label for="description">Descrição:</label>
                <input type="text" class="form-control" id="description" v-model="description">
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label for="unit">Unidade:</label>
                <input type="text" class="form-control" id="unit" v-model="unit">
            </div>
            <div class="col-md-4">
                <label for="ncm">NCM</label>
                <input type="text" class="form-control" id="ncm" v-model="ncm">
            </div>
            <div class="col-md-4">
                <label for="value">Valor:</label>
                <input type="text" class="form-control" id="value" v-model="value">
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                <label for="barcode">Barras:</label>
                <input type="text" class="form-control" id="barcode" v-model="barcode">
            </div>
            <div class="col-md-3">
                <label for="quantities">Quantidade:</label>
                <input type="text" class="form-control" id="quantities" v-model="quantities">
            </div>
            <div class="col-md-2">
                <br>
                <button class="btn btn-success btn-block" @click="saveProduct()">Salvar</button>
            </div>
            <div class="col-md-2">
                <br>
                <button class="btn btn-warning btn-block" @click="clearProduct()">Limpar</button>
            </div>
        
        </div>
        <br>
        <br>
        <div class="row" v-for="(prod, i) in products">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6">{{prod.description}}</div>
                    <div class="col-md-2">{{prod.value}}</div>
                    <div class="col-md-2">{{prod.quantities}}</div>
                    <div class="col-md-2">
                        <button class="btn btn-primary btn-block" @click="changeProduct(i)">Editar</button>
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
    name: 'product',
    data(){
        return { 
            description: "",
            unit: "",
            ncm: "",
            value: "",
            barcode: "",
            quantities: "",
            id: "",
            products: []
        }
    },
    components: {
        api
    },
    methods: {
        saveProduct(){
            var data = {
                description: this.description,
                unit: this.unit,
                ncm: this.ncm,
                value: this.value,
                barcode: this.barcode,
                quantities: this.quantities,
                id: this.id
            };
            this.$refs.api.saveProduct(data, (data) => {
                this.clearProduct();
                this.getAllProducts();
            })
        },
        clearProduct(){
            this.description = "";
            this.unit = "";
            this.ncm = "";
            this.value = "";
            this.barcode = "";
            this.quantities = "";
            this.id = "";
        },
        changeProduct(i){
            this.description = this.products[i].description;
            this.unit = this.products[i].unit;
            this.ncm = this.products[i].ncm;
            this.value = this.products[i].value;
            this.barcode = this.products[i].barcode;
            this.quantities = this.products[i].quantities;
            this.id = this.products[i].id;
        },
        getAllProducts(){
            let from = this;
            this.$refs.api.getAllProducts((data) => {
                from.products = data.body;
            });
        }
    },
    mounted(){
        if(!localStorage.getItem('login') || localStorage.getItem('login') == 'false'){
            this.$router.push('/home');
        }
        
        this.getAllProducts();
    }
}
</script>

<style>

</style>
