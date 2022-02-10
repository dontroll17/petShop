<template>
    <div class="container">
        <div class="row">
            <ProductList/>
            <div v-if="token" class="col-3 p-2">
                <h3>Create new product</h3>
                <CreateNewProduct/>
            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "./ProductList";
import CreateNewProduct from "./CreateNewProduct";
import {mapState} from "vuex";
    export default {
        name: 'ProductsPage',
        components: {
            ProductList,
            CreateNewProduct
        },
        computed: {
            ...mapState(['token'])
        }
    }
</script>