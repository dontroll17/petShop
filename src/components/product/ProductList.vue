<template>
    <div class="container">
        <h1>Products</h1>
        <div class="row">
            <div v-if="token" class="col-3 p-2">
                <h3>Create new product</h3>
                <CreateNewProduct
                    @productCreated="getProducts"
                />
            </div>
            <div class="col">
                <div class="row">
                    <div v-for="item in products" :key="item._id" class="col-3 p-2">
                        <Product
                            :product="item"
                            @productChange="getProducts"
                            @showDetails="showProductDetails"
                            @editProduct="editProduct"
                            @orderModal="showOrderModal"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <b-modal id="modal-1" title="Погладь котика!">
                <Product
                    :product="productDetails"
                    @editProduct="editProduct"
                    @productChange="getProducts"
                    @orderModal="showOrderModal"
                />
            </b-modal>
            <b-modal id="modal-2" title="Измени котика!">
                <EditProduct
                    :productId="productEditId"
                    @successEdit="getProducts"
                />
            </b-modal>
            <b-modal id="order-modal" title="Buy!!!">
                <CreateOrder
                    :orderProductId="orderProductId"
                />
            </b-modal>
        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import { mapState } from 'vuex';
    import Product from "./Product";
    import EditProduct from "./EditProduct";
    import CreateNewProduct from "./CreateNewProduct";
    import CreateOrder from "../order/CreateOrder";

    export default {
        name: 'ProductList',
        components: {
            Product,
            EditProduct,
            CreateNewProduct,
            CreateOrder,
        },
        data() {
            return {
                products: [],
                productDetails: null,
                productEditId: null,
                orderProductId: null
            }
        },
        computed: {
            ...mapState(['token'])
        },
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
            editProduct(id) {
                this.productEditId = id;
                this.$bvModal.show('modal-2');
            },
            showOrderModal(id) {
                this.orderProductId = id;
                this.$bvModal.show('order-modal');
            }
        }
    }
</script>