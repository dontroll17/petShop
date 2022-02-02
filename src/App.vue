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

        </div>
        <hr>

        <!--Products-->
        <ProductList :token="token"/>


    </div>
</template>

<script>
    import ProductList from "./components/product/ProductList";
    import Registration from "./components/user/Registration";
    import Login from "./components/user/Login";
    export default {
        name: 'App',
        components: {
            ProductList,
            Registration,
            Login
        },
        data(){
           return{
               token: ''
           }
        },
        methods: {
            loginSuccess(token) {
                this.token = token;
            }
        }

    }
</script>

<style>
    @import'~bootstrap/dist/css/bootstrap.css';
</style>