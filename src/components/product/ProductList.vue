<template>
    <div class="container">
        <h1>Products</h1>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div v-for="item in productList" :key="item._id" class="col-3 p-2">
                        <Product
                            :product="item"
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
                    @orderModal="showOrderModal"
                />
            </b-modal>
            <b-modal id="modal-2" title="Измени котика!">
                <EditProduct
                    :productId="productEditId"
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
    import Api from "@/api/api";
    import {mapActions, mapState} from 'vuex';
    import Product from "./Product";
    import EditProduct from "./EditProduct";
    import CreateOrder from "../order/CreateOrder";

    export default {
        name: 'ProductList',
        components: {
            Product,
            EditProduct,
            CreateOrder,
        },
        data() {
            return {
                productDetails: null,
                productEditId: null,
                orderProductId: null
            }
        },
        computed: {
            ...mapState(['token', 'productList'])
        },
        async mounted() {
            await this.getProducts();
        },
        methods: {
            ...mapActions(['getProducts']),
            async showProductDetails(id) {
                let res = await Api.getProductDetails(id);
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