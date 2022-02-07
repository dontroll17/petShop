<template>
    <div>
        <h1>Create order</h1>
        <input v-model="quantity" type="text">
        <button @click="newOrder">Order</button>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import Api from "@/api/api";
    export default {
        name: "CreateOrder",
        data() {
            return {
                quantity: ''
            }
        },
        computed: {
            ...mapState(['token'])
        },
        props: [
            'orderProductId',
        ],
        methods: {
            ...mapActions(['getOrders']),
            async newOrder(){
                const res = await Api.createOrder(this.token, {
                    productId: this.orderProductId,
                    quantity: this.quantity
                });
                console.log(res);
                this.getOrders();
            }
        }
    }
</script>