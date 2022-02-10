<template>
    <div class="container">
        <h1>Orders</h1>
        <div class="row">
            <div class="col">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in orderList" :key="item._id">
                            <th scope="row">{{idx + 1}}</th>
                            <td @click="showDetail(item._id)" class="product-name">{{ item._id }}</td>
                            <td>{{ item.product ? item.product.name : ''}}</td>
                            <td>{{ item.quantity }}</td>
                            <td class="td-delete">
                                <button @click="deleteOrder(item._id)" class="btn btn-danger">X</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <b-modal id="order-modal-detail" title="Детали">
                    <OrderDetail
                        :orderId="orderId"
                    />
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderDetail from "./OrderDetail";
    import {mapActions, mapState} from "vuex";
    import Api from "@/api/api";
    export default {
        name: "OrderList",
        components: {
            OrderDetail
        },
        data() {
            return {
                orderId: null
            }
        },
        computed: {
            ...mapState(['token', 'orderList'])
        },
        async mounted(){
            await this.getOrders();
        },
        methods: {
            ...mapActions(['getOrders']),
            async deleteOrder(id) {
                await Api.deleteOrder(this.token, id);
                await this.getOrders();
            },
            showDetail(id) {
                this.orderId = id;
                this.$bvModal.show('order-modal-detail');
            }
        }
    }
</script>