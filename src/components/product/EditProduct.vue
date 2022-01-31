<template>

    <form>
        <div class="mb-3">
            <label for="change-name-product" class="form-label">Name product</label>
            <input v-model="changeName" type="text" class="form-control" id="change-name-product">
        </div>
        <div class="mb-3">
            <label for="change-price-product" class="form-label">Price product</label>
            <input v-model="changePrice" type="number" class="form-control" id="change-price-product">
        </div>
        <div class="mb-3">
            <label for="change-image-product" class="form-label">Image product</label>
            <input @change="changeProductImg" type="file" class="form-control" id="change-image-product">
        </div>
        <button @click.prevent="changeProduct" class="btn btn-success">Change</button>
    </form>

</template>

<script>
    import axios from "axios";

    export default {
        name: 'EditProduct',
        data(){
            return {
                changeName: '',
                changePrice: '',
                changeImg: null,
                changeId: null
            }
        },
        props: [
            'token',
            'productId'
        ],
        methods: {
            async changeProduct(){
                if(!this.token) return;

                let fileData = new FormData();
                fileData.append( 'name', this.changeName);
                fileData.append( 'price', this.changePrice);
                fileData.append('productimage', this.changeImg);

                const res = await axios.patch(`http://localhost:1111/products/${this.productId}`,fileData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `token ${this.token}`
                    }
                });
                console.log(res);
                this.$emit('successEdit');
            },
            changeProductImg(e){
                this.changeImg = e.target.files[0];
            }
        }
    }
</script>