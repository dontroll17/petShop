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
                    <Login/>
                </div>
            </div>
        </div>

        <div v-if="token" class="container hide mt-4" id="app">
            <h1>Has Auth</h1>
            <img class="cats" src="../assets/cat.jpg" width="200" alt="">
        </div>
        <hr>

        <!--Products-->
        <ProductList/>

        <OrderList
            v-if="token"
        />

    </div>
</template>

<script>
    import ProductList from "./product/ProductList";
    import Registration from "./user/Registration";
    import Login from "./user/Login";
    import OrderList from "./order/OrderList";
    import {mapState} from "vuex";

    export default {
        name: 'Home',
        components: {
            ProductList,
            Registration,
            Login,
            OrderList
        },
        computed: {
            ...mapState(['token'])
        },
    }
</script>
