<template>
    <iframe style="width: 100%;height: 600px"
            ref="ueIframe"
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
            //<iframe id="iframe" onload='document.getElementById("iframe").src="javascript:$(\"#username\").val(\"admin\");$(\"#_password\").val(\"cdsf@119\");$(\"#cas_submit\").click();"' src="/analystui/?lan=en#/project">

        //</iframe>
            const ueIframe = this.$refs['ueIframe'];
            console.log(ueIframe);
            ueIframe.src = 'javascript:document.getElementById("username").val(\'admin\');document.getElementById("_password").val(\'cdsf@119\');document.getElementById("cas_submit").click();'
        }
    }
</script>

<style scoped>

</style>
