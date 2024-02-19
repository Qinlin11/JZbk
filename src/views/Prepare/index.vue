<template>
  <div class="prepare">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="position: absolute; top: 15px; left: 155px">

      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }" style="font-weight: 600">教研系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject/detailsub' }" style="font-weight: 600">课堂</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/create' }" style="font-weight: 600">课程教研</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/join' }" style="font-weight: 600">协同备课</el-breadcrumb-item>
      <el-breadcrumb-item style="font-weight: 600">备课首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="prepare-div">
      <div class="save-design" @click="saveRea">
        <button class="button" style="color:#ffffff" v-if="showId1">保存教学设计</button>
      </div>
      <div class="prepare-top">
        <div class="prepare-top-left">
          <div class="left-img">
            <img src="../../assets/images/prepare/11.png" alt="" />
          </div>
          <div class="left-info">
            <div class="left-info-top">沁园春·长沙</div>
            <div class="left-info-mid">
              <div>初中</div>
              <div>七年级</div>
              <div>人教部</div>
              <div>下学期</div>
              <div>仅自己</div>
            </div>
            <div class="left-info-bottom">上次备课时间:2022-08-10</div>
          </div>
        </div>
        <!-- <div class="prepare-top-right" @click="$router.push('/join')">
          <div class="right-bg">
            <img src="../../assets/images/prepare/10.png" alt="" />
          </div>
          <div class="right-text" style="font-weight:600">切换课件</div>
        </div> -->
      </div>
      <div class="prepare-main">
        <div class="main-mid">
          <div class="main-mid-left">
            <div class="mid-left-div">
              <div v-for="(item, index) in navList" :key="index" @click="getIndex(index)" :style="{
                backgroundColor: index == currentIndex ? '#ff922e' : '',
                color: index == currentIndex ? '#ffffff' : '',
              }">
                <div class="iconfont" v-html="item.iconfont" style="font-size: 40px"></div>
                <div>{{ item.name }}</div>
              </div>
            </div>
          </div>
          <transition :duration="500" mode="out-in" enter-active-class="animate__animated animate__backInUp"
            leave-active-class="animate__animated animate__backOutDown">
            <keep-alive>
              <router-view :detailInfo="test1 ? test1[0] : ''" :nanoid="nanoid"></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { nanoid } from 'nanoid'
export default {
  props: ['uid', 'test','showId'],
  data() {
    return {
      showId1:this.showId==1?true:false,
      show: "",
      currentIndex: 0,
      navList: [
        {
          iconfont: "&#xe62a;",
          name: "教案",
        },
        {
          iconfont: "&#xe611;",
          name: "导学案 ",
        },
        {
          iconfont: "&#xeabf;",
          name: "课件",
        },
        {
          iconfont: "&#xe60f;",
          name: "教学反思",
        },
        {
          iconfont: "&#xe621;",
          name: "课堂实录",
        },
      ],
      nanoid: '',
      test1: this.test,
    };
  },
  created() {
    sessionStorage.setItem("uid", this.uid);
    this.$bus.$on('getInfo', (a) => {
      this.form = a;
    })
    this.$bus.$on('getInfo1', (a) => {
      this.form1 = a;
    })
    this.$bus.$on('getInfo2', (a) => {
      this.reflect = a;
    })
    this.nanoid = this.test ? this.test[0].nanoid : nanoid();
  },
  methods: {
    async saveRea() {
      try {
        const { Cid } = JSON.parse(sessionStorage.getItem('item'))
        const res = await this.$API({
          method: "post",
          url: "/api/Lesson/design",
          data: {
            cid: Cid,
            uid: sessionStorage.getItem('uid') * 1,
            nanoid: this.nanoid,
            analysis: this.form ? this.form[0].value : '',
            tool: this.form ? this.form[1].value : '',
            resource: this.form ? this.form[2].value : '',
            aim: this.form ? this.form[3].value : '',
            method: this.form ? this.form[4].value : '',
            difficult: this.form ? this.form[5].value : '',
            process: this.form ? this.form[6].value : '',
            saim: this.form1 ? this.form1[0].value : '',
            sdifficult: this.form1 ? this.form1[1].value : '',
            sresources: this.form1 ? this.form1[2].value : '',
            explore: this.form1 ? this.form1[3].value : '',
            link: this.form1 ? this.form1[4].value : '',
            introduce: this.form1 ? this.form1[5].value : '',
            sprocess: this.form1 ? this.form1[6].value : '',
            reflect: this.reflect,
          },
        });
        if (res.status == 200) this.$message.success('保存成功~')
        this.$router.push('/join')
      } catch (error) {
        this.$message.error(`保存失败了..,未填写基本信息`)
      }
    },
    getIndex(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/prepare/fir");
          break;
        case 1:
          this.$router.push("/prepare/sec");
          break;
        case 2:
          this.$router.push("/prepare/thr");
          break;
        case 3:
          this.$router.push("/prepare/fou");
          break;
        default:
          this.$router.push("/prepare/fiv");
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.prepare {
  width: 100%;
  height: 100%;
  background-color: #e1edf0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .el-breadcrumb ::v-deep .el-breadcrumb__inner {
    color: #008c4e !important;

    &:hover {
      color: #ff922e !important;
    }
  }

  .prepare-div {
    width: 80%;
    height: 90%;
    background-color: #ffffff;
    position: relative;

    .save-design {
      position: absolute;
      top: 25px;
      left: 80%;
      height: 57.59px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      transition: all 0.5s;

      .button {
        padding: 1em 2em;
        font-size: 17px;
        background: transparent;
        border: none;
        position: relative;
        color: yellow;
        z-index: 1;
      }

      .button::after,
      .button::before {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: -99999;
        transition: all 0.4s;
      }

      .button::before {
        transform: translate(0%, 0%);
        width: 100%;
        height: 100%;
        background: #0caa7f;
        border-radius: 50px;
      }

      .button::after {
        transform: translate(0px, 0px);
        width: 10px;
        height: 10px;
        background: darkslategray;
        backdrop-filter: blur(5px);
        border-radius: 50px;
      }

      .button:hover::before {
        transform: translate(5%, 20%);
        width: 10px;
        height: 10px;
      }

      .button:hover::after {
        border-radius: 50px;
        transform: translate(0, 0);
        width: 100%;
        height: 100%;
      }

      .button:active::after {
        transition: 0s;
        transform: translate(0, 5%);
      }
    }

    .prepare-top {
      box-sizing: border-box;
      padding: 10px 30px;
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .prepare-top-left {
        display: flex;
        height: 100%;
        justify-content: space-around;
        width: 36%;

        .left-img {
          height: 100%;

          img {
            height: 100%;
          }
        }

        .left-info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .left-info-top {
            font-weight: 600;
            font-size: 18px;
          }

          .left-info-mid {
            display: flex;

            >div {
              border-right: 1px solid #6c6c6c;
              padding-right: 6px;
              margin-left: 6px;
            }

            >div:last-child {
              border-right: none;
              padding-right: 0;
            }

            >div:first-child {
              margin-left: 0;
            }
          }
        }
      }

      .prepare-top-right {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 8%;
        margin-right: 40px;

        .right-bg {
          cursor: pointer;
          width: 80%;
          display: flex;
          justify-content: center;
          background-color: #ff922e;
          border-radius: 10px;
          padding: 5px 0;

          img {
            width: 70%;
          }
        }
      }
    }

    .prepare-main {
      width: 100%;
      height: 80%;

      .main-mid {
        height: 100%;
        width: 100%;
        display: flex;

        >div {
          box-sizing: border-box;
        }

        .main-mid-left {
          flex: 1;
          height: 100%;
          border-right: 1px solid #d1d1d1;
          display: flex;
          justify-content: center;
          align-items: center;

          .mid-left-div {
            width: 90%;
            height: 90%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            >div {
              cursor: pointer;
              width: 70%;
              flex: 1;
              border-radius: 5px;
              display: flex;
              flex-direction: column;
              align-items: center;
              transition: all 0.5s;
              box-sizing: border-box;
              justify-content: space-evenly;
              font-size: 18px;
              font-weight: 600;
              color: #979797;
            }
          }
        }
      }
    }
  }
}
</style>