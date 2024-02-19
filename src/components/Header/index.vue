<template>
    <el-header>
      <img src="../../assets/images/header/u1.png" alt="" srcset="">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#008c4e" text-color="#fff"
        active-text-color="#ffd04b" router>
        <el-menu-item index="1" disabled>个人空间</el-menu-item>
        <el-menu-item index="2" disabled>资源中心</el-menu-item>
        <el-menu-item index="3" disabled>教学大数据</el-menu-item>
        <el-menu-item index="4" disabled>家校互动</el-menu-item>
        <el-menu-item index="5" disabled>系统题库</el-menu-item>
        <el-menu-item index="/subject">教研系统</el-menu-item>
      </el-menu>
      <div class="right">
        <div class="iconfont lingdang">&#xe600;</div>
        <div class="touxiang" @click="$router.push('/home')">
          <img src="../../assets/images/header/touxiang.png" alt="">
        </div>
      </div>
    </el-header>
</template>

<script>
    export default {
        name:'Header'
    }
</script>

<style lang="less" scoped>
.el-header {
  position: relative;
  height: 80px !important;
  margin-bottom: 30px;
  width: 100%;
  >img {
    position: absolute;
    z-index: 99;
    left: 160px;
    margin: auto 0;
    width: 130px;
    height: 33px;
    top: 21px;
  }
.right{
      position: absolute;
      top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 160px;
  .lingdang{
      color: #fff;
      font-size: 23px !important;

  }
  img{
    cursor: pointer;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }
}
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 3px #008c4e;
    box-sizing: border-box;

    li {
      margin-left: 30px;
      height: 100%;
      line-height: 80px;
    }
  }
}

</style>