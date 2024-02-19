<template>
  <el-container class="discuss">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="position: absolute; top: 24px; left: 115px">

      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }" style="font-weight: 600">教研系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject/detailsub' }" style="font-weight: 600">课堂</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/create' }" style="font-weight: 600">课程教研</el-breadcrumb-item>
      <el-breadcrumb-item style="font-weight: 600">研讨区</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="discuss-main">
      <div class="discuss-main-top">
        <div class="discuss-main-top-div">
          <div class="discuss-main-top-div-left">
            <div class="myphoto"><img v-image-preview :src="pdfInfo.pic" alt="" srcset=""></div>
            <div class="myinfo">
              <div class="myname">
                <div style="font-weight:600;font-size:20px">{{ pdfInfo.name }}</div>
                <img src="../../assets/images/discuss/yes.png" alt="" srcset="">
              </div>
              <div class="myidentity">
                <img src="../../assets/images/discuss/user.png" alt="" srcset="">
                <div>创建者</div>
              </div>
            </div>
          </div>
          <div class="discuss-main-top-div-right">
            <div class="discuss-main-top-div-right-div">
              <img src="../../assets/images/discuss/pdf.png" alt="" srcset="">
              <div><a style="color:black" :href="pdfInfo.path">{{ pdfInfo.fname }}</a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="discuss-main-bottom">
        <div class="discuss-main-bottom-left">
          <div class="discuss-main-bottom-left-top">
            <div>课件浏览</div>
          </div>
          <div class="discuss-main-bottom-left-bottom">
            <div v-if="!pdfInfo.path"><img src="../../assets/images/discuss/no.png" alt="" />
              <div>暂无记录</div>
            </div>
            
<iframe v-if="pdfInfo.path" ref="mainiframe" :src="pdfInfo.path" style="height:100%;width:100%" ></iframe>
          </div>
        </div>
        <div class="discuss-main-bottom-right">
          <div class="people">
            <img src="../../assets/images/discuss/people.png" alt="">
            <div>
              <div class="btn">添加备注</div>
              <div class="btn">回传课件</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  props: ['nanoid'],
  data() {
    return {
      pdfInfo: ''
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      try {
        let url = JSON.parse(sessionStorage.getItem('item')).Cid ? '/api/Cgroup/joinResearch' : '/api/Rgroup/joinResearch';
        let nanoid = JSON.parse(sessionStorage.getItem('item')).Cid ? this.nanoid : JSON.parse(sessionStorage.getItem('item')).nanoid;
        const res = await this.$API({
          method: 'post',
          url: url,
          data: {
            nanoid,
            Cid: JSON.parse(sessionStorage.getItem('item')).Cid,
            nanoid1: this.nanoid
          }
        })
        this.pdfInfo = res.data;
      } catch (error) {
        this.$message.error(`获取基本信息失败...${error.message}`)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.discuss {
  height: 100%;
  flex-direction: column;
  background-color: #f2f2f2;

  .el-breadcrumb ::v-deep .el-breadcrumb__inner {
    color: #008c4e !important;

    &:hover {
      color: #ff922e !important;
    }
  }

  /deep/ .el-header {
    margin-bottom: 0;
  }

  .discuss-main {
    width: 100%;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;

    .discuss-main-top {
      width: 85%;
      height: 200px;
      background-color: #ffffff;
      display: flex;
      border-radius: 20px;
      margin: 58px 0 40px 0;
      align-items: center;
      justify-content: center;

      .discuss-main-top-div {
        width: 80%;
        height: 65%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .discuss-main-top-div-left {
          display: flex;

          .myphoto {
            img {
              width: 120px;
              border-radius: 50%;
            }
          }

          .myinfo {
            width: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .myname {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-left: 20px;

              img {
                width: 20px;
              }
            }

            .myidentity {
              margin-top: 15px;
              display: flex;
              justify-content: center;
              align-items: center;

              img {
                width: 20px;
              }
            }
          }
        }

        .discuss-main-top-div-right {
          border-radius: 5px;
          height: 80%;
          width: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f2f2f2;

          .discuss-main-top-div-right-div {
            height: 80%;
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            text-decoration: underline;

            img {
              width: 60px;
            }
          }
        }
      }
    }

    .discuss-main-bottom {
      width: 85%;
      box-sizing: border-box;
      display: flex;

      .discuss-main-bottom-left {
        width: 66%;
        height: 800px;
        background-color: #ffffff;
        border-radius: 20px;

        .discuss-main-bottom-left-top {
          width: 100%;
          height: 50px;
          border-bottom: 2px solid #bee2b3;
          display: flex;
          align-items: center;
          justify-content: center;

          div {
            width: 95%;
            font-weight: 600;
            border-left: 4px solid #4a9a35;
            text-indent: 1em;
          }
        }

        .discuss-main-bottom-left-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 750px;
          width: 100%;

          >div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            color: #c3c3c3;
          }

          img {
            width: 500px;
            height: 500px;
          }
        }
      }

      .discuss-main-bottom-right {
        width: 34%;
        height: 350px;
        border-radius: 20px;
        background-color: #ffffff;
        margin-left: 30px;

        .people {
          width: 100%;
          height: 80%;
          background-color: #d3eeff;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          >div {
            width: 35%;
            height: 55%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          }

          img {
            position: absolute;
            top: -24px;
            right: -36px;
            width: 243px;
            height: 304px;
          }

          .btn {
            background-color: #1e98d7;
            color: #ffffff;
            width: 135px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            z-index: 50;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>