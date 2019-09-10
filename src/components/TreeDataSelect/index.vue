<template>
    <el-row :gutter="20" >
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>指标分类</span>
                </div>
                <div class="card-content">
                    <el-tree :data="treeData" :props="treeProps" @node-click="handleTreeClick"></el-tree>
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>备选列表</span>
                </div>
                <div class="card-content">
                    <el-button size="mini" v-if="optionalStack.length>1" @click="backToLastLevel">返回上一级</el-button>
                    <el-checkbox-group v-model="selectedIdList">
                        <div v-for="item in optionalList" :key="item.id" class="option-item">
                            <el-checkbox  :label="item.id" v-model="item.id"   @change="optionalItemClick(item)">
                                <span>{{item.name}}</span>
                            </el-checkbox>
                            <i v-if="item.child.length > 0" class="el-icon-circle-plus-outline" @click="loadOptionChild(item)"></i>
                        </div>
                    </el-checkbox-group>
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>已选列表</span>
                </div>
               <div class="card-content">
                   <div v-for="item in selectedList" :key="item.id" class="option-item">
                       <span>{{ item.name }}</span>
                       <i class="el-icon-remove-outline" @click="removeSelect(item)"></i>
                   </div>
               </div>

            </el-card>
        </el-col>
    </el-row>

</template>

<script>
    import {targetTree} from "../../api/mcTarget";

    export default {
        name: "TreeDataSelect",
        data: function () {
            return {
                treeData: [],
                treeProps: {
                    children: 'child',
                    label: 'name'
                },
                optionalStack:[],
                optionalList: [],
                selectedList:[],
                selectedIdList:[]
            }
        },
        mounted() {
            targetTree(0).then((res) => {
                    this.treeData = res;
                }
            )
        },
        computed:{
        },
        methods: {
            removeSelect(item){
                let indexItem = this.selectedList.findIndex((it)=>{
                    return item.id===it.id
                });
                let indexId = this.selectedIdList.findIndex((it)=>{
                    return item.id===it
                });
                this.selectedList.splice(indexItem,1);
                this.selectedIdList.splice(indexId,2)
            },
            backToLastLevel(){
                this.optionalStack.pop();
                let id = this.optionalStack[this.optionalStack.length-1];
                this.loadOptionalData(id);
            },
            loadOptionalData(id){
                targetTree(id).then((res) => {
                        this.optionalList = res
                    }
                )
            },
            loadOptionChild(item){
                this.optionalStack.push(item.id);
                this.loadOptionalData(item.id);
            },
            handleTreeClick(data) {
                if (data.child){
                    return;
                }
                this.optionalStack=[];
                this.optionalStack.push(data.id);
                this.loadOptionalData(data.id);
            },
            optionalItemClick(item){
                let indexItem = this.selectedList.findIndex((it)=>{
                    return item.id===it.id
                });
                let indexId = this.selectedIdList.findIndex((it)=>{
                    return item.id===it
                });
                if (indexItem !== -1){
                    this.selectedList.splice(indexItem,1);
                    this.selectedIdList.splice(indexId,1)
                } else {
                    this.selectedList.push(item);
                    this.selectedIdList.push(item.id)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .card-content{
        height: 300px;
        overflow: auto
    }
    .option-item{
        height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-items: center;
        i{
            font-size: 16px;
            color: #333333;
            width: 32px;
            height: 32px;
            text-align: right;
            line-height: 32px;
        }
        .el-checkbox{
            margin-right: 0;
            font-weight: 400!important;
        }
    }


</style>
