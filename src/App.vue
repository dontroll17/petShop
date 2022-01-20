<template>
    <div>
        <div class="container mt-5">
            <div class="row">
                <div class="col">
                    <h1>Registration</h1>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input v-model="regInputEmail" type="email" class="form-control" id="exampleInputEmail1">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input v-model="regInputPass" type="password" class="form-control" id="exampleInputPassword1">
                        </div>
                        <button @click.prevent="registration" type="submit" class="btn btn-primary" id="reg-btn">Submit</button>
                        <div v-if="regMessage" class="alert-wrapper mt-3">
                            <div class="alert alert-success hide" id="reg-alert" role="alert">
                                {{ regMessage }}
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col">
                    <h1>Login</h1>
                    <form>
                        <div class="mb-3">
                            <label for="loginEmail" class="form-label">Email address</label>
                            <input v-model="loginInputEmail" type="email" class="form-control" id="loginEmail">
                        </div>
                        <div class="mb-3">
                            <label for="loginPassword" class="form-label">Password</label>
                            <input v-model="loginInputPass" type="password" class="form-control" id="loginPassword">
                        </div>
                        <button @click.prevent="login" type="submit" class="btn btn-primary" id="log-btn">Submit</button>
                        <div class="alert-wrapper mt-3">
                            <div v-if="loginMessage" class="alert alert-success hide" id="log-alert" role="alert">
                                {{ loginMessage }}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="token" class="container hide mt-4" id="app">
            <h1>Has Auth</h1>
            <img class="cats" src="./assets/cat.jpg" width="200" alt="">
            <hr>
            <div class="row">
                <div class="col">
                    <h3>Create new product</h3>
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
                </div>
                <div class="col"></div>
                <div class="col"></div>
            </div>
        </div>
        <hr>


        <div class="container">
            <div class="row">
                <div v-for="item in products" :key="item._id" class="col-3">
                    <h5 @click="getProductById(item._id)" class="text-primary product-name">{{ item.name }}</h5>
                    <p>{{ item.price }}</p>
                    <img :src="`http://localhost:1111/${item.productImage}`" height="150" alt="">
                    <br>
                    <button class="btn btn-danger">Buy NOW or DIE!</button>
                    <br>
                    <button v-if="token" @click="removeProduct(item._id)" class="btn btn-dark">Эвтаназия</button>
                </div>
            </div>
        </div>

        <div>
            <b-modal id="modal-1" title="Погладь котика!">
                <div v-if="productDetails">
                    <h5>{{ productDetails.name }}</h5>
                    <p>{{ productDetails.price }}</p>
                    <img :src="`http://localhost:1111/${productDetails.productImage}`" height="150" alt="">
                    <br>
                    <button class="btn btn-danger">Buy NOW or DIE!</button>
                    <br>
                    <button v-if="token" @click="removeProduct(item._id)" class="btn btn-dark">Эвтаназия</button>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'App',
        data(){
           return{
               regInputEmail: '',
               regInputPass: '',
               regMessage: '',
               loginInputEmail: 'ww@ww.w',
               loginInputPass: '123',
               loginMessage: '',
               token: '',
               nameProduct: '',
               priceProduct: 0,
               fileProduct: null,
               products: [],
               productDetails: null
           }
        },
       async mounted() {
           await this.getProducts();
        },
        methods: {
            async getProducts() {
                const res = await axios.get('http://localhost:1111/products');
                this.products = res.data.products;
            },
            async registration(){
               let res = await axios.post('http://localhost:1111/user/signup', {
                   email: this.regInputEmail,
                   password: this.regInputPass
               });
               this.regMessage = res.data.message;
               setTimeout(() => {
                   this.regMessage = '';
               }, 2000);
            },
            async login(){
                let res = await axios.post('http://localhost:1111/user/login', {
                    email: this.loginInputEmail,
                    password: this.loginInputPass
                });
                this.token = res.data.token;
                this.loginMessage = res.data.message;
                setTimeout(() => {
                    this.loginMessage = '';
                }, 2000)
            },
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
            },
            async getProductById(id){
                let res = await axios.get(`http://localhost:1111/products/${id}`);
                this.productDetails = res.data.product;
                this.$bvModal.show('modal-1');
            },
            async removeProduct(id){
                let res = await axios.delete(`http://localhost:1111/products/${id}`,{
                    headers: {
                        'Authorization': `token ${this.token}`
                    }
                });
                if(res.status === 200)
                    await this.getProducts();
                console.log(res);
            }
        }

    }
</script>

<style>
    @import'~bootstrap/dist/css/bootstrap.css';
</style>