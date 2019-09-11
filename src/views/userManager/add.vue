<template> 
  <user-detail :isEdit="false"></user-detail>
</template>
<script>
  import UserDetail from './components/userDetail'
  export default {
    name: 'addUserDetail',
    components: { UserDetail }
  }
</script>
<style></style>


