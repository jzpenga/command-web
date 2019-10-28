<template>
    <div>
    <el-card class="operate-container" shadow="never">
        <el-row >
            <el-col style="text-align: center">
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="showAddCategoryDialog()">添加一级分类</el-button>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="card-content" shadow="never">
        <!--<div style="text-align: right">-->
            <!--<el-button type="text" size="mini" @click="() => showAddCategoryDialog()">添加一级分类</el-button>-->
        <!--</div>-->
        <!--<el-tree :data="treeData"-->
                 <!--:props="defaultProps"-->
                 <!--node-key="id"-->
                 <!--@node-expand="nodeExpand"-->
                 <!--@node-collapse="nodeCollapse"-->
                 <!--:default-expanded-keys="expandKeys"-->
                 <!--:expand-on-click-node="false"-->
                 <!--@node-click="handleNodeClick">-->
            <!--<div class="custom-tree-node" slot-scope="{ node, data }">-->
                <!--<span>{{ data.name }}</span>-->
                <!--<div class="option">-->
                    <!--<el-button v-if="isCategoryItem(data)" type="text" size="mini" @click="() => showEditDialog(node, data, false,true)">添加子分类</el-button>-->
                    <!--<el-button v-if="!isCategoryItem(data)" type="text" size="mini" @click="() => showEditDialog(node, data, false,false)">添加子指标</el-button>-->
                    <!--<el-button type="text" size="mini" @click="() => showEditDialog(node, data, true,isCategoryItem(data))">编辑</el-button>-->
                    <!--<el-button type="text" size="mini" @click="() => handleDelete(node, data)">删除</el-button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</el-tree>-->

        <el-table
                :data="tableData"
                style="width: 100%;"
                row-key="id"
                size="mini"
                stripe border
                :tree-props="{children: 'child'}">
            <el-table-column
                    prop="no"
                    label="编码"
                    sortable
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="指标名">
            </el-table-column>
            <el-table-column
                    prop="gradation"
                    label="排序"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope">
                    <el-button v-if="!isCategoryItem(scope.row)" type="text" size="mini" @click="showAddDialog(data)">添加子指标</el-button>
                    <el-button size="mini"
                               type="text"
                               @click="showEditDialog(scope.row)">编辑
                    </el-button>
                    <el-button size="mini"
                               type="text"
                               @click="handleGradation(scope.row)">顺序
                    </el-button>
                    <el-button size="mini"
                               type="text"
                               v-if="scope.row.child.length == 0"
                               @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                center
                title="编辑"
                :visible.sync="targetDetailDialogVisible"
                width="50%"
                :before-close="handleClose">
            <el-form :model="target"
                     ref="targetFrom"
                     style="max-height: 500px;overflow: auto"
                     label-width="150px"
                     size="small">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="target.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="描述：" prop="description">
                    <el-input type="textarea" v-model="target.description" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="数值类别：" prop="meterType">
                    <el-input v-model="target.meterType" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="计量单位：" prop="meterUnit">
                    <el-input v-model="target.meterUnit" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="表名：" prop="tableName">
                    <el-input v-model="target.tableName" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="分类编码：" prop="typeCode">
                    <el-input v-model="target.typeCode" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="指标编码：" prop="targetNo">
                    <el-input  v-model="target.targetNo" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="分类名称：" prop="typeName">
                    <el-input  v-model="target.typeName" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="排序值：" prop="gradation">
                    <el-input v-model="target.gradation" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="手机链接：" prop="url">
                    <el-input v-model="target.url" class="input-width"></el-input>
                    <el-button type="primary" @click="selectUEUrlDialogVisible = true">选择url</el-button>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="pad链接：" prop="padUrl">
                    <el-input v-model="target.padUrl" class="input-width"></el-input>
                    <el-button type="primary" @click="selectPadUEUrlDialogVisible = true">选择url</el-button>
                </el-form-item>
                <el-form-item v-if="target.level > 2" label="图标：" prop="pic">
                    <el-upload
                            class="avatar-uploader"
                            :action="baseUrl+'/command/picture'"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="target.pic" :src="baseUrl+target.pic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
                <span slot="footer" class="dialog-footer">
    <el-button @click="targetDetailDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit('targetFrom')">保 存</el-button>
  </span>
        </el-dialog>
        <el-dialog
                append-to-body
                center
                title="选择项目url"
                :visible.sync="selectUEUrlDialogVisible"
                width="50%"
        >
            <u-e-url-select @onDataSelectChange="phoneUrlSelect"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="selectUEUrlDialogVisible = false">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog
                append-to-body
                center
                title="选择项目url"
                :visible.sync="selectPadUEUrlDialogVisible"
                width="50%"
        >
            <u-e-url-select @onDataSelectChange="padUrlSelect"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="selectPadUEUrlDialogVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </el-card>
    </div>
</template>

<script>
    import UEUrlSelect from '../../components/UEUrlSelect';

    import {fetchList,saveTarget,deleteTarget,getTargetById,updateGradationById} from "../../api/target";
    import {config} from "../../utils/config";
    import {getUeToken} from "../../utils/auth";

    const defaultTarget = {
        name:'',
        parentId:0,
        description:'',
        url:'',
        padUrl:'',
        pic:'',
        meterType:'',
        meterUnit:'',
        tableName:'',
        typeCode:'',
        targetNo:'',
        typeName:'',
        gradation:'',
    };
    export default {
        name: "Target",
        data() {
            return {
                baseUrl:config.baseUrl,
                expandKeys:[],
                target:defaultTarget,
                targetDetailDialogVisible: false,
                isEdit:false,
                treeData: [],
                defaultProps: {
                    children: 'child',
                    label: 'name'
                },
                selectUEUrlDialogVisible:false,
                selectPadUEUrlDialogVisible:false,
                tableData: [],
            }
        },
        created() {
            this.getList();
            getUeToken();
        },
        components:{
          UEUrlSelect
        },
        computed:{
            isCategoryItem(){
                return function(data){
                    return data.level == 1;
                };
            },
            getGradation() {
                return function(data){
                    return data.gradation;
                };
            }
        },
        methods: {
            phoneUrlSelect(data){
                this.target = {...this.target,url:data.url}
                this.selectUEUrlDialogVisible = false
            },
            padUrlSelect(data){
                this.target = {...this.target,padUrl:data.url}
                this.selectPadUEUrlDialogVisible = false
            },
            nodeExpand(data){
                this.expandKeys.push(data.id);
            },
            nodeCollapse(data){
                const index = this.expandKeys.indexOf((it)=>it.id === data.id);
                this.expandKeys.splice(index,1)
            },
            showAddCategoryDialog(){
                this.showEditDialog({id:0});
            },
            showEditDialog(data){
                this.isEdit = data.id ? true : false;
                if (this.isEdit){
                    getTargetById(data.id).then((res)=>{
                        console.log(res);
                        this.target = res;
                        this.targetDetailDialogVisible = true;
                    })
                } else {
                    this.targetDetailDialogVisible = true;
                    this.target = {...defaultTarget, parentId:data.id, level: 1}
                }
            },
            showAddDialog(data){
                this.targetDetailDialogVisible = true;
                this.target = {...defaultTarget, parentId:data.id, level: data.level + 1}
            },
            handleDelete(data){
                this.deleteTarget([data.id]);
            },
            handleGradation(data) {
                this.$prompt(`请输入指标'${data.name}'的排序值`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value } ) => {
                    value = parseInt(value);
                    if (isNaN(value)) {
                        this.$message.error('排序值只能输入数字!');
                        return;
                    }
                    updateGradationById(data.id, value).then(() => {
                        this.$set(data, 'gradation', value);
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    })
                })
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
            handleAvatarSuccess(res, file) {
                this.target = {...this.target,pic:res.url}
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 0.02;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 、JPEG、PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 20KB!');
                }
                return isJPG && isLt2M;
            },
            getList(){
                fetchList().then((res) => {
                    this.treeData = res;
                    this.tableData = res;
                })
            },
            deleteTarget(ids){
                this.$confirm('是否要删除该指标吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteTarget(ids).then(response=>{
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
                                saveTarget(this.target).then(response => {
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
                                saveTarget(this.target).then(response => {
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
