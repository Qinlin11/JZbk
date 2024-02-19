<template>
  <div class="create-main-right">
    <el-dialog title="创建研讨区" :visible.sync="dialogVisible" width="35%" center>
      <el-form :model="form" label-width="80px" size="normal">
        <!-- <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            type="textarea"
            v-model="form.intro"
            placeholder=""
            size="normal"
            clearable
            @change=""
          ></el-input>
        </el-form-item> -->
        <el-form-item label="上传课件" size="normal">
          <el-upload class="upload-demo" ref="upload" :auto-upload="false" drag :on-error="uploadErr" :on-success="uploadSucc"
            :action="$route.path == '/create/discuss' ? '/api/Cgroup/createResearch' : '/api/Rgroup/createResearch'"
            name="path" :data="$route.path == '/create/discuss' ? publish : publish1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em style="color: #00a159">点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">文件类型请尽量为PDF</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" @click="upload">确 定</el-button>
      </span>
    </el-dialog>
    <div class="create-main-right-first">
      <div class="create-main-right-first-top">
        <div class="area">研讨区</div>
        <div style="margin-bottom: 20px">
          <myButton @click.native="dialogVisible = true">创建研讨区</myButton>
        </div>
      </div>
      <div class="create-main-right-first-bottom">
        <div class="list" v-for="item in pdfSplice" :key="item.datetime">
          <div class="boy">
            <img v-image-preview :src="item.pic" alt="" />
            {{ item.name }}
          </div>
          <div class="file">
            <div class="file-son" style="width:75%">
              <div class="discuss-main-top-third-div">
                <div style="margin-right:30px">
                  <img src="../../../assets/images/discuss/pdf.png" />
                </div>
                <div><a style="color:black" :href="item.path" target="_blank" rel="noopener noreferrer">{{ item.fname
                }}</a></div>
              </div>
            </div>
            <div class="join" @click="joinDiscuss(item)">参与研讨
            </div>
          </div>
          <div class="time">{{ item.datetime }}</div>
        </div>
      </div>
      <div class="block">
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="currentPage"
          :page-size="pageSize" background layout="total,prev, pager, next" :total="pdfList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        intro: "",
      },
      pdfList: '',
      currentPage: 1,
      pageSize: 3,
      publish: {
        nanoid: nanoid(),
        Cid: JSON.parse(sessionStorage.getItem('item')).Cid,
      },
      publish1: {
        nanoid: JSON.parse(sessionStorage.getItem('item')).nanoid,
        nanoid1: nanoid()
      }
    };
  },
  created() {
    this.getPdf();
  },
  methods: {
    upload(){
      this.$refs.upload.submit();
    },
    uploadErr(err,file,filelist){
      this.$message.error(`文件上传失败了..${err}`)
    },
    uploadSucc(){
      this.getPdf();
      this.dialogVisible=false;
      this.$message.success('文件上传成功');
    },
    joinDiscuss(item) {
      let nanoid = this.$route.path == '/create/discuss' ? item.nanoid : item.nanoid1;
      this.$router.push({
        path: '/discuss',
        query: {
          nanoid
        }
      })
    },
    async getPdf() {
      try {
        let url = this.$route.path == '/create/discuss' ? '/api/Cgroup/showResearch' : '/api/Rgroup/showResearch'
        const res = await this.$API({
          method: 'post',
          url: url,
          data: {
            Cid: JSON.parse(sessionStorage.getItem('item')).Cid,
            nanoid: JSON.parse(sessionStorage.getItem('item')).nanoid
          }
        })
        this.pdfList = res.data;
      } catch (error) {
        this.$message.error(`获取研讨区数据失败...${error.message}`);
      }
    },
    currentChange(val) {
      this.currentPage = val;
    },
    sizeChange(val) {
      this.pageSize = val;
    },
  },
  computed: {
    pdfSplice() {
      return this.pdfList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
};
</script>

<style lang="less" scoped>
.create-main-right {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;

  .create-main-right-first {
    width: 100%;
    height: 100%;

    .block{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .create-main-right-first-bottom {
      height: calc(100% - 280px);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #0caa7f; //修改后的背景图颜色
        color: #fff;
      }

      .list {
        width: 100%;
        background-color: #fbfdfb;
        height: 150px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        padding: 15px 10px 10px 60px;
        justify-content: space-between;
        box-sizing: border-box;
        margin-bottom: 20px;

        .boy {
          position: relative;

          img {
            position: absolute;
            width: 32px;
            height: 32px;
            top: -5px;
            left: -35px;
            border-radius: 50%;
          }
        }

        .file {
          display: flex;
          align-items: center;
          justify-content: space-around;

          .file-son {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f2f2f2;

            .discuss-main-top-third-div {
              height: 95%;
              width: 80%;
              display: flex;
              align-items: center;
              text-decoration: underline;
            }
          }

          .join {
            cursor: pointer;
            color: #fbfdfb;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 17%;
            height: 36px;
            border-radius: 5px;
            background-color: #0caa7f;
          }
        }

        .time {
          color: #cccccc;
          font-size: 10px;
        }
      }
    }

    .create-main-right-first-top {
      font-weight: 600;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 30px;
      width: 100%;

      .area {
        font-size: 25px;
        width: 176px;
        height: 84px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .create-main-right-second {
    width: 15%;
    height: 300px;
    border-radius: 5px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 30px 20px 40px 20px;

    .biaoyu {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      margin-left: -10px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>