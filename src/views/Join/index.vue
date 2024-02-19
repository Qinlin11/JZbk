<template>
    <Design url="/api/Lesson/index">
        <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="position: absolute; top: 95px; left: 85px;z-index: 50;"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }" style="font-weight: 600">教研系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/subject/detailsub'}" style="font-weight: 600">课堂</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/create'}" style="font-weight: 600">课程教研</el-breadcrumb-item>
      <el-breadcrumb-item style="font-weight: 600">协同备课</el-breadcrumb-item>
    </el-breadcrumb>
        <template v-slot:edit="{item}">
            <div class="join"><router-link :to="{path:'/prepare',query:{uid:item.uid,id:1}}">加入协同</router-link></div>
        </template>
        <template slot="design"> 
      <Edit name="已完成的备课" :url="url" del="/api/Lesson/del" continue="/api/Lesson/cont" path="/prepare"></Edit>
    </template>
    </Design>
</template>

<script>
import Edit from '../Plan/PlanEdit'
    export default {
      data() {
        return {
          url:'/api/Lesson/look'
        }
      },
        components:{
          Edit
        }
    }
</script>
<style lang="less" scoped>
.join{
    cursor: pointer;
    align-self: flex-end;
    width: 80px;
    height: 30px;
    background-color: #1e98d7;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-weight: 400;
}
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
    color: #008c4e !important;
    &:hover{
      color: #ff922e !important;
    }
  }
</style>