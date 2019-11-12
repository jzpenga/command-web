<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="user"
                 ref="userFrom"
                 label-width="100px"
                 size="small">
            <el-form-item label="用户名：" prop="userName">
                <el-input v-model="user.username" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="昵称：" prop="nickName">
                <el-input v-model="user.nickName" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="phone">
                <el-input v-model="user.phone" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="user.email" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="user.password" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="部门：" prop="departmentName">
                <el-button type="primary" @click="deptDialogVisible = true">选择部门</el-button>
                <span>  {{user.departmentName}}</span>
            </el-form-item>
            <el-form-item label="区域：" prop="areaName">
                <el-button type="primary" @click="areaDialogVisible = true">选择区域</el-button>
                <span>  {{user.areaName}}</span>
            </el-form-item>
            <el-form-item label="绑定指标：" prop="targetIds">
                <el-button type="primary" @click="targetDialogVisible = true">绑定指标</el-button>
                <span>（已选{{user.targetDefIds.length}}个指标）</span>
                <!--        <el-input v-model="userRole.targetIds" class="input-width"></el-input>-->
            </el-form-item>
            <el-form-item label="绑定专题：" prop="subjectIds">
                <el-button type="primary" @click="subjectDialogVisible = true">绑定专题</el-button>
                <span>（已选{{user.subjectIds.length}}个专题）</span>
                <!--        <el-input v-model="userRole.subjectIds" class="input-width"></el-input>-->
            </el-form-item>

            <el-form-item label="角色：" prop="rolesId">
                <el-button type="primary" @click="roleDialogVisible = true">绑定角色</el-button>
                <span>（已选{{user.roleIds.length}}个角色）</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('userFrom')">提交</el-button>
                <el-button v-if="!isEdit" @click="resetForm('userFrom')">重置</el-button>
                <el-button @click="$router.back()">返回</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
                center
                title="绑定指标"
                :visible.sync="targetDialogVisible"
                width="50%"
                :before-close="handleClose">
            <tree-data-select dataType="target" v-bind:outerSelectList="user.targetDefVos"
                              v-bind:outerSelectIdList="user.targetDefIds"
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
            <tree-data-select dataType="subject" v-bind:outerSelectList="user.subjectVos"
                              v-bind:outerSelectIdList="user.subjectIds"
                              @onDataSelectChange="handleSelectSubject"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="subjectDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmSubjectBind()">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                center
                title="选择部门"
                :visible.sync="deptDialogVisible"
                width="50%"
                :before-close="handleClose">
            <el-tree
                    :data="deptTreeData"
                    ref="deptTree"
                    show-checkbox
                    node-key="id"
                    check-strictly
                    @check="checks"
                    default-expand-all
                    :default-checked-keys="deptChecked"
                    :props="defaultDeptTreeProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
    <el-button @click="deptDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmDeptBind()">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                center
                title="选择区域"
                :visible.sync="areaDialogVisible"
                width="50%"
                :before-close="handleClose">
            <el-tree
                    :data="areaTreeData"
                    ref="areaTree"
                    show-checkbox
                    node-key="id"
                    check-strictly
                    @check="checksArea"
                    default-expand-all
                    :default-checked-keys="areaChecked"
                    :props="defaultDeptTreeProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
    <el-button @click="areaDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAreaBind()">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                center
                title="绑定角色"
                :visible.sync="roleDialogVisible"
                width="50%"
                :before-close="handleClose">
            <tree-data-select dataType="role" v-bind:outerSelectList="user.roleVos"
                              v-bind:outerSelectIdList="user.roleIds"
                              @onDataSelectChange="handleSelectRole"/>
            <span slot="footer" class="dialog-footer">
    <el-button @click="roleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmRoleBind()">确 定</el-button>
  </span>
        </el-dialog>
    </el-card>
</template>

<script>
    import TreeDataSelect from '../../../components/TreeDataSelect'
    import {getUserById, saveUser} from "../../../api/user";
    import * as org from "../../../api/organiz";
    import * as area from "../../../api/area";

    const defaultUser = {
        areaId:'',
        areaName:'',
        "departmentId": "",
        "departmentName": "",
        deptName: "",
        "email": "",
        "head": "",
        "username": "",
        "nickName": "",
        "password": "",
        "phone": "",
        roleIds: [],
        roleVos: [],
        subjectIds: [],
        subjectVos: [],
        targetDefIds: [],
        targetDefVos: []
    };
    export default {
        name: "userDetail",
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        components: {
            TreeDataSelect
        },
        data() {
            return {
                deptTreeData: [],
                deptChecked: [],
                deptDialogVisible: false,
                areaTreeData: [],
                areaChecked: [],
                areaDialogVisible: false,
                targetDialogVisible: false,
                subjectDialogVisible: false,
                roleDialogVisible: false,
                tempTargetIds: [],
                tempSubjectIds: [],
                tempRoleIds: [],
                roleData:[],
                user: defaultUser,
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
                },
                defaultDeptTreeProps: {
                    children: 'child',
                    label: 'name'
                }
            }
        },
        created() {
            if (this.isEdit) {
                getUserById(this.$route.query.id).then(response => {
                    this.user = response;
                    if (response.departmentId) {
                        this.deptChecked = [response.departmentId];
                    }
                    if (response.areaId) {
                        this.areaChecked = [response.areaId];
                    }
                });
            } else {
                this.user = Object.assign({}, defaultUser);
            }
            org.fetchList().then((res) => {
                this.deptTreeData = res;
            })
            area.fetchList().then((res) => {
                this.areaTreeData = res;
            })
        },
        methods: {
            checks(data){
                this.$refs.deptTree.setCheckedKeys([data.id],true);
            },
            checksArea(data){
                this.$refs.areaTree.setCheckedKeys([data.id],true);
            },
            confirmDeptBind() {
                let deptId = this.$refs.deptTree.getCheckedKeys();
                let deptName = this.$refs.deptTree.getCheckedNodes();
                if (deptId && deptId.length > 0) {
                    this.user = {...this.user, departmentId: deptId[0], departmentName: deptName[0].name};
                } else {
                    this.user = {...this.user, departmentId: '', departmentName: ''};

                }
                this.deptDialogVisible = false;
            },
            confirmAreaBind() {
                let areaId = this.$refs.areaTree.getCheckedKeys();
                let areaName = this.$refs.areaTree.getCheckedNodes();
                if (areaId && areaId.length > 0) {
                    this.user = {...this.user, areaId: areaId[0], areaName: areaName[0].name};
                } else {
                    this.user = {...this.user, areaId: '', areaName: ''};

                }
                this.areaDialogVisible = false;
            },
            confirmSubjectBind() {
                this.user = {...this.user, subjectIds: [...this.tempSubjectIds]};
                this.subjectDialogVisible = false;
            },
            confirmTargetBind() {
                this.user = {...this.user, targetDefIds: [...this.tempTargetIds]};
                this.targetDialogVisible = false;
            },
            confirmRoleBind() {
                this.user = {...this.user, roleIds: [...this.tempRoleIds]};
                this.roleDialogVisible = false;
            },
            handleSelectTarget(list) {
                this.tempTargetIds = list;
            },
            handleSelectSubject(list) {
                this.tempSubjectIds = list;
            },
            handleSelectRole(list) {
                this.tempRoleIds = list;
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
                                saveUser(this.user).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration: 1000
                                    });
                                    this.$router.back();
                                });
                            } else {
                                saveUser(this.user).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.user = Object.assign({}, defaultUser);
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
                this.user = Object.assign({}, defaultUser);
            }
        }
    }
</script>

<style scoped>
    .card-content {
        height: 300px;
        overflow: auto
    }
</style>
