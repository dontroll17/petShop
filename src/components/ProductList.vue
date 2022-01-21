<template>
    <div class="container">
        <div class="row">
            <div v-for="item in products" :key="item._id" class="col-3">
                <Product
                    :product="item"
                    :token="token"
                    @productChange="getProducts"
                    @showDetails="showProductDetails"
                />
            </div>
        </div>


        <div>
            <b-modal id="modal-1" title="Погладь котика!">
                <Product :product="productDetails"/>
            </b-modal>
        </div>

<!--        <div>-->
<!--            <b-modal id="modal-2" title="Измени котика!">-->
<!--                <div>-->
<!--                    <form>-->
<!--                        <div class="mb-3">-->
<!--                            <label for="nameProduct" class="form-label">Name product</label>-->
<!--                            <input v-model="changeName" type="text" class="form-control" id="changeNameProduct">-->
<!--                        </div>-->
<!--                        <div class="mb-3">-->
<!--                            <label for="priceProduct" class="form-label">Price product</label>-->
<!--                            <input v-model="changePrice" type="number" class="form-control" id="changePriceProduct">-->
<!--                        </div>-->
<!--                        <div class="mb-3">-->
<!--                            <label for="imageProduct" class="form-label">Image product</label>-->
<!--                            <input @change="changeProductImg" type="file" class="form-control" id="changeImageProduct">-->
<!--                        </div>-->
<!--                        <button @click.prevent="changeProduct" class="btn btn-success">Change</button>-->
<!--                    </form>-->
<!--                </div>-->
<!--            </b-modal>-->
<!--        </div>-->
    </div>
</template>

<script>
    import Product from "./Product";
    import axios from "axios";
    export default{
        name: 'ProductList',
        components: {
            Product
        },
        data(){
            return {
                products: [],
                productDetails: null
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
            }
        }
    }
</script>