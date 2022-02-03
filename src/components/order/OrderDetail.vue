<template>
    <div>
        <Product :product="orderProduct"/>
        <p>Заказано: {{quantity}}</p>
    </div>
</template>

<script>
    import axios from "axios";
    import Product from "../product/Product";
    export default {
        name: 'OrderDetail',
        components: {
            Product
        },
        data() {
            return {
                orderProduct: null,
                quantity: null
            }
        },
        props: [
            'orderId',
            'token'
        ],
        mounted() {
            this.getDetails();
        },
        methods: {
            async getDetails() {
               const res = await axios.get(`http://localhost:1111/orders/${this.orderId}`, {
                   headers: {
                       'Authorization': `token ${this.token}`
                   }
               });
               this.orderProduct = res.data.order.product;
               this.quantity = res.data.order.quantity;
            }
        }

    }
</script>