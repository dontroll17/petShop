<template>
    <form>
        <div class="mb-3">
            <label for="loginEmail" class="form-label">Email address</label>
            <input v-model="loginInputEmail" type="email" class="form-control" id="loginEmail">
        </div>
        <div class="mb-3">
            <label for="loginPassword" class="form-label">Password</label>
            <input v-model="loginInputPass" type="password" class="form-control" id="loginPassword">
        </div>
        <button @click.prevent="handleLogin" type="submit" class="btn btn-primary" id="log-btn">Submit</button>
        <div class="alert-wrapper mt-3">
            <div v-if="loginMessage" class="alert alert-success hide" id="log-alert" role="alert">
                {{ loginMessage }}
            </div>
        </div>
    </form>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        name: 'Login',
        data(){
            return {
                loginInputEmail: 'ww@ww.w',
                loginInputPass: '123',
            }
        },
        computed: {
            ...mapState(['loginMessage'])
        },
        methods: {
            ...mapActions(['login']),
            async handleLogin(){
                this.login({
                    email: this.loginInputEmail,
                    password: this.loginInputPass
                });
            },
        }
    }
</script>