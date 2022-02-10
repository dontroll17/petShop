<template>
    <div>
        <div class="container mt-4">
            <h1 class="display-4">Hello, world!</h1>
        </div>

        <!--Products-->
        <ProductList/>
    </div>
</template>

<script>
    import ProductList from "./product/ProductList";
    import {mapState} from "vuex";

    export default {
        name: 'Home',
        components: {
            ProductList,
        },
        computed: {
            ...mapState(['token'])
        },
    }
</script>
