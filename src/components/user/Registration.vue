<template>
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
</template>

<script>
    import axios from "axios";

    export default {
        name: 'Registration',
        data(){
            return {
                regInputEmail: '',
                regInputPass: '',
                regMessage: ''
            }
        },
        methods: {
            async registration(){
                let res = await axios.post('http://localhost:1111/user/signup', {
                    email: this.regInputEmail,
                    password: this.regInputPass
                });
                this.regMessage = res.data.message;
                setTimeout(() => {
                    this.regMessage = '';
                }, 2000);
            }
        }
    }
</script>