<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      drag
      :action="time.action"
      multiple
      ref="upload"
      :on-error="dayin"
      :data="id"
      :name="time.name"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传不超过500kb大小的文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Ready",
  props: ['time'],
  data() {
    return {
      id:{
        uid:JSON.parse(sessionStorage.getItem('uid')),
        cid:JSON.parse(sessionStorage.getItem('item')).Cid
      }
    }
  },
  created() {
    this.$on('forUpload',()=>{
      this.submit()
    })
  },
  methods: {
    dayin(error,file,filelist){
      console.log(error);
    },
  },
};
</script>

<style lang="less" scoped>
.upload {
  height: 91%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>