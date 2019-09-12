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
    </div>

</template>

<script>
    import {fetchList,deleteUser} from "../../api/user";

    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        name: null,
        type: null,
        endTime:null
    };
    export default {
        name: "index",
        data:function(){
            return{
                listQuery: Object.assign({}, defaultListQuery),
                dialogVisible:false,
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
        methods:{
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            handleDelete(index,row){
                this.deleteUser([row.id]);

            },
            handleAdd(){
                this.$router.push({path: '/userManager/addUser'})
            },
            handleUpdate(index,row){
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
                    console.log('getList', response)
                    this.list = response.rows;
                    this.total = response.total;
                })
            },
            deleteUser(ids){
                this.$confirm('是否要删除该用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteUser(ids).then(response=>{
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
