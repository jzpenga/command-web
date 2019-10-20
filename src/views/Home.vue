<template>
    <div class="home">
        <img style="width: 500px;height: 500px" alt="logo" src="../assets/logo.png">
    </div>
</template>

<script>
    // @ is an alias to /src
    import {config} from "../utils/config";

    export default {
        name: 'home',
        data() {
            return {
                baseUrl: config.ueUrl
            }
        },
        mounted() {

        },
        methods: {

        },
        components: {},
        created() {
            //loginUe();
            //getUeToken();
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 150px);
    }
</style>
