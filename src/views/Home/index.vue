<template>
<el-container class="vertical">
    <slot></slot>
    <div style="width:80%;margin: 0 auto;font-weight: 600;">欢迎回来!</div>
    <el-container class="home-center">   
    <el-aside width="200px" class="home-aside">
        <el-card class="home-aside-info">
            <div>
                <img src="../../assets/images/header/touxiang.png" alt="">
            </div>
            <div class="line"></div>
            <div class="home-aside-info-edit">
                编辑个人资料
            </div>
        </el-card>
        <el-card class="home-aside-class">
            <div style="font-weight:600">我的班级</div>
        </el-card>
    </el-aside>
    <el-main>
        <el-card class="main-subject">我的课程</el-card>
        <el-card class="main-todolist">待办事件</el-card>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.vertical{
    flex-direction: column;
    height: 100%;
    background-color: #f2f2f2;
}
.home-center{
    margin: 0 auto;
    width: 80%;
}
.home-aside{
    padding: 20px 0 0 0;
    .home-aside-info{
        display: flex;
        justify-content: center;
        >div:first-child{
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }

        }
        .line{
            margin-top: 40px;
            height: 1px;
            width: 100%;
            background-color: #c4c4c4;
            margin-bottom: 10px;
        }
        .home-aside-info-edit{
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .home-aside-class{
        margin-top: 30px;
        height: 300px;
    }
}
.main-subject{
    font-weight: 600;
    overflow: auto;
    height: 220px;
    margin-bottom: 20px;
}
.main-todolist{
    font-weight: 600;
    overflow: auto;
    height: 300px;
}
</style>