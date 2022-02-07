<template>
    <div>
        <Product :product="orderProduct"/>
        <p>Заказано: {{quantity}}</p>
    </div>
</template>

<script>
    import Product from "../product/Product";
    import {mapState} from "vuex";
    import Api from "@/api/api";
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
        computed: {
            ...mapState(['token'])
        },
        props: [
            'orderId',
        ],
        mounted() {
            this.getDetails();
        },
        methods: {
            async getDetails() {
               const res = await Api.getOrderDetails(this.token, this.orderId);
               this.orderProduct = res.data.order.product;
               this.quantity = res.data.order.quantity;
            }
        }

    }
</script>