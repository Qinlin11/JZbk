<template>
  <el-card class="teach">
    <div>
      {{name}}<img
        src="../../../assets/images/plan/planedit/2.png"
        alt=""
      />
    </div>
    <div>
      <div :class="{ active: finished }" @click="finish(1)">已完成</div>
      <div :class="{ active: share }" @click="finish(2)">共享的</div>
      <div :class="{ active: save }" @click="finish(3)">收藏的</div>
    </div>
    <div>
      <div v-for="(item, index) in pdfSplice" :key="index">
        <div class="one">
          <img src="../../../assets/images/plan/planedit/5.png" alt="" />
        </div>
        <div class="two">
          <div>
            <div class="kejian">
              <a :href="item.path" target="_blank" style="color: black"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <!-- <div class="three">
          <div class="three-detail">
            <div>{{ item.grade }}</div>
            <div>{{ item.class }}</div>
            <div>{{ item.publish }}</div>
            <div>{{ item.term }}</div>
            <div>仅自己</div>
          </div>
          <div v-show="finished">上次备课时间:{{ item.lasttime }}</div>
          <div v-show="finished" >预计完成日期:{{ item.deadline }}</div>
          <div v-show="share || save" index="3">收到的赞:{{ item.good }}个</div>
          <div v-show="share" index="4">制作人:{{ item.author }}</div>
          <div v-show="save" index="5">收藏时间:{{ item.save }}</div>
        </div> -->
        <div class="four">
          <div class="four-icon">
            <div class="iconfont" @click="deletePdf(item.nanoid)">删除&#xe8b6;</div>
            <div class="iconfont">分享&#xed2e;</div>
            <!-- <div class="iconfont">点赞&#xe651;</div> -->
          </div>
          <div>
            <el-button type="primary" size="default" @click="editPdf(item)"
              >{{item.id==0? '在线浏览':'继续备课'}}</el-button
            >
          </div>
        </div>
      </div>
      <el-pagination
      v-show="pdfList.length"
        background
        layout="total, prev, pager, next, jumper"
        :total="pdfList.length"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        style="display:flex;justify-content:center;"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  props:['name','url','del','continue','path'],
  data() {
    return {
      pdfList: [
      ],
      finished: true,
      share: false,
      save: false,
      currentPage:1,
      pageSize:3,
    };
  },
  created() {
    this.getList()
  },
  computed: {
    pdfSplice() {
      return this.pdfList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    async editPdf(item){
      try {
        const res = await this.$API({
          url:this.continue,
          method:'post',
          data:{
            nanoid:item.nanoid
          }
        })
        this.$router.push({
        path:this.path,
        query:{uid:item.uid,
        test:res.data,
      id:item.id}
      })
      console.log(res.data);
      } catch (error) {
        this.$message.error(`获取数据失败了...,${error.message}`)
      }
    },  
    async getList(){
      try {
      const {Cid} = JSON.parse(sessionStorage.getItem('item'))
      const res = await this.$API({
        method: "post",
        url:this.url,
        data:{
          cid:Cid
        }
      });
      if ((res.status = 200)) this.pdfList = res.data;
    } catch (error) {
      this.$message.error(`获取数据失败,${error.message}`);
    }
    },
    async deletePdf(id){
      try {
        const res = await this.$API({
          method:'post',
          url:this.del,
          data:{
            nanoid:id
          }
        })
        this.getList();
        this.$message.success('删除成功~')
      } catch (error) {
        this.$message.error(`删除失败了...,${error.message}`)
      }
    },
    sizeChange(val){
      this.pageSize=val
    },
    currentChange(val){
      this.currentPage=val
    },
    finish(num) {
      switch (num) {
        case 1:
          this.finished = true ? true : false;
          this.share = false ? true : false;
          this.save = false ? true : false;
          break;
        case 2:
          this.finished = false ? true : false;
          this.share = true ? true : false;
          this.save = false ? true : false;
          break;
        default:
          this.finished = false ? true : false;
          this.save = true ? true : false;
          this.share = false ? true : false;
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #ff9539;
  &::after {
    position: absolute;
    content: "";
    height: 3px;
    width: 100% !important;
    bottom: 0;
    right: 0;
    background-color: #ff9539;
  }
}
.teach {
  width: 90%;
  border-radius: 5px;
  margin-top: 40px;
  margin-bottom: 20px;
  > :first-child {
    padding: 0;

    > div:first-child {
      width: 100%;
      background-color: #008c4e;
      display: flex;
      align-items: center;
      color: #fff;
      height: 65px;
      letter-spacing: 3px;
      font-size: 20px;
      box-sizing: border-box;
      padding-left: 20px;
      > img {
        margin-left: 5px;
        width: 23px;
        height: 23px;
      }
    }

    > div:nth-child(2) {
      display: flex;

      > div {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-size: 20px;
        height: 60px;
        position: relative;
        &:hover {
          color: #ff9539;
          &::after {
            position: absolute;
            content: "";
            height: 3px;
            width: 100%;
            bottom: 0;
            right: 0;
            transition: all 0.5s;
            background-color: #ff9539;
          }
        }
      }
      > div::after {
        position: absolute;
        content: "";
        height: 2px;
        width: 0;
        bottom: 0;
        left: 0;
        transition: all 0.5s;
        background-color: #ff9539;
      }
    }

    > div:nth-child(3) {
      border-top: 1px solid #d7d7d7;
      padding: 25px;
      padding-bottom: 0;
      > div {
        margin-bottom: 35px;
        display: flex;
        background-color: #ddf7f7;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
        .one {
          flex: 0.7;
          display: flex;
          justify-content: flex-end;
        }
        .two {
          display: flex;
          flex-direction: column;
          flex: 1.3;
          > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            .kejian {
              font-size: 20px;
              font-weight: 600;
            }
            > div:nth-child(2) {
              background-color: #008c4e;
              color: #ddf7f7;
              width: 60%;
              display: flex;
              justify-content: center;
              border-radius: 5px;
            }
          }
        }
        .three {
          flex: 1.7;
          display: flex;
          flex-direction: column;
          font-weight: 600;
          box-sizing: border-box;
          padding-left: 50px;
          .three-detail {
            display: flex;
            > div {
              padding-right: 3px;
              border-right: 2px solid #000000;
              margin-left: 3px;
            }
            > div:last-child {
              border-right: none;
            }
          }
        }
        .four {
          flex: 3;
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-weight: 600;
          .four-icon {
            display: flex;
            > div {
              border-right: 2px solid #000000;
              padding-right: 3px;
              margin-left: 3px;
              cursor: pointer;
            }
            > div:last-child {
              border-right: none;
            }
          }
        }
      }
    }
  }
}
</style>