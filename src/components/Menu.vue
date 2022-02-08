<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Hell shop</router-link>

            <div class="collapse navbar-collapse d-flex" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/orders">Orders</router-link>
                    </li>
                </ul>
            </div>
            <div class="d-flex">
                <ul v-if="!token" class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/registration">Registration</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                </ul>
                <div v-else class="d-flex">
                    <img src="../assets/profile-icon.png" width="25">
                    <h5 @click="logout" class="mx-4 logout">Logout</h5>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {mapMutations, mapState} from "vuex";

    export default {
        name: 'Menu',
        computed: {
            ...mapState(['token'])
        },
        methods: {
            ...mapMutations(['setToken']),
            logout() {
                localStorage.removeItem('token');
                this.setToken(null);
            }
        }
    }
</script>