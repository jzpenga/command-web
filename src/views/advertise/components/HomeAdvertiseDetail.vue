<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="homeAdvertise.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="图片：" prop="imageUrl">
        <el-upload
                class="avatar-uploader"
                :action="baseUrl+'/command/picture'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
          <img v-if="homeAdvertise.imageUrl" :src="baseUrl+homeAdvertise.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="排序：" prop="positionSort">
        <el-input v-model="homeAdvertise.positionSort" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="链接：" prop="link">
        <el-input v-model="homeAdvertise.link" class="input-width"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getHomeAdvertise, updateHomeAdvertise} from '../../../api/banner'
  import {config} from "../../../utils/config";

  const defaultHomeAdvertise = {
    name: null,
    link: null,
    imageUrl: null,
    positionSort: 0
  };
  export default {
    name: 'HomeAdvertiseDetail',
    components:{},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        baseUrl:config.baseUrl,
        homeAdvertise: null,
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          link: [
            {required: true, message: '请输入链接', trigger: 'blur'}
          ],
          positionSort: [
            {required: true, message: '请输入排序', trigger: 'blur'}
          ],
          imageUrl: [
            {required: true, message: '请选择图片', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      if (this.isEdit) {
        getHomeAdvertise(this.$route.query.id).then(response => {
          this.homeAdvertise = response.data;
        });
      }else{
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.homeAdvertise = {...this.homeAdvertise,imageUrl:res.url}
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 0.02;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 、JPEG、PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 20KB!');
        }
        return isJPG && isLt2M;
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateHomeAdvertise(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                updateHomeAdvertise(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


