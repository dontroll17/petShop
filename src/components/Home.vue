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
            <img class="cats" src="../assets/cat.jpg" width="200" alt="">

        </div>
        <hr>

        <!--Products-->
        <ProductList
            :token="token"
            :ordersRefresh="ordersRefresh"
        />

        <OrderList
            v-if="token"
            :token="token"
            @readyForRefresh="ordersRefresh = $event"
        />

    </div>
</template>

<script>
    import ProductList from "./product/ProductList";
    import Registration from "./user/Registration";
    import Login from "./user/Login";
    import OrderList from "./order/OrderList";
    export default {
        name: 'Home',
        components: {
            ProductList,
            Registration,
            Login,
            OrderList
        },
        data(){
            return{
                token: '',
                ordersRefresh: null
            }
        },
        methods: {
            loginSuccess(token) {
                this.token = token;
            }
        }

    }
</script>
