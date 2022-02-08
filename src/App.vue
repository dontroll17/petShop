<template>
    <div>
        <div class="container">
            <Menu/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Menu from "./components/Menu";
    import {mapState, mapMutations} from "vuex";

    export default {
        name: 'App',
        components: {
            Menu
        },
        computed: {
            ...mapState(['token'])
        },
        mounted() {
            if(!this.token) {
                let localStorageToken = localStorage.getItem('token');
                if(localStorageToken) {
                    this.setToken(localStorageToken);
                }
            }
        },
        methods: {
            ...mapMutations(['setToken'])
        }
    }
</script>