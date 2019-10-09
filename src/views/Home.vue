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
  data(){
    return {
      baseUrl:config.ueUrl
    }
  },
  mounted() {
    //<iframe id="iframe" onload='document.getElementById("iframe").src="javascript:$(\"#username\").val(\"admin\");$(\"#_password\").val(\"cdsf@119\");$(\"#cas_submit\").click();"' src="/analystui/?lan=en#/project">

    //</iframe>
    //const ueIframe = this.$refs['ueIframe'];
    //ueIframe.src = 'javascript:document.getElementById("username").value(\'admin\');console.log(document.getElementById("username"));document.getElementById("_password").val(\'cdsf@119\');document.getElementById("cas_submit").click();'
    //console.log(ueIframe);
    const self = this
    this.$nextTick(() =>{
      const iframe = document.querySelector('#ueIframe');
      console.log(iframe);
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", function() {
          console.log('哈哈哈')
        });
      } else {
        iframe.onload = function() {

          const d = iframe.contentWindow.document;
          console.log(d.getElementById("username"));
          d.getElementById("username").value = "admin";
          d.getElementById("username").autocomplete="off";
          d.getElementById("_password").value = "cdsf@119";
          d.getElementById("_password").autocomplete = "off";
          d.getElementById("cas_submit").click();
          //const iframeNode = window.frames["ueIframe"].document;
        };
      }
    })

  },
  methods:{
    initIframe(){
      document.getElementById("username").value("admin");
      console.log(document.getElementById("username"));
      document.getElementById("_password").val("cdsf@119");
      document.getElementById("cas_submit").click();
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
  .home{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 150px);
  }
</style>
