<template>
    <div class="card p-4 m-2">
        <h5 @click="getProductById(product._id)" class="text-primary product-name">{{ product.name }}</h5>
        <p>{{ product.price }}</p>
        <img :src="`http://localhost:1111/${product.productImage}`" style="width: 100%; height: 200px"  alt="">
        <br>



        <div class="d-grid gap-2 col-8 mx-auto">
            <button v-if="token" @click="orderModal(product._id)" class="btn btn-danger">Buy NOW or DIE!</button>
            <button v-if="token" @click="editProductModel(product._id)" class="btn btn-info">Редактирование</button>
            <button v-if="token" @click="removeProduct(product._id)" class="btn btn-dark">Эвтаназия</button>
        </div>
    </div>


</template>

<script>
    import Api from "@/api/api";
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'Product',
        computed: {
            ...mapState(['token'])
        },
        props: [
            'product',
        ],
        methods: {
            ...mapActions(['getProducts']),
            getProductById(id){
                this.$emit('showDetails', id);
            },
            editProductModel(id){
                this.$emit('editProduct', id);
            },
            orderModal(id){
                this.$emit('orderModal', id);
            },
            async removeProduct(id){
                let res = await Api.deleteProduct(this.token, id)
                if(res.status === 200)
                     await this.getProducts();
            }
        }
    }
</script>