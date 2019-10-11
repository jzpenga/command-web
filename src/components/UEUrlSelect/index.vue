<template>
    <div style="height: 400px;overflow: auto">
        <el-tree :data="treeData"
                 :props="defaultProps"
                 default-expand-all
                 node-key="id"
                 :expand-on-click-node="false"
                 >
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <div>
                    <span>{{ data.name }}</span>
                </div>
                <div class="option">
                    <el-button type="text" size="mini" @click="() => selectOption(node, data)">选择</el-button>
                </div>
            </div>
        </el-tree>
    </div>

</template>

<script>
    import {fetchUrl,fetchList} from "../../api/ue";
    import {config} from "../../utils/config";

    export default {
        name: "index",
        data(){
            return{
                treeData: [],
                defaultProps: {
                    children: 'child',
                    label: 'name'
                }
            }
        },
        created(){
            fetchList().then(res=>{
                this.treeData = res
            })
        },
        methods:{
            selectOption(node, data){
                fetchUrl({
                    projectId:data.projectId,
                    pageId:data.id
                }).then(res=>{
                    console.log(res.data.data);
                    this.$emit("onDataSelectChange",{name:data.name,url:res.data.data.replace(config.ueUrl,"")});
                })
            }
        }
    }
</script>

<style scoped>
    .custom-tree-node{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
