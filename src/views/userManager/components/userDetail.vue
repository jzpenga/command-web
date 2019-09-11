<template>

</template>

<script>
    import {getUserById} from "../../../api/user";

    export default {
        name: "userDetail",
        created() {
            getUserById(this.$route.query.id).then((res)=>{
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>
