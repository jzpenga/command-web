<template>
    <iframe style="width: 100%;height: 600px"
            ref="ueIframe"
            onload='javascript:document.getElementById("username").value("admin");console.log(document.getElementById("username"));document.getElementById("_password").val("cdsf@119");document.getElementById("cas_submit").click();'
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
            //ueIframe.src = 'javascript:document.getElementById("username").value(\'admin\');console.log(document.getElementById("username"));document.getElementById("_password").val(\'cdsf@119\');document.getElementById("cas_submit").click();'
            console.log(ueIframe);
        }
    }
</script>

<style scoped>

</style>
