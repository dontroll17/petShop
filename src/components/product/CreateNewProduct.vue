<template>
    <form>
        <div class="mb-3">
            <label for="nameProduct" class="form-label">Name product</label>
            <input v-model="nameProduct" type="text" class="form-control" id="nameProduct">
        </div>
        <div class="mb-3">
            <label for="priceProduct" class="form-label">Price product</label>
            <input v-model="priceProduct" type="number" class="form-control" id="priceProduct">
        </div>
        <div class="mb-3">
            <label for="imageProduct" class="form-label">Image product</label>
            <input @change="imgProduct" type="file" class="form-control" id="imageProduct">
        </div>
        <button @click.prevent="sendProduct" class="btn btn-success">Send</button>
    </form>
</template>

<script>
    import axios from "axios";
    import {mapState} from "vuex";

    export default {
        name: 'CreateNewProduct',
        data() {
            return {
                nameProduct: '',
                priceProduct: 0,
            }
        },
        computed: {
            ...mapState(['token'])
        },
        methods: {
            imgProduct(e){
                this.fileProduct = e.target.files[0];
            },
            async sendProduct(){
                if(!this.token) return;

                let fileData = new FormData();
                fileData.append( 'name', this.nameProduct);
                fileData.append( 'price', this.priceProduct);
                fileData.append('productimage', this.fileProduct);

                let res = await axios.post('http://localhost:1111/products',fileData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `token ${this.token}`
                    }
                });
                console.log(res);
                this.$emit('productCreated');
            }
        }
    }
</script>