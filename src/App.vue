<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {loginUe} from "./utils/auth";

  export default {
    name: 'App',
    created() {
        loginUe();
    },
  }
</script>
