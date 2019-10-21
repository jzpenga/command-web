<template>
    <div>
        <el-card class="operate-container" shadow="never">
            <el-row :gutter="10" type="flex" style="flex-wrap: wrap;">
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入编号" size="mini" v-model="listQuery.id" clearable><template slot="prepend">编号</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入用户名" size="mini" v-model="listQuery.username" clearable><template slot="prepend">用户名</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入昵称" size="mini" v-model="listQuery.nickName" clearable><template slot="prepend">昵称</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入电话" size="mini" v-model="listQuery.phone" clearable><template slot="prepend">电话</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入邮箱" size="mini" v-model="listQuery.email" clearable><template slot="prepend">邮箱</template></el-input></el-col>
            </el-row>
            <el-row >
                <el-col style="text-align: center">
                    <el-button size="mini" type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
                    <el-button size="mini" type="default" icon="el-icon-close" @click="resetParams()">重置</el-button>
                    <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAdd()" plain>添加</el-button>
                </el-col>
            </el-row>
        </el-card>

        <div class="table-container">
            <el-table :data="list" style="width: 100%;" v-loading="listLoading" size="mini" stripe border
                       @sort-change="changeSort" :default-sort = "listQuery">
                <el-table-column label="编号" width="160" align="center" sortable="custom" prop="id">
                </el-table-column>
                <el-table-column label="用户名" align="left" width="120"  sortable="custom" prop="username">
                </el-table-column>
                <el-table-column label="昵称" align="center" width="100" sortable="custom" prop="nickName">
                </el-table-column>
                <el-table-column label="电话" align="left" width="100" sortable="custom" prop="phone">
                </el-table-column>
                <el-table-column label="邮箱" align="left" sortable="custom" prop="email">
                </el-table-column>
                <el-table-column label="创建时间" align="center" sortable="custom" prop="createTime">
                </el-table-column>
                <el-table-column label="操作" width="240" align="center">
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
                    :page-size="listQuery.size"
                    :page-sizes="[5,10,15]"
                    :current-page.sync="listQuery.page"
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

    const defaultListQuery = {
        page: 1,
        size: 10,
        prop: 'id',
        order: 'descending'
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
                this.listQuery.page = 1;
                this.listQuery.size = val;
                defaultListQuery.size = val;
                this.getList(true);
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList();
            },
            resetParams() {
                let order = this.listQuery;
                this.listQuery = Object.assign({}, defaultListQuery);
                this.getList(true, order);
            },
            getList(manual, order) {
                this.listLoading = true;
                if (manual) {
                    this.listQuery.page = 1;
                }
                if (order) {
                    this.listQuery.order = order.order;
                    this.listQuery.prop = order.prop;
                }
                console.log(this.listQuery);
                console.log(order);
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    const {content, totalElements} = response;
                    this.list = content;
                    this.total = Number.parseInt(totalElements);
                })
            },
            changeSort(data) {
                this.getList(true, data);
            },
            deleteUser(ids) {
                this.$confirm('是否要删除该用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser(ids).then(() => {
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
        }
    }
</script>

<style scoped>

</style>
