<template>
    <div>
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
    import OrderList from "./order/OrderList";
    import {mapState} from "vuex";

    export default {
        name: 'Home',
        components: {
            ProductList,
            OrderList
        },
        computed: {
            ...mapState(['token'])
        },
    }
</script>
