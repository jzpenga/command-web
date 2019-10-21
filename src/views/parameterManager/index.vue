<template>
    <div>

        <el-card class="operate-container" shadow="never">
            <el-row :gutter="10" type="flex" style="flex-wrap: wrap;">
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入参数名" size="mini" v-model="listQuery.name" clearable><template slot="prepend">参数名</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入参数值" size="mini" v-model="listQuery.value" clearable><template slot="prepend">参数值</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入所属用户编号" size="mini" v-model="listQuery.userId" clearable><template slot="prepend">用户编号</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12">
                    <el-select v-model="listQuery.type" placeholder="参数类型" size="mini" clearable style="width: 100%">
                        <el-option v-for="(k,v) in typeOptions" :key="k" :value="v" :label="k"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row >
                <el-col style="text-align: center">
                    <el-button size="mini" type="primary" icon="el-icon-search" @click="getList(true)">查询</el-button>
                    <el-button size="mini" type="default" icon="el-icon-close" @click="resetParams()">重置</el-button>
                    <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleEdit({})" plain>添加</el-button>
                </el-col>
            </el-row>
        </el-card>

        <div class="table-container">
            <el-table :data="list" style="width: 100%;" v-loading="listLoading" size="mini" stripe border
                      @sort-change="changeSort">
                <el-table-column label="编号" width="160" align="center" sortable="custom" prop="id"></el-table-column>
                <el-table-column label="参数名" align="left" sortable="custom" prop="name"></el-table-column>
                <el-table-column label="参数值" align="left" show-overflow-tooltip prop="value"></el-table-column>
                <el-table-column label="参数类型" align="center" sortable="custom" prop="type" :formatter="translateType"></el-table-column>
                <el-table-column label="所属用户" align="left" prop="userId"></el-table-column>
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

        <el-dialog title="参数增改" :visible.sync="dialogVisible" width="40%" center>
            <el-form :model="target" v-if="target" :rules="rules" label-width="0" ref="targetFrom" size="small" label-position="right">
                <el-form-item label="" v-if="target.id">
                    <el-input v-model="target.id" size="mini" class="" :disabled="true"><template slot="prepend">编号</template></el-input>
                </el-form-item>
                <el-form-item label="" prop="name">
                    <el-input v-model="target.name" size="mini" class="" maxlength="64"><template slot="prepend">参数名</template></el-input>
                </el-form-item>
                <el-form-item label="" prop="value">
                    <el-input v-model="target.value" size="mini" class="" maxlength="256"><template slot="prepend">参数值</template></el-input>
                </el-form-item>
                <el-form-item label="" prop="type">
                    <el-select v-model="target.type" placeholder="请选择参数类型" size="mini" clearable style="width: 100%;">
                        <el-option
                                v-for="(k,v) in typeOptions"
                                :key="k"
                                :value="v"
                                :label="k">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="userId">
                    <el-input v-model.number="target.userId" size="mini" class="" maxlength="20"><template slot="prepend">用户编号</template></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="onSubmit('targetFrom')" size="mini">保 存</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import {add, fetchList, modify, remove} from "../../api/parameter";
    const defaultListQuery = {
        page: 1,
        size: 10
    };

    export default {
        name: "Parameter",
        data:function(){
            return{
                listQuery: Object.assign({}, defaultListQuery),
                target: null,
                dialogVisible:false,
                list: null,
                total: null,
                listLoading: false,
                typeOptions: {
                    '1': "全局参数",
                    '2': "用户参数"
                },
                targetFrom: {
                    name: '',
                    value: '',
                    type: '',
                    userId: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入参数名', trigger: 'change' },
                        { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change' }
                    ],
                    value: [
                        { required: true, message: '请输入参数值', trigger: 'change' },
                        { min: 1, max: 256, message: '长度在 1 到 256 个字符', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请选择参数类型', trigger: 'change' }
                    ],
                    userId: [
                        { min: 1, max: 19, message: '长度在 1 到 19 个字符', trigger: 'change' }
                    ]
                }
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
            translateType(val) {
              return this.typeOptions[val.type];
            },
            resetParams() {
                let order = this.listQuery;
                this.listQuery = Object.assign({}, defaultListQuery);
                this.getList(true, order);
            },
            handleEdit(data) {
                this.target = Object.assign({}, data);
                this.dialogVisible = true;
            },
            handleDelete(data) {
                this.$confirm(`确定要删除该条数据（编号:${data.id}）吗?`, '提示', {
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
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.target.id) {
                            modify({...this.target}).then(() => {
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.dialogVisible = false;
                                this.getList();
                            })
                        } else {
                            add({...this.target}).then(() => {
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.dialogVisible = false;
                                this.getList();
                            })
                        }
                    } else {
                        this.$message({
                            message: '参数验证失败',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                });
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>