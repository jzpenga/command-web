<template>
    <div>

        <el-card class="operate-container" shadow="never">
            <el-row :gutter="10" type="flex" style="flex-wrap: wrap;">
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入编号" size="mini" v-model="listQuery.id" clearable><template slot="prepend">编号</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入角色名称" size="mini" v-model="listQuery.name" clearable><template slot="prepend">名称</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入角色描述" size="mini" v-model="listQuery.description" clearable><template slot="prepend">描述</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-date-picker
                            size="mini"
                            v-model="listQuery.createTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            start-placeholder="创建日期开始"
                            end-placeholder="创建日期结束"
                            :picker-options="pickerOptions"
                            value-format="MM/dd/yyyy"
                            style="width: 100%;">
                    </el-date-picker>
                </el-col>
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
                      @sort-change="changeSort">
                <el-table-column label="编号" width="160" align="center" sortable="custom" prop="id"></el-table-column>
                <el-table-column label="角色名称" width="140" align="left" sortable="custom" prop="name"></el-table-column>
                <el-table-column label="角色描述" align="left" show-overflow-tooltip prop="description"></el-table-column>
                <el-table-column label="创建时间" width="160" align="center" sortable="custom" prop="createTime"></el-table-column>
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
                    :page-size="listQuery.size"
                    :page-sizes="[5,10,15]"
                    :current-page.sync="listQuery.page"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import {fetchList,deleteRole} from "../../api/userRole";
    import {config} from "../../utils/config";

    const defaultListQuery = {
        page: 1,
        size: 10
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
                pickerOptions: config.dateRangePickDay,
            }
        },
        methods:{
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            handleDelete(index,row){
                this.deleteRole([row.id]);
            },
            handleAdd(){
                this.$router.push({path: '/roleManager/addUserRole'})
            },
            handleUpdate(index,row){
                this.$router.push({path: '/roleManager/editUserRole', query: {id: row.id}})
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
            changeSort(data) {
                this.getList(true, data);
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
                let params = Object.assign({}, this.listQuery);
                if (params.createTime) {
                    params.createTime1 = params.createTime[0];
                    params.createTime2 = params.createTime[1];
                    delete params.createTime;
                }
                fetchList(params).then(response => {
                    this.listLoading = false;
                    const {content,totalElements} = response;
                    this.list = content;
                    this.total = Number.parseInt(totalElements);
                })
            },
            deleteRole(ids){
                this.$confirm('是否要删除该角色吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRole(ids).then(() =>{
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
