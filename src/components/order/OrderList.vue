<template>
    <div class="container">
        <h1>Orders from Morder</h1>
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
                        <tr v-for="(item, idx) in ordersList" :key="item._id">
                            <th scope="row">{{idx + 1}}</th>
                            <td @click="showDetail(item._id)" class="product-name">{{ item._id }}</td>
                            <td>{{ item.product.name }}</td>
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
                        :token="token"
                    />
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import OrderDetail from "./OrderDetail";
    export default {
        name: "OrderList",
        components: {
          OrderDetail
        },
        data() {
            return {
                ordersList: [],
                orderId: null
            }
        },
        props: [
            'token'
        ],
        async mounted(){
            await this.getOrders();
            this.$emit('readyForRefresh', this.getOrders);
        },
        methods: {
            async getOrders() {
                const res = await axios.get('http://localhost:1111/orders',{
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });
                this.ordersList = res.data.orders;
            },
            async deleteOrder(id) {
                await axios.delete(`http://localhost:1111/orders/${id}`, {
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                })
                await this.getOrders();
            },
            showDetail(id) {
                this.orderId = id;
                this.$bvModal.show('order-modal-detail');
            }
        }
    }
</script>