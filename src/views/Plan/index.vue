<template>
  <Design url="/api/Design/index">
    <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="position: absolute; top: 90px; left: 75px"
      >

      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }" style="font-weight: 600">教研系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/subject/detailsub'}" style="font-weight: 600">课堂</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/create'}" style="font-weight: 600">课程教研</el-breadcrumb-item>
      <el-breadcrumb-item style="font-weight: 600">教学设计</el-breadcrumb-item>
      </el-breadcrumb>
    <template slot="design"> 
      <Edit name="我的教学设计" :url="url" del="/api/Design/del" continue="/api/Design/cont" path="/person"></Edit>
    </template>
  </Design>
</template>
<script>
import Edit from "./PlanEdit";
export default {
  components: {
    Edit,
  },
  data() {
    return {
      url:'/api/Design/look'
    }
  },
  created() {},
  methods: {
  },
};
</script>

<style lang="less" scoped>
  .el-breadcrumb ::v-deep .el-breadcrumb__inner {
    color: #008c4e !important;
    &:hover{
      color: #ff922e !important;
    }
  }
</style>