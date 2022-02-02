<template>
    <div class="container">
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
                            <td>{{ item._id }}</td>
                            <td>{{ item.product.name }}</td>
                            <td>{{ item.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "OrderList",
        data() {
            return {
                ordersList: []
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
            }
        }
    }
</script>