<template>

        <el-card class="form-container card-content" shadow="never">
            <el-tree :data="treeData"
                     :props="defaultProps"
                     default-expand-all
                     node-key="id"
                     :expand-on-click-node="false"
                     @node-click="handleNodeClick">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div>
                        <span>{{ data.name }}</span>
                        <!--                    <input placeholder="请输入部门名称" v-if="data.edit" class="name-input" v-model="data.name"></input>-->
                    </div>
                    <!--                <div class="option">-->
                    <!--                    <el-button v-if="!data.edit" @click="() => append(data)" size="mini" type="text">添加</el-button>-->
                    <!--                    <el-button v-if="!data.edit" type="text" size="mini" @click="() => edit(node, data)">编辑</el-button>-->
                    <!--                    <el-button v-if="!data.edit" type="text" size="mini" @click="() => remove(node, data)">删除</el-button>-->
                    <!--                    <el-button v-if="data.edit" type="text" size="mini" @click="() => save(node, data)">保存</el-button>-->
                    <!--                    <el-button v-if="data.edit" type="text" size="mini" @click="() => cancel(node, data)">取消</el-button>-->
                    <!--                </div>-->
                </div>
            </el-tree>
        </el-card>

</template>

<script>
    let id = 1000;
    import {fetchList} from "../../api/organiz";

    export default {
        name: "Organizational",
        data() {
            return {
                lastName:'',
                treeData: [],
                defaultProps: {
                    children: 'child',
                    label: 'name'
                }
            }
        },
        created(){
            fetchList().then((res)=>{
                this.treeData = res;
            })
        },
        methods: {
            handleNodeClick(data) {
                console.log('handleNodeClick',data);
            },
            // append(data) {
            //     const newChild = {id: id++, name: '',edit:true, children: []};
            //     if (!data.children) {
            //         this.$set(data, 'children', []);
            //     }
            //     data.children.push(newChild);
            //     // service.save({}).then(res => {
            //     //     console.log(res)
            //     // });
            // },
            // remove(node, data) {
            //     let children = this.getNodeChildren(node);
            //     const index = children.findIndex(d => d.id === data.id);
            //     children.splice(index, 1);
            // },
            // edit(node, data) {
            //     this.lastName = data.name;
            //     this.toggleEdit(node,data);
            // },
            // cancel(node, data) {
            //     this.toggleEdit(node,data);
            //     data.name = this.lastName;
            // },
            // save(node, data){
            //     this.toggleEdit(node,data);
            // },
            // toggleEdit(node,data){
            //     let children = this.getNodeChildren(node);
            //     const index = children.findIndex(d => d.id === data.id);
            //     children[index].edit = !children[index].edit;
            // },
            // getNodeChildren(node){
            //     const parent = node.parent;
            //     return  parent.data.children || parent.data;
            // }

        }
    }
</script>

<style lang="scss" scoped>
    .custom-tree-node{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .name-input{
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 26px;
        line-height: 26px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
    .card-content{
        height: 600px;
        overflow: auto
    }
</style>
