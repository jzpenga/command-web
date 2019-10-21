<template>
    <div>
        <el-card class="operate-container" shadow="never">
            <el-row :gutter="10">
                <el-col :span="4"><el-input placeholder="请输入名称" size="mini" v-model="listQuery.name" clearable></el-input></el-col>
                <el-col :span="4"><el-input placeholder="请输入URL" size="mini" v-model="listQuery.url" clearable></el-input></el-col>
                <el-col :span="4"><el-input placeholder="请输入备注" size="mini" v-model="listQuery.remark" clearable></el-input></el-col>

                <el-col :span="6">
                    <el-button size="mini" type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
                    <el-button size="mini" type="default" icon="el-icon-close" @click="resetParams()">重置</el-button>
                    <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleEdit({})" plain>添加</el-button>
                </el-col>
            </el-row>
        </el-card>

        <div class="table-container">
            <el-table :data="list" style="width: 100%;" v-loading="listLoading" size="mini" stripe border
                      @sort-change="changeSort" :default-sort = "listQuery">
                <el-table-column label="编号" width="120" align="center" sortable="custom" prop="id"></el-table-column>
                <el-table-column label="名称" align="left" sortable="custom" prop="name"></el-table-column>
                <el-table-column label="URL" align="left" show-overflow-tooltip prop="url"></el-table-column>
                <el-table-column label="备注" align="center" sortable="custom" prop="remark"></el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   type="text"
                                   @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="text"
                                   @click="handleDelete(scope.row)">删除
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
    import {fetchList, remove} from "../../api/data";
    const defaultListQuery = {
        page: 1,
        size: 10,
        prop: 'id',
        order: 'descending'
    };

    export default {
        name: "Data",
        data:function(){
            return{
                listQuery: Object.assign({}, defaultListQuery),
                target: null,
                dialogVisible:false,
                list: null,
                total: null,
                listLoading: false
            }
        },
        methods:{
            getList(manual, order) {
                this.listLoading = true;
                if (manual) {
                    this.listQuery.page = 1;
                }
                if (order) {
                    this.listQuery.order = order.order;
                    this.listQuery.prop = order.prop;
                }
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    const {content,totalElements} = response;
                    this.list = content;
                    this.total = Number.parseInt(totalElements);
                })
            },
            changeSort(data) {
                this.getList(true, data);
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
            handleEdit(data) {
                this.target = Object.assign({}, data);
                this.dialogVisible = true;
            },
            handleDelete(data) {
                this.$confirm(`确定要删除该条数据（名称:${data.name}）吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    remove(data).then(() => {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.dialogVisible = false;
                        this.getList();
                    })
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