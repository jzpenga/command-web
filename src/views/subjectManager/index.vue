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
                    <el-button v-if="isCategoryItem(data)" type="text" size="mini" @click="() => showEditDialog(node, data, false,true)">添加子分类</el-button>
                    <el-button v-if="!isCategoryItem(data)" type="text" size="mini" @click="() => showEditDialog(node, data, false,false)">添加子专题</el-button>
                    <el-button type="text" size="mini" @click="() => showEditDialog(node, data,true, isCategoryItem(data))">编辑</el-button>
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
                <el-form-item v-if="!isEditCategory" label="描述：" prop="description">
                    <el-input type="textarea" v-model="target.description" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="!isEditCategory" label="负责部门：" prop="buildUnit">
                    <el-input type="textarea" v-model="target.buildUnit" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="!isEditCategory" label="研制单位：" prop="dutyDept">
                    <el-input type="textarea" v-model="target.dutyDept" class="input-width"></el-input>
                </el-form-item>
                <el-form-item v-if="!isEditCategory" label="发布时间：" >
                    <el-col :span="6">
                        <el-form-item prop="date1">
                            <el-date-picker type="date"
                                            value-format="yyyy/MM/dd"
                                            placeholder="选择日期"
                                            v-model="target.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1"> </el-col>
                    <el-col :span="6">
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间"
                                            value-format="HH:mm:ss"
                                            v-model="target.date2"
                                            style="width: 100%;"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item v-if="!isEditCategory" label="手机链接：" prop="url">
                    <el-button type="primary" @click="selectUEUrlDialogVisible = true">选择url</el-button>
                    <span>  {{target.url}}</span>
                </el-form-item>
                <el-form-item v-if="!isEditCategory" label="pad链接：" prop="padUrl">
                    <el-button type="primary" @click="selectPadUEUrlDialogVisible = true">选择url</el-button>
                    <span>  {{target.padUrl}}</span>
                </el-form-item>
                <el-form-item v-if="!isEditCategory" label="图标：" prop="pic">
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

</template>

<script>
    let id = 1000;
    import {fetchList,saveSubject,deleteSubject,getSubjectById} from "../../api/suject";
    import {config} from "../../utils/config";
    import {formatDate} from '@/utils/date';
    import UEUrlSelect from '../../components/UEUrlSelect';


    const defaultTarget = {
        name:'',
        parentId:0,
        description:'',
        url:'',
        padUrl:'',
        pic:'',
        buildUnit:'',
        dutyDept:'',
        publishTime:'',
        date1:'',
        date2:''
    };
    export default {
        name: "Subject",
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
                },
                selectUEUrlDialogVisible:false,
                selectPadUEUrlDialogVisible:false
            }
        },
        created() {
            this.getList();
        },
        components:{
            UEUrlSelect
        },
        computed:{
            isCategoryItem(){
                return function(data){
                    let path = data.path;
                    return path.split("-").length<2
                };
            },
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
                this.showEditDialog(null,{id:0},false,true);
            },
            showEditDialog(node, data, isEdit,isEditCategory){
                this.isEdit = isEdit;
                this.isEditCategory = isEditCategory;
                if (isEdit && data.path.split("-").length === 2){
                    this.isEditCategory = true;
                }
                if (this.isEdit){
                    getSubjectById(data.id).then((res)=>{
                        let date1 = '';
                        let date2 = '';
                        if (res.publishTime) {
                            date1 = res.publishTime.split(' ')[0];
                            date2 = res.publishTime.split(' ')[1];
                        }
                        this.target = {...res,date1:date1,date2:date2};
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
                })
            },
            deleteTarget(ids){
                this.$confirm('是否要删除该指标吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSubject(ids).then(response=>{
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
                                saveSubject({...this.target,publishTime: this.target.date1+' '+this.target.date2}).then(response => {
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
                                saveSubject({...this.target,publishTime: this.target.date1+' '+this.target.date2}).then(response => {
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
