<template>

    <el-card class="form-container card-content" shadow="never">
        <div style="text-align: right">
            <el-button type="text" size="mini" @click="() => showAddCategoryDialog()">添加一级分类</el-button>
        </div>
        <el-tree :data="treeData"
                 :props="defaultProps"
                 node-key="id"
                 @node-expand="nodeExpand"
                 @node-collapse="nodeCollapse"
                 :default-expanded-keys="expandKeys"
                 :expand-on-click-node="false"
                 @node-click="handleNodeClick">
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <div class="option">
                    <el-button type="text" size="mini" @click="() => showEditDialog(node, data, false,false)">添加子区域</el-button>
                    <el-button type="text" size="mini" @click="() => showEditDialog(node, data,true, false)">编辑</el-button>
                    <el-button type="text" size="mini" @click="() => handleDelete(node, data)">删除</el-button>
                </div>
            </div>
        </el-tree>

        <el-dialog
                center
                title="编辑"
                :visible.sync="targetDetailDialogVisible"
                width="50%"
                :before-close="handleClose">
            <el-form :model="target"
                     ref="targetFrom"
                     label-width="150px"
                     style="max-height: 500px;overflow: auto"
                     size="small">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="target.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="区域编码：" prop="areaCode">
                    <el-input v-model="target.areaCode" class="input-width"></el-input>
                </el-form-item>

                <el-form-item  label="手机链接：" prop="phoneUrl">
                    <el-input v-model="target.phoneUrl" class="input-width"></el-input>
                </el-form-item>
                <el-form-item  label="pad链接：" prop="padUrl">
                    <el-input v-model="target.padUrl" class="input-width"></el-input>
                </el-form-item>
            </el-form>
                <span slot="footer" class="dialog-footer">
    <el-button @click="targetDetailDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit('targetFrom')">保 存</el-button>
  </span>
        </el-dialog>
    </el-card>

</template>

<script>
    let id = 1000;
    import {fetchList,getAreaById,save,deleteArea} from "../../api/area";
    import {config} from "../../utils/config";


    const defaultTarget = {
        name:'',
        parentId:0,
        areaCode:'',
        phoneUrl:'',
        padUrl:'',
    };
    export default {
        name: "Area",
        data() {
            return {
                baseUrl:config.baseUrl,
                expandKeys:[],
                target:defaultTarget,
                targetDetailDialogVisible: false,
                isEdit:false,
                isEditCategory:false,
                treeData: [],
                defaultProps: {
                    children: 'child',
                    label: 'name'
                }
            }
        },
        created() {
            this.getList();
        },

        methods: {
            nodeExpand(data){
                this.expandKeys.push(data.id);
            },
            nodeCollapse(data){
                const index = this.expandKeys.indexOf((it)=>it.id === data.id);
                this.expandKeys.splice(index,1)
            },
            showAddCategoryDialog(){
                this.showEditDialog(null,{id:0},false,true);
            },
            showEditDialog(node, data, isEdit,isEditCategory){
                this.isEdit = isEdit;
                if (this.isEdit){
                    getAreaById(data.id).then((res)=>{
                        this.target = res;
                        this.targetDetailDialogVisible = true;
                    })
                } else {
                    this.targetDetailDialogVisible = true;
                    this.target = {...defaultTarget,parentId:data.id}
                }

            },
            handleDelete(node, data){
                this.deleteTarget([data.id]);
            },
            handleNodeClick(data) {
                //console.log('handleNodeClick', data);
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            getList(){
                fetchList().then((res) => {
                    this.treeData = res;
                })
            },
            deleteTarget(ids){
                this.$confirm('是否要删除该区域吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteArea(ids).then(response=>{
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if (this.isEdit) {
                                console.log(this.target)
                                save({...this.target}).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                    this.targetDetailDialogVisible = false;
                                    this.getList();
                                });
                            } else {
                                save({...this.target}).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.target = Object.assign({}, defaultTarget);
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                    this.targetDetailDialogVisible = false;
                                    this.getList();
                                });
                            }
                        });

                    } else {
                        this.$message({
                            message: '验证失败',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                });
            },
        }

    }
</script>

<style lang="scss" scoped>
    .custom-tree-node {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .name-input {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 26px;
        line-height: 26px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
    }

    .card-content {
        height: calc(100vh - 150px);
        overflow: auto
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
