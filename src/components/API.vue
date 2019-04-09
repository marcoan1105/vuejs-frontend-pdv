<template>
    <div>

    </div>
</template>

<script>
// classe responsavel pela comunicação com a API do back end

export default {
    name: 'api',
    data: () => {
        return {

            //dados para comunicação com back end
            urlBackEnd: 'http://localhost:8000',
            client_secret: 'sY4GgS00nh5Jdl8Vkm1E5TCMLcH2uXfjQvxhDL19',
            client_id: '2',
            grant_type: 'password'
        }
    },
    methods: {
        getTokens(username, password, callback, callbackError){
            this.post("/oauth/token", {
                grant_type: this.grant_type,
                client_id: this.client_id,
                client_secret: this.client_secret,
                username: username,
                password: password
            }, callback, callbackError)
        },

        getDataUser(callback){
            this.get("/user", callback, null);
        },

        createNewUser(data, callback){
            this.put("/user", data, callback, null);
        },

        savePayment(data, callback){
            if(data.id == ""){
                this.put("/payment", data, callback, null);
            }else{
                this.post("/payment/"+data.id, data, callback, null);
            }
        },
        getAllPayments(callback){
            this.get("/payments", callback, null);
        },
        
        saveProduct(data, callback){
            if(data.id == ""){
                this.put("/product", data, callback, null);
            }else{
                this.post("/product/"+data.id, data, callback, null);
            }
        },

        getAllProducts(callback){
            this.get("/products", callback, null);
        },

        saveClient(data, callback){
            if(data.id == ""){
                this.put("/customer", data, callback, null);
            }else{
                this.post("/customer/"+data.id, data, callback, null);
            }
        },

        sendSale(data, callback){
            this.post("/sale", data, callback, null);
        },

        getSales(callback){
            this.get('/sales', callback, null);
        },

        getSale(id, callback){
            this.get('/sale/'+id, callback, null);
        },

        getAllClients(callback){
            this.get("/customers", callback, null);
        },

        post(url, data, callback, callbackError){
            this.$http.post(this.urlBackEnd.toString() + url.toString(), data, {headers: this.getHeaders()}).then(callback, callbackError);
        },

        get(url, callback, callbackError){
            this.$http.get(this.urlBackEnd.toString() + url.toString(), {headers: this.getHeaders()}).then(callback, callbackError);
        },

        put(url, data, callback, callbackError){
            this.$http.put(this.urlBackEnd.toString() + url.toString(), data, {headers: this.getHeaders()}).then(callback, callbackError);
        },
        getHeaders(){
            var token = localStorage.getItem('access_token');

            var headers = {
                "Content-Type": 'application/json',
            }; 

            if(token){
                headers["Authorization"] = "Bearer "+token;
            }

            return headers;
        }
    }
}
</script>