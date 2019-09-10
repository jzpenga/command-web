<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
                center
                title="提示"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            <tree-data-select/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>

    </div>

</template>

<script>
    import TreeDataSelect from '../../components/TreeDataSelect'

    export default {
        name: "index",
        data:function(){
            return{
                dialogVisible:true
            }
        },
        components: {
            TreeDataSelect
        },
        methods:{
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>

</style>
