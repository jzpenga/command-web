<template>
    <div>
        <el-card class="operate-container" shadow="never">
            <el-row :gutter="10" type="flex" style="flex-wrap: wrap;">
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入编号" size="mini" v-model="listQuery.id" clearable><template slot="prepend">编号</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入名称" size="mini" v-model="listQuery.name" clearable><template slot="prepend">名称</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入组编号" size="mini" v-model="listQuery.groupId" clearable><template slot="prepend">组编号</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入URL" size="mini" v-model="listQuery.url" clearable><template slot="prepend">URL</template></el-input></el-col>
                <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入备注" size="mini" v-model="listQuery.remark" clearable><template slot="prepend">备注</template></el-input></el-col>

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
                      @sort-change="changeSort" >
                <el-table-column label="编号" width="160" align="center" sortable="custom" prop="id"></el-table-column>
                <el-table-column label="名称" width="200" align="left" sortable="custom" prop="name"></el-table-column>
                <el-table-column label="组编号" width="160" align="left" sortable="custom" prop="groupId"></el-table-column>
                <el-table-column label="URL" align="left" show-overflow-tooltip prop="url"></el-table-column>
                <el-table-column label="备注" align="left" sortable="custom" prop="remark"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   type="text"
                                   @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button size="mini"
                                   type="text"
                                   @click="handleParameters(scope.row)">参数
                        </el-button>
                        <el-button size="mini"
                                   type="text"
                                   @click="handleCopy(scope.row)">复制
                        </el-button>
                        <el-button size="mini"
                                   type="text"
                                   @click="handlePreview(scope.row)">预览
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

        <el-dialog title="请求参数管理" :visible.sync="dialogVisible" center width="90%" top="5vh" :close-on-click-modal="false">
            <el-card class="operate-container" shadow="never">
                <el-row :gutter="10" type="flex" style="flex-wrap: wrap;">
                    <el-col :lg="6" :md="8" :sm="12"><el-input size="mini" v-model="listQueryP.requestId" clearable :disabled="true"><template slot="prepend">请求编号</template></el-input></el-col>
                    <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入参数名" size="mini" v-model="listQueryP.name" clearable><template slot="prepend">参数名</template></el-input></el-col>
                    <el-col :lg="6" :md="8" :sm="12"><el-input placeholder="请输入参数值" size="mini" v-model="listQueryP.value" clearable><template slot="prepend">参数值</template></el-input></el-col>
                    <el-col :lg="6" :md="8" :sm="12">
                        <el-select v-model="listQueryP.type" placeholder="参数位置" size="mini" style="width: 100%" clearable>
                            <el-option v-for="(k,v) in typeOptions" :key="k" :value="v" :label="k"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="text-align: center">
                        <el-button size="mini" type="primary" icon="el-icon-search" @click="getListP(true)">查询</el-button>
                        <el-button size="mini" type="default" icon="el-icon-close" @click="resetParamsP()">重置</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleEditP({})" plain>添加</el-button>
                        <el-button size="mini" type="success" icon="el-icon-back" @click="dialogVisible = false" >关闭</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <div class="table-container">
                <el-table :data="listP" style="width: 100%;" v-loading="listLoadingP" size="mini" stripe border
                          @sort-change="changeSortP" >
                    <el-table-column label="编号" width="160" align="center" sortable="custom" prop="id"></el-table-column>
                    <el-table-column label="参数名" width="150" align="left" sortable="custom" prop="name"></el-table-column>
                    <el-table-column label="参数值" align="left" show-overflow-tooltip prop="value"></el-table-column>
                    <el-table-column label="参数位置" align="center" sortable="custom" prop="type" :formatter="translateType"></el-table-column>
                    <el-table-column label="操作" width="260" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini"
                                       type="text"
                                       v-if="scope.row.requestId == listQueryP.requestId"
                                       @click="handleEditP(scope.row)">编辑
                            </el-button>
                            <el-button size="mini"
                                       type="text"
                                       v-if="scope.row.requestId == listQueryP.requestId"
                                       @click="handleDeleteP(scope.row)">删除
                            </el-button>
                            <span v-if="scope.row.requestId != listQueryP.requestId">
                                继承自请求组({{scope.row.requestId}})
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div style="text-align: center; margin: 15px 0;">
                <el-pagination
                        background
                        @size-change="handleSizeChangeP"
                        @current-change="handleCurrentChangeP"
                        layout="total, sizes,prev, pager, next,jumper"
                        :page-size="listQueryP.size"
                        :page-sizes="[5,10,15]"
                        :current-page.sync="listQueryP.page"
                        :total="totalP">
                </el-pagination>
            </div>

            <span slot="footer" class="dialog-footer">

            </span>

            <el-dialog title="请求参数增改" :visible.sync="dialogVisiblePP" width="40%" center append-to-body :close-on-click-modal="false">
                <el-form :model="targetP" v-if="targetP" :rules="rulesP" label-width="0px" ref="targetFromP" size="small" label-position="right">
                    <el-form-item label="" v-if="targetP.id">
                        <el-input v-model="targetP.id" class="" size="mini" :disabled="true"><template slot="prepend">编&nbsp;&nbsp;&nbsp;&nbsp;号</template></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="name">
                        <el-input v-model="targetP.name" class=" " size="mini" maxlength="64"><template slot="prepend">参数名</template></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="value">
                        <el-input v-model="targetP.value" class="" size="mini" maxlength="512"><template slot="prepend">参数值</template></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="type">
                        <el-select v-model="targetP.type" placeholder="请选择参数位置" size="mini" clearable style="width: 100%;">
                            <el-option
                                    v-for="(k,v) in typeOptions"
                                    :key="k"
                                    :value="v"
                                    :label="k">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisiblePP = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="onSubmitP('targetFromP')" size="mini">保 存</el-button>
                </span>
            </el-dialog>
        </el-dialog>

        <el-dialog title="请求增改" :visible.sync="dialogVisibleR" width="40%" center :close-on-click-modal="false">
            <el-form :model="target" v-if="target" :rules="rules" label-width="0px" ref="targetFrom" size="small" label-position="right">
                <el-form-item label="" v-if="target.id">
                    <el-input v-model="target.id" class="" size="mini" :disabled="true"><template slot="prepend">编号</template></el-input>
                </el-form-item>
                <el-form-item label="" prop="name">
                    <el-input v-model="target.name" class="" size="mini" maxlength="64"><template slot="prepend">名称</template></el-input>
                </el-form-item>
                <el-form-item label="" prop="groupId">
                    <el-input v-model.number="target.groupId" class="" size="mini" maxlength="19"><template slot="prepend">组编号</template></el-input>
                </el-form-item>
                <el-form-item label="" prop="url">
                    <el-input v-model="target.url" class="" size="mini" maxlength="512"><template slot="prepend">URL</template></el-input>
                </el-form-item>
                <el-form-item label="" prop="remark">
                    <el-input v-model="target.remark" class="" size="mini" maxlength="128"><template slot="prepend">备注</template></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleR = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="onSubmit('targetFrom')" size="mini">保 存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="预览结果" :visible.sync="previewDataFlag" width="40%" top="5vh" center :close-on-click-modal="false">
            <pre style="overflow-y: auto; max-height: 500px;">{{previewData}}</pre>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="previewData = null;previewDataFlag = false;" size="mini">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        fetchList,
        remove,
        fetchListP,
        saveRequest,
        saveRequestParameter,
        removeParameter,
        copy, preview
    } from "../../api/data";
    const defaultListQuery = {
        page: 1,
        size: 10
    };

    const defaultListQueryP = {
        page: 1,
        size: 10
    };

    export default {
        name: "Data",
        data:function(){
            return{
                listQuery: Object.assign({}, defaultListQuery),
                target: null,
                targetP: null,
                dialogVisible:false,
                dialogVisibleR: false,
                dialogVisiblePP: false,
                previewDataFlag: false,
                previewData: null,
                list: null,
                total: null,
                listLoading: false,
                targetFrom: {
                    name: '',
                    url: '',
                    remark: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'change' },
                        { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change' }
                    ],
                    url: [
                        { required: true, message: '请输入URL', trigger: 'change' },
                        { min: 1, max: 512, message: '长度在 1 到 512 个字符', trigger: 'change' }
                    ],
                    remark: [
                        { min: 1, max: 128, message: '长度在 1 到 128 个字符', trigger: 'change' }
                    ]
                },

                typeOptions: {
                    '1': "请求头",
                    '2': "URL参数",
                    '3': "筛选条件",
                    '4': "字段映射",
                    '5': "额外字段"
                },
                listQueryP: Object.assign({}, defaultListQueryP),
                listLoadingP: false,
                listP: null,
                totalP: null,
                targetFromP: {
                    name: '',
                    value: '',
                    type: ''
                },
                rulesP: {
                    name: [
                        { required: true, message: '请输入参数名', trigger: 'change' },
                        { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'change' }
                    ],
                    value: [
                        { required: true, message: '请输入参数值', trigger: 'change' },
                        { min: 1, max: 512, message: '长度在 1 到 512 个字符', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请选择参数位置', trigger: 'change' }
                    ],
                },
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
                this.dialogVisibleR = true;
            },
            handleCopy(data) {
                this.$confirm(`确定要复制该条数据（名称:${data.name}）吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    copy(data).then(() => {
                        this.$message({
                            message: '复制成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.getList();
                    })
                })
            },
            handlePreview(data) {
                this.$prompt('请输入url参数', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value } ) => {
                    preview(data, value).then((response) => {
                        this.previewDataFlag = true;
                        this.previewData = response;
                    })
                })
            },
            resetParams() {
                let order = this.listQuery;
                this.listQuery = Object.assign({}, defaultListQuery);
                this.getList(true, order);
            },
            handleParameters(data) {
                defaultListQueryP.requestId = data.id;
                this.listQueryP = Object.assign({}, defaultListQueryP);
                this.dialogVisible = true;
                this.getListP();
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
                        this.getList();
                    })
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        saveRequest({...this.target}).then(() => {
                            this.$refs[formName].resetFields();
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000
                            });
                            this.dialogVisibleR = false;
                            this.getList();
                        })
                    } else {
                        this.$message({
                            message: '参数验证失败',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                });
            },

            getListP(manual, order) {
                this.listLoadingP = true;
                if (manual) {
                    this.listQueryP.page = 1;
                }
                if (order) {
                    this.listQueryP.order = order.order;
                    this.listQueryP.prop = order.prop;
                }
                fetchListP(this.listQueryP).then(response => {
                    this.listLoadingP = false;
                    const {content,totalElements} = response;
                    this.listP = content;
                    this.totalP = Number.parseInt(totalElements);
                })
            },
            resetParamsP() {
                let order = this.listQueryP;
                this.listQueryP = Object.assign({}, defaultListQueryP);
                this.getListP(true, order);
            },
            handleEditP(data) {
                this.targetP = Object.assign({requestId: defaultListQueryP.requestId}, data);
                this.dialogVisiblePP = true;
            },
            handleDeleteP(data) {
                this.$confirm(`确定要删除该数据（编号:${data.id}）吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeParameter(data).then(() => {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.getListP();
                    })
                })
            },
            changeSortP(data) {
                this.getListP(true, data);
            },
            translateType(val) {
                return this.typeOptions[val.type];
            },
            handleSizeChangeP(val) {
                this.listQueryP.page = 1;
                this.listQueryP.size = val;
                defaultListQueryP.size = val;
                this.getListP(true);
            },
            handleCurrentChangeP(val) {
                this.listQueryP.page = val;
                this.getListP();
            },
            onSubmitP(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        saveRequestParameter({...this.targetP}).then(() => {
                            this.$refs[formName].resetFields();
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000
                            });
                            this.dialogVisiblePP = false;
                            this.getListP();
                        })
                    } else {
                        this.$message({
                            message: '参数验证失败',
                            type: 'error',
                            duration: 1000
                        });
                        return false;
                    }
                });
            },
        },
        created() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>