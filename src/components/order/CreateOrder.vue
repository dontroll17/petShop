<template>
    <div>
        <h1>Create order</h1>
        <input v-model="quantity" type="text">
        <button @click="newOrder">Order</button>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "CreateOrder",
        data() {
            return {
                quantity: ''
            }
        },
        props: [
            'token',
            'orderProductId',
            'ordersRefresh'
        ],
        methods: {
            async newOrder(){
                const res = await axios.post('http://localhost:1111/orders', {
                    productId: this.orderProductId,
                    quantity: parseInt(this.quantity)
                }, {
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });
                console.log(res);
                this.ordersRefresh();
            }
        }
    }
</script>