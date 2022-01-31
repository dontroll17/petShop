<template>
    <div>
        <div class="container mt-5">
            <div class="row">
                <div class="col">
                    <h1>Registration</h1>
                    <Registration/>
                </div>
                <div class="col">
                    <h1>Login</h1>
                    <Login @loginSuccess="loginSuccess"/>
                </div>
            </div>
        </div>

        <div v-if="token" class="container hide mt-4" id="app">
            <h1>Has Auth</h1>
            <img class="cats" src="./assets/cat.jpg" width="200" alt="">
            <hr>
            <div class="row">
                <div class="col">
                    <h3>Create new product</h3>
                    <CreateNewProduct
                        :token="token"
                        @productCreated="productCreated"
                    />
                </div>
                <div class="col"></div>
                <div class="col"></div>
            </div>
        </div>
        <hr>

        <!--Products-->
        <ProductList :token="token" :newProductId="newProductId"/>


    </div>
</template>

<script>
    import ProductList from "./components/product/ProductList";
    import CreateNewProduct from "./components/product/CreateNewProduct";
    import Registration from "./components/user/Registration";
    import Login from "./components/user/Login";
    export default {
        name: 'App',
        components: {
            ProductList,
            CreateNewProduct,
            Registration,
            Login
        },
        data(){
           return{
               token: '',
               newProductId: null
           }
        },
        methods: {
            productCreated(newProductId){
                this.newProductId = newProductId;
            },
            loginSuccess(token) {
                this.token = token;
            }
        }

    }
</script>

<style>
    @import'~bootstrap/dist/css/bootstrap.css';
</style>