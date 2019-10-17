<template>
    <div class="home">
        <img style="width: 500px;height: 500px" alt="logo" src="../assets/logo.png">
        <iframe style="width: 2px;height: 2px"
                ref="ueIframe"
                id="ueIframe"
                @onload="initIframe"
                :src="baseUrl+'/analystui/?lan=zh#/project'">

        </iframe>
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
            initIframe() {
                // document.getElementById("username").value("admin");
                // console.log(document.getElementById("username"));
                // document.getElementById("_password").val("cdsf@119");
                // document.getElementById("cas_submit").click();
            }
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
