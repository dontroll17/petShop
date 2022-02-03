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

    export default {
        name: 'App',
        components: {
            Menu
        }
    }
</script>