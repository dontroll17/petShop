<template>
    <div>
        <h5 @click="getProductById(product._id)" class="text-primary product-name">{{ product.name }}</h5>
        <p>{{ product.price }}</p>
        <img :src="`http://localhost:1111/${product.productImage}`" height="150" alt="">
        <br>
        <button v-if="token" @click="orderModal(product._id)" class="btn btn-danger">Buy NOW or DIE!</button>
        <br>
        <button v-if="token" @click="removeProduct(product._id)" class="btn btn-dark">Эвтаназия</button>
        <br>
        <button v-if="token" @click="editProductModel(product._id)" class="btn btn-info">Редактирование</button>
    </div>


</template>

<script>
    import axios from "axios";

    export default {
        name: 'Product',
        props: [
            'product',
            'token'
        ],
        methods: {
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
                let res = await axios.delete(`http://localhost:1111/products/${id}`,{
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });
                if(res.status === 200)
                     this.$emit('productChange');
                console.log(res);
            }
        }
    }
</script>