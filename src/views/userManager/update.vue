<template> 
  <user-detail :isEdit="true"></user-detail>
</template>
<script>
  import UserDetail from './components/userDetail'
  export default {
    name: 'editUserDetail',
    components: { UserDetail }
  }
</script>
<style></style>


