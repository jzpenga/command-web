<template>
  <div class="home">
    <img style="width: 500px;height: 500px" alt="logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
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
