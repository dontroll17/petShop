<template>
    <div class="container">

        <div class="row">
            <div v-if="token" class="col-3 p-4">
                <h3>Create new product</h3>
                <CreateNewProduct
                    :token="token"
                    @productCreated="getProducts"
                />
            </div>
            <div class="col">
                <div class="row">
                    <div v-for="item in products" :key="item._id" class="col-3 p-2">
                        <Product
                            :product="item"
                            :token="token"
                            @productChange="getProducts"
                            @showDetails="showProductDetails"
                            @editProduct="editProduct"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <b-modal id="modal-1" title="Погладь котика!">
                <Product
                    :product="productDetails"
                    :token="token"
                    @editProduct="editProduct"
                    @productChange="getProducts"
                />
            </b-modal>
            <b-modal id="modal-2" title="Измени котика!">
                <EditProduct
                    :productId="productEditId"
                    :token="token"
                    @successEdit="getProducts"
                />
            </b-modal>
        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import Product from "./Product";
    import EditProduct from "./EditProduct";
    import CreateNewProduct from "./CreateNewProduct";

    export default{
        name: 'ProductList',
        components: {
            Product,
            EditProduct,
            CreateNewProduct
        },
        data(){
            return {
                products: [],
                productDetails: null,
                productEditId: null
            }
        },
        props: [
            'token'
        ],
        async mounted() {
            await this.getProducts();
        },
        methods: {
            async getProducts() {
                const res = await axios.get('http://localhost:1111/products');
                this.products = res.data.products;
            },
            async showProductDetails(id) {
                let res = await axios.get(`http://localhost:1111/products/${id}`);
                this.productDetails = res.data.product;
                this.$bvModal.show('modal-1');
            },
            editProduct(id){
                this.productEditId = id;
                this.$bvModal.show('modal-2');
            }
        }
    }
</script>