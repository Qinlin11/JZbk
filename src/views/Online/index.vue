<template>
  <div class="online">
    <el-dialog
      title="发起研讨"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <div>
        <el-form
          :model="form"
          ref="form"
          label-width="80px"
          :inline="false"
          size="normal"
        >
          <el-form-item label="主题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="主持人" size="normal">
            <el-input v-model="form.teacher" size="normal" clearable>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="justify-content:center">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="createMeet">确 定</el-button>
      </span>
    </el-dialog>
    <slot></slot>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="position: absolute; top: 115px; left: 85px; z-index: 50"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }" style="font-weight: 600"
        >教研系统</el-breadcrumb-item
      >
      <el-breadcrumb-item
        :to="{ path: '/subject/detailsub' }"
        style="font-weight: 600"
        >课堂</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/create' }" style="font-weight: 600"
        >课程教研</el-breadcrumb-item
      >
      <el-breadcrumb-item style="font-weight: 600">在线研讨</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="main-left">
        <div class="main-left-div">
          <div class="main-left-top">
            <div>
              <img src="../../assets/images/online/discuss.png" alt="" />
              <div>在线研讨</div>
            </div>
            <div><button @click="dialogVisible = true">发起研讨</button></div>
          </div>
          <div class="main-left-bottom">
            <div
              class="main-list"
              v-for="(meet, index) in meetingSlice"
              :key="index"
            >
              <div class="main-list-div">
                <div class="main-list-left">
                  <div style="font-weight: 600">{{ meet.name }}</div>
                  <div class="main-list-left-detail">
                    <div>主持人:{{ meet.teacher }}</div>
                    <div style="position: relative">
                      会议链接:
                      <a :href="meet.network" target="_blank">{{
                        meet.network
                      }}</a
                      ><img src="../../assets/images/online/copy.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="main-list-right">
                  <a :href="meet.network" target="_blank">加入会议</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="meeting.length"
          background
        >
          >
        </el-pagination>
      </div>
      <div class="main-right">
        <div class="main-right-div">
          <div class="main-right-top">
            <div class="main-right-div-hisry">
              历史会议<img
                src="../../assets/images/online/history.png"
                alt=""
              />
            </div>
            <div class="mange">管理</div>
          </div>
          <div class="main-right-main">
            <div class="right-main-list">
              <div class="right-main-list-div">
                <div class="right-main-list-div-left">
                  <div class="title">中秋主题班会</div>
                  <div class="time">会议时间:2022-8-10</div>
                </div>
                <div class="right-main-list-div-right">观看回放</div>
              </div>
            </div>
            <div class="right-main-list">
              <div class="right-main-list-div">
                <div class="right-main-list-div-left">
                  <div class="title">中秋主题班会</div>
                  <div class="time">会议时间:2022-8-10</div>
                </div>
                <div class="right-main-list-div-right">观看回放</div>
              </div>
            </div>
            <div class="right-main-list">
              <div class="right-main-list-div">
                <div class="right-main-list-div-left">
                  <div class="title">中秋主题班会</div>
                  <div class="time">会议时间:2022-8-10</div>
                </div>
                <div class="right-main-list-div-right">观看回放</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        teacher: "",
      },
      pageSize: 3,
      currentPage: 1,
      meeting: [],
    };
  },
  created() {
    this.Meeting();
  },
  computed: {
    meetingSlice() {
      return this.meeting.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    async createMeet() {
      try {
        const item = JSON.parse(sessionStorage.getItem("item"));
        this.dialogVisible = false;
        const res = await this.$API({
          method:'post',
          url:'/api/Broadcast/start',
          data:{
            ...this.form,
            cid:item.Cid
          }
        })
        this.Meeting();
        this.$message.success('发起研讨成功');
      } catch (error) {
        this.$message.error(`发起研讨失败,${error.message}`)
      }
    },
    sizeChange(val) {
      this.pageSize = val;
    },
    currentChange(val) {
      this.currentPage = val;
    },
    async Meeting() {
      try {
        const item = JSON.parse(sessionStorage.getItem("item"));
        const res = await this.$API({
          method: "post",
          url: "/api/Broadcast/enter",
          data: {
            cid: item.Cid,
          },
        });

        this.meeting = res.data;
      } catch (error) {
        this.$message.error(`初始化失败,${error.message}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.dialog-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  justify-content: space-between;
  .dialog-name {
    display: flex;
    width: 70%;
    justify-content: space-evenly;
    margin-bottom: 20px;
    > div:first-child {
      width: 28%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-input {
      width: 72%;
    }
  }
  .dialog-intro {
    display: flex;
    outline: none;
    width: 70%;
    margin-bottom: 20px;
    > div:first-child {
      width: 28%;
      display: flex;
      justify-content: center;
      // align-items: center;
    }
    textarea {
      width: 70%;
      font-size: 16px;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      &:hover {
        outline: 0;
      }
    }
  }
  .dialog-upload {
    display: flex;
    width: 70%;
    > div:first-child {
      width: 28%;
      display: flex;
      justify-content: center;
    }
  }
}
.online {
  background-color: #f0f0f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-breadcrumb ::v-deep .el-breadcrumb__inner {
    color: #008c4e !important;
    &:hover {
      color: #ff922e !important;
    }
  }
  .main {
    flex: 1;
    width: 90%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-top: 35px;
    .main-left {
      width: 67%;
      background-color: #ffffff;
      border-radius: 10px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      height: 100%;
      .main-left-div {
        width: 80%;
        height: 80%;
        .main-left-top {
          display: flex;
          justify-content: space-between;
          > div:first-child {
            display: flex;
            align-items: flex-end;
            font-weight: 600;
            font-size: 20px;
            position: relative;
            img {
              width: 40px;
              height: 40px;
            }
          }
          button {
            padding: 17px 40px;
            border-radius: 10px;
            border: 0;
            background-color: #f6c314;
            box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            font-size: 15px;
            transition: all 0.5s ease;
            color: #fff;
            cursor: pointer;
          }

          button:hover {
            color: hsl(0, 0%, 100%);
          }

          button:active {
            transform: translateY(10px);
            transition: 100ms;
          }
          > div:first-child::after {
            content: "";
            position: absolute;
            bottom: -3px;
            width: 113%;
            height: 3px;
            background-color: #008c4e;
          }
        }
        .main-left-bottom {
          margin-top: 20px;
          height: calc(100% - 54px);
          display: flex;
          flex-direction: column;
          > div {
            height: 30%;
            background-color: #f2f2f2;
            margin-bottom: 20px;
          }
          .main-list {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            .main-list-div {
              width: 95%;
              height: 70%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .main-list-left {
                width: 80%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                .main-list-left-detail {
                  display: flex;
                  justify-content: space-between;
                  font-size: 8px;
                  color: #8f8a8a;
                  align-items: center;
                  a {
                    color: #84b8f8;
                  }
                  img {
                    cursor: pointer;
                    position: absolute;
                  }
                }
              }
              .main-list-right {
                cursor: pointer;
                width: 15%;
                height: 50%;
                background-color: #00a159;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #f2f2f2;
                border-radius: 5px;
              }
            }
          }
        }
      }
    }
    .main-right {
      width: 30%;
      background-color: #ffffff;
      border-radius: 10px;
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      .main-right-div {
        width: 80%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .main-right-top {
          width: 100%;
          position: relative;
          height: 5%;
          display: flex;
          justify-content: center;
          .main-right-div-hisry {
            font-weight: 600;
            display: flex;
            align-items: center;
            position: relative;
            font-size: 20px;
            width: 100%;
            justify-content: center;
            img {
              cursor: pointer;
              position: absolute;
              right: 96px;
            }
          }
          .mange {
            cursor: pointer;
            position: absolute;
            color: #008c4e;
            right: 32px;
            bottom: -9px;
            font-size: 13px;
          }
        }
        .main-right-main {
          height: 90%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .right-main-list {
            width: 100%;
            height: 30%;
            background-color: #f2f2f2;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            .right-main-list-div {
              width: 90%;
              height: 60%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .right-main-list-div-left {
                height: 100%;
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title {
                  font-weight: 600;
                  font-size: 16px;
                }
                .time {
                  font-size: 10px;
                  color: #8f8a8a;
                }
              }
              .right-main-list-div-right {
                cursor: pointer;
                flex: 1;
                height: 60%;
                background-color: #00a159;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>