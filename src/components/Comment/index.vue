<template>
  <div class="main-mid-right-change">
    <div class="toggle">
      <div class="toggle-div">
        <div v-for="(item, index) in toggleList" :key="index" @click="toggle(index)"
          :class="{ toggleActive: toggleIndex == index }">
          {{ item }}
        </div>
      </div>
    </div>
    <transition :duration="1000" mode="out-in" enter-active-class="animate__animated animate__rotateIn"
      leave-active-class="animate__animated animate__rotateOut">
      <div class="toggle-main" v-show="show">
        <div class="toggle-main-list">
          <div v-for="item in commentList" :key="item.datatime">
            <div class="name">{{ item.name }}</div>
            <div class="mid">{{ item.text }}</div>
            <div style="color: #4c4a4a">{{ item.datatime }}</div>
          </div>
        </div>
        <div class="toggle-main-comment">
          <el-input v-model="comment" placeholder="发表评论" size="normal" clearable @change="" type="textarea"></el-input>
          <el-button type="primary" size="mini" @click="publish"
            style="margin-top: 5px; box-sizing: border-box">发表评论</el-button>
        </div>
      </div>
    </transition>
    <div class="record" v-show="!show">
      <div class="record-div" style="height:85%;overflow: auto;width: 100%;">
        <div class="record-list" v-for="item in pdfList" :key="item.datetime">
          <div class="record-name">{{ item.name }}</div>
          <div class="record-info" style="display: flex">
            <img src="../../assets/images/plan/planedit/5.png" alt="" />
            <a :href="item.path" style="color: #4c4a4a;text-decoration: underline;">{{ item.fname }}</a>
          </div>
          <div style="color: #4c4a4a; height: 30%">{{ item.datetime }}</div>
        </div>
      </div>
      <el-upload style="height:15%;display:flex;justify-content:center;align-items: center;flex-direction: column;"
        action="/api/Lesson/echo" ref="upload" name="path" :data="upload" :on-success="onSuccess" :show-file-list="false">
        <div style="display:flex;justify-content: center;">
          <el-button slot="trigger" size="small"
            type="primary">上传文件</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="onsubmit">
            上传到服务器</el-button> -->
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ['nanoid'],
  data() {
    return {
      upload: {
        nanoid: this.nanoid
      },
      toggleList: ["探讨", "回传记录"],
      comment: "",
      toggleIndex: 0,
      show: true,
      commentList: [
      ],
      pdfList: [],
    };
  },
  created() {
    this.getComment();
    this.getPdf();
  },
  methods: {
    onSuccess() {
      this.$message.success('上传成功')
      this.getPdf();
    },
    async getPdf() {
      try {
        const res = await this.$API({
          method: 'post',
          url: '/api/Lesson/showEcho',
          data: {
            nanoid: this.nanoid
          }
        })
        this.pdfList = res.data;
      } catch (error) {
        this.$message.error(`获取文件失败..,${error.message}`)
      }
    },
    async getComment() {
      try {
        const res = await this.$API({
          method: 'post',
          url: '/api/Lesson/show',
          data: {
            nanoid: this.nanoid
          }
        })
        this.commentList = res.data;
      } catch (error) {
        this.$message.error(`获取评论失败,${error.message}`)
      }
    },
    toggle(index) {
      this.toggleIndex = index;
      this.show = !this.show;
    },
    async publish() {
      try {
        const res = await this.$API({
          method: 'post',
          url: '/api/Lesson/discuss',
          data: {
            nanoid: this.nanoid,
            text: this.comment,
          }
        })      
        this.comment = '';
        this.getComment()
      } catch (error) {
        this.$message.error(`发布评论失败,${error.message}`)
      }

    }
  },
};
</script>

<style lang="less" scoped>
.main-mid-right-change {
  height: 100%;
  flex: 1;
  border-left: 1px solid #c3c3c3;
  box-sizing: border-box;
  font-size: 12px;

  .toggle {
    height: 9%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #edecec;
    box-sizing: border-box;

    .toggle-div {
      width: 90%;
      height: 90%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      >div {
        width: 35%;
        height: 60%;
        border-radius: 5px;
        border: 1px solid #c3c3c3;
        color: #c3c3c3;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s;
      }

      .toggleActive {
        background-color: #f99746;
        color: #ffffff;
      }
    }
  }

  .toggle-main {
    height: 91%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .toggle-main-list {
      flex: 5;
      width: 100%;
      overflow: auto;

      >div {
        height: 20%;
        width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
        border-bottom: 1px solid #e1dfdf;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .name {
          font-weight: 600;
        }

        .mid {
          border-radius: 10px;
          border: 1px solid #c3c3c3;
          text-indent: 0.5em;
          color: #4c4a4a;
          word-break: break-all;
          text-overflow: ellipsis;
        }
      }
    }

    .toggle-main-comment {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      padding: 5px 10px;
    }
  }

  .record {
    height: 91%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .record-list {
      height: 20%;
      width: 100%;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #f7f7f7;
      font-size: 10px;
      box-sizing: border-box;
      padding: 5px;
      justify-content: space-between;

      .record-name {
        font-weight: 600;
        height: 30%;
      }

      .record-info {
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #4c4a4a;

        img {
          width: 25px;
        }
      }
    }
  }
}
</style>