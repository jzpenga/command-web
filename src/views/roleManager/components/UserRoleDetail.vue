<template> 
    <el-card class="form-container" shadow="never">
        <el-form :model="userRole"
                 :rules="rules"
                 ref="userRoleFrom"
                 label-width="150px"
                 size="small">
            <el-form-item label="角色名称：" prop="name">
                <el-input v-model="userRole.name" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="keyword：" prop="keyword">
                <el-input v-model="userRole.keyword" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="角色描述：" prop="description">
                <el-input v-model="userRole.description" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="绑定指标：" prop="targetIds">
                <el-button type="primary" @click="targetDialogVisible = true">绑定指标</el-button>
                <span>（已选{{userRole.targetIds.length}}个指标）</span>
                <!--        <el-input v-model="userRole.targetIds" class="input-width"></el-input>-->
            </el-form-item>
            <el-form-item label="绑定专题：" prop="subjectIds">
                <el-button type="primary" @click="subjectDialogVisible = true">绑定专题</el-button>
                <span>（已选{{userRole.subjectIds.length}}个专题）</span>
                <!--        <el-input v-model="userRole.subjectIds" class="input-width"></el-input>-->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('userRoleFrom')">提交</el-button>
                <el-button v-if="!isEdit" @click="resetForm('userRoleFrom')">重置</el-button>
                <el-button @click="$router.back()">返回</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
                center
                title="绑定指标"
                :visible.sync="targetDialogVisible"
                width="50%"
                :before-close="handleClose">
            <tree-data-select dataType="target" v-bind:outerSelectList="userRole.targets"
                              v-bind:outerSelectIdList="userRole.targetIds"
                              @onDataSelectChange="handleSelectTarget"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="targetDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmTargetBind()">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog
                center
                title="绑定专题"
                :visible.sync="subjectDialogVisible"
                width="50%"
                :before-close="handleClose">
            <tree-data-select dataType="subject" v-bind:outerSelectList="userRole.subjects"
                              v-bind:outerSelectIdList="userRole.subjectIds"
                              @onDataSelectChange="handleSelectSubject"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="subjectDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmSubjectBind()">确 定</el-button>
  </span>
        </el-dialog>

    </el-card>
</template>
<script>
    import TreeDataSelect from '../../../components/TreeDataSelect'

    import {getRoleById, saveRole} from "../../../api/userRole";

    const defaultUserRole = {
        "description": "",
        "keyword": "",
        "name": "",
        "permissionIds": [],
        "subjectIds": [],
        "targetIds": [],
        "subjects": [],
        "targets": []
    };
    export default {
        name: 'UserRoleDetail',
        components: {
            TreeDataSelect
        },
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                targetDialogVisible: false,
                subjectDialogVisible: false,
                userRole: defaultUserRole,
                tempTargetIds: [],
                tempSubjectIds: [],
                rules: {
                    name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
                    ],
                    keyword: [
                        {required: true, message: '请输入角色控制', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入角色描述', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            if (this.isEdit) {
                getRoleById(this.$route.query.id).then(response => {
                    this.userRole = response;
                });
            } else {
                this.userRole = Object.assign({}, defaultUserRole);
            }
        },
        methods: {
            confirmSubjectBind() {
                this.userRole = {...this.userRole, subjectIds: [...this.tempSubjectIds]};
                this.subjectDialogVisible = false;
            },
            confirmTargetBind() {
                this.userRole = {...this.userRole, targetIds: [...this.tempTargetIds]};
                this.targetDialogVisible = false;
            },
            handleSelectTarget(list) {
                this.tempTargetIds = list;
            },
            handleSelectSubject(list) {
                this.tempSubjectIds = list;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
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
                                saveRole(this.userRole).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                    this.$router.back();
                                });
                            } else {
                                saveRole(this.userRole).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.userRole = Object.assign({}, defaultUserRole);
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                    this.$router.back();
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.userRole = Object.assign({}, defaultUserRole);
            }
        }
    }
</script>
<style scoped>
    .input-width {
        width: 70%;
    }
</style>


