<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>已选列表</span>
                    </div>
                    <div class="card-content">
                        <div v-for="item in optionalList" :key="item.id" class="option-item" @click="optionalItemClick(item)" v-bind:class="urlData.id === item.id ? 'select-text':''">
                            {{item.name}}
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{urlData.name ? urlData.name : '左侧列表选择一项'}}</span>
                    </div>
                    <div class="card-content" v-if="urlData.id">
                        <el-form :model="urlData"
                                 ref="urlForm"
                                 label-width="100px"
                                 size="small">
                            <el-form-item label="手机链接：" prop="url">
                                <el-input v-model="urlData.url" class="input-width"></el-input>
                            </el-form-item>
                            <el-form-item label="pad链接：" prop="padUrl">
                                <el-input v-model="urlData.padUrl" class="input-width"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="onSubmit('urlForm')">保 存</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import {getTargetListByUserId} from "../../../api/target";
    import {saveUrl} from "../../../api/userDiversification";
    import {getSubjectListByUserId} from "../../../api/suject";

    const defaultUrlData = {
        url: '',
        padUrl: ''
    };
    export default {
        name: "BindUserUrl",
        props: {
            userId: {
                type: String,
                default: '0'
            },
            dataType: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                urlData: defaultUrlData,
                optionalList: [],
            }
        },

        created() {
            if (this.dataType === 'target'){
                this.getTargetList();
            } else if (this.dataType === 'subject') {
                this.getSubjectList();
            }

        },
        watch: {
            userId(val) {
                if (this.dataType === 'target'){
                    this.getTargetList();
                } else if (this.dataType === 'subject') {
                    this.getSubjectList();
                }
            }
        },
        methods:{
            optionalItemClick(item){
                this.urlData = item;
            },
            getTargetList(){
                getTargetListByUserId(this.userId).then((res) => {
                    this.optionalList = res;
                })
            },
            getSubjectList(){
                getSubjectListByUserId(this.userId).then((res) => {
                    this.optionalList = res;
                })
            },
            onSubmit(formName){
                const data = {
                    userId:this.userId,
                    mainId:this.urlData.id,
                    ...this.urlData,
                    mainType:this.dataType
                };
                saveUrl(data).then((res)=>{
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                })
            }
        }
    }
</script>

<style scoped>
    .select-text{
        color: #1890ff
    }
    .card-content {
        height: 300px;
        overflow: auto;
        text-align: center;
    }

    .option-item {
        height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-items: center;
        cursor:pointer;
    }
</style>
