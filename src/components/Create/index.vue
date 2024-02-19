<template>
  <el-container class="create">
    <div style="width: 100%; position: fixed; top: 0; z-index: 99">
      <Header></Header>
    </div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="position: absolute; top: 95px; left: 85px; z-index: 50"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }" style="font-weight: 600"
        >教研系统</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: toPath[0] }" style="font-weight: 600">{{
        toPath[1]
      }}</el-breadcrumb-item>
      <el-breadcrumb-item style="font-weight: 600">{{
        toPath[2]
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="create-top">
      <!-- <img src="../../assets/images/create/metting.png" alt="" /> -->
      <div class="create-info">
        <div style="font-weight: 600; font-size: 24px">{{ name }}</div>
        <div style="font-weight: 600; margin-top: 20px">
          {{detail}}
        </div>
      </div>
      <div
        class="cebianlan-div"
        v-if="itemCopy.grade && disabled"
      >
        <div class="cebianlan">
          <transition
            enter-active-class="animate__animated animate__backInRight"
            leave-active-class="animate__animated animate__backOutRight"
            mode="out-in"
            :duration="500"
          >
            <img src="../../assets/images/create/path.png" alt="" />
          </transition>

          <div>
            <router-link to="/online">在线研讨</router-link>
          </div>
          <div>
            <router-link to="/plan">教学设计</router-link>
          </div>
          <div>
            <router-link to="/join">协同备课</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="create-main">
      <div class="create-main-div">
        <div class="create-main-left">
          <div class="create-main-left-div">
            <div class="top">
              <div>
                <img src="../../assets/images/create/work.png" alt="" />
              </div>
              <div
                v-for="(item, index) in title"
                :key="index"
                @click="getIndex(index)"
                :class="{ active: index === currentIndex }"
                class="iconfont"
                style="font-size: 18px; height: 30px"
              >
                {{ item.icon }}&nbsp;&nbsp;&nbsp;{{ item.name }}
              </div>
            </div>
            <div class="bottom">
              <img src="../../assets/images/create/anpai.png" alt="" />
            </div>
          </div>
        </div>
        <transition
          :duration="500"
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut"
          mode="out-in"
        >
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </el-container>
</template>
  
  <script>
export default {
  name: "Create",
  props: ["url","toPath"],
  data() {
    return {
      title: [
        { icon: "\ue64d", name: "成员" },
        { icon: "\ue724", name: "课程活动" },
        { icon: "\ue9b1", name: "研讨区" },
      ],
      isShow: false,
      currentIndex: 0,
      itemCopy: '',
      disabled:false,
    };
  },
  created() {
    const item = JSON.parse(sessionStorage.getItem('item'))
    this.itemCopy=item;
    this.$bus.$on('changeData',this.changeMydata)
  },
  computed: {
    name() {
      return this.itemCopy.name
        ? this.itemCopy.name
        : this.itemCopy.subject +
            this.itemCopy.edition +
            this.itemCopy.grade +
            this.itemCopy.semester;
    },
    detail(){
      return this.itemCopy.introduce ? this.itemCopy.introduce:this.itemCopy.school+ '|' + this.itemCopy.grade+ '|' + this.itemCopy.edition+ '|' + this.itemCopy.semester
    }
  },
  methods: {
    changeMydata(val){
      this.disabled = !val;
    },
    getIndex(index) {
      this.currentIndex = index;
      if (index == 0) {
        this.$router.push(this.url[0]);
      } else if (index == 1) {
        this.$router.push(this.url[1]);
      } else {
        this.$router.push(this.url[2]);
      }
    },
  },
};
</script>
  
  <style lang="less" scoped>
.create {
  flex-direction: column;
  background-color: #e1edf0;
  /deep/ .el-header {
    margin-bottom: 0;
  }
  .el-breadcrumb ::v-deep .el-breadcrumb__inner {
    color: #008c4e !important;
    &:hover {
      color: #ff922e !important;
    }
  }
  .create-top {
    width: 100%;
    height: 218px;
    overflow: hidden;
    display: flex;
    align-items: center;
    .cebianlan-div {
      position: fixed;
      right: 40px;
      top: 243px;
      .cebianlan {
        position: fixed;
        right: 40px;
        top: 243px;
        background-color: #fdc95c;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
        box-shadow: 0 0 5px #474a4a;
        transition: all 0.5s;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        > img {
          width: 25px;
          height: 25px;
        }
        >div{
          display: none;
        }
        &:hover {
          border-radius: 30px;
          height: 210px;
          width: 75px;
          >div{
            display: block;
          }
          a:hover{
            color: #ff9837;
          }
        }
      }
    }
    .create-info {
      z-index: 50;
      width: 50%;
      margin-left: 80px;
      position: absolute;
      top: 120px;
    }
    > img {
      position: absolute;
      top: 0;
      right: 0;
      width: 1200px;
      height: 400px;
    }
  }
  .create-main {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 800px;
    padding-bottom: 30px;
    .create-main-div {
      width: 85%;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      .create-main-left {
        width: 20%;
        height: 100%;
        background-color: #fffdfd;
        border-radius: 40px;
        margin-right: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        .create-main-left-div {
          width: 100%;
          height: 80%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .top {
            width: 100%;
            div {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-left: 50px;
              transition: all 0.7s;
            }
            font-weight: 600;
            font-size: 24px;
            img {
              width: 40px;
              height: 40px;
            }
            .active {
              color: #008c4e;
              background-color: #e1edf0;
              border-right: 3px solid #008c4e;
            }
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .bottom {
            width: 100%;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>