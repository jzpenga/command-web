<template>
    <iframe ref="ueIframe"
            id="iframe"
            :src="baseUrl+'/analystui/?lan=en#/project'">

    </iframe>
</template>

<script>
    import {config} from "../../utils/config";

    export default {
        name: "ue",
        data(){
            return {
                baseUrl:config.ueUrl
            }
        },
        mounted() {
            const ueIframe = this.$refs['ueIframe'];
        }
    }
</script>

<style scoped>

</style>
