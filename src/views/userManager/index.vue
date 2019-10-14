<template>
    <div>
        <!--        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->

        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <el-button size="mini" class="btn-add" @click="handleAdd()">添加用户</el-button>
        </el-card>
        <div class="table-container">
            <el-table ref="userRoleTable"
                      :data="list"
                      style="width: 100%;"
                      @selection-change="handleSelectionChange"
                      v-loading="listLoading" border>
                <el-table-column label="编号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="用户名" align="center">
                    <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                <el-table-column label="昵称" align="center">
                    <template slot-scope="scope">{{scope.row.nickName}}</template>
                </el-table-column>
                <el-table-column label="电话" align="center">
                    <template slot-scope="scope">{{scope.row.phone}}</template>
                </el-table-column>
                <el-table-column label="邮箱" align="center">
                    <template slot-scope="scope">{{scope.row.email}}</template>
                </el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template slot-scope="scope">{{scope.row.createTime}}</template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   type="text"
                                   @click="handleBindTargetUrl(scope.$index, scope.row)">绑定指标url
                        </el-button>
                        <el-button size="mini"
                                   type="text"
                                   @click="handleBindSubjectUrl(scope.$index, scope.row)">绑定专题url
                        </el-button>
                        <el-button size="mini"
                                   type="text"
                                   @click="handleUpdate(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="text"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes,prev, pager, next,jumper"
                    :page-size="listQuery.pageSize"
                    :page-sizes="[5,10,15]"
                    :current-page.sync="listQuery.pageNum"
                    :total="total">
            </el-pagination>
        </div>

        <el-dialog
                center
                title="编辑指标"
                :visible.sync="bindTargetUrlDialogVisible"
                width="50%">
            <bind-user-url v-bind:userId="userId" dataType="target"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bindTargetUrlDialogVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog
                center
                title="编辑专题"
                :visible.sync="bindSubjectUrlDialogVisible"
                width="50%">
            <bind-user-url v-bind:userId="userId" dataType="subject"/>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bindSubjectUrlDialogVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {fetchList, deleteUser} from "../../api/user";
    import BindUserUrl from './components/BindUserUrl';
    import {loginUe} from "../../utils/auth";

    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        name: null,
        type: null,
        endTime: null
    };
    export default {
        name: "index",
        data: function () {
            return {
                userId:'',
                bindTargetUrlDialogVisible:false,
                bindSubjectUrlDialogVisible:false,
                listQuery: Object.assign({}, defaultListQuery),
                dialogVisible: false,
                list: null,
                total: null,
                listLoading: false,
                multipleSelection: [],
                operates: [
                    {
                        label: "删除",
                        value: 0
                    }
                ]
            }
        },
        components:{
            BindUserUrl
        },
        methods: {
            handleBindTargetUrl(index, row) {
                this.bindTargetUrlDialogVisible = true;
                this.userId = row.id;
            },
            handleBindSubjectUrl(index, row) {
                this.bindSubjectUrlDialogVisible = true;
                this.userId = row.id;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleDelete(index, row) {
                this.deleteUser([row.id]);

            },
            handleAdd() {
                this.$router.push({path: '/userManager/addUser'})
            },
            handleUpdate(index, row) {
                this.$router.push({path: '/userManager/editUser', query: {id: row.id}})
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            getList() {
                this.listLoading = true;
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    console.log('getList', response);
                    const {content, totalElements} = response;
                    this.list = content;
                    this.total = Number.parseInt(totalElements);
                })
            },
            deleteUser(ids) {
                this.$confirm('是否要删除该用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser(ids).then(response => {
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
            }

        },
        created() {
            this.getList();
            loginUe();
        }
    }
</script>

<style scoped>

</style>
