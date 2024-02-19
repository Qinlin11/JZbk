<template>
  <div class="activity">
    <div class="activity-main">
      <div class="activity-top">
        <div>活动 ({{activityList.length}})</div>
        <div>
          <div style="margin-right:15px">
            <myButton @click.native="editNotice">发布通知</myButton>
            <el-dialog title="通知详情" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="活动范围" label-width="80">
                  <el-input v-model="form.extent" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动类型" label-width="80">
                  <el-input v-model="form.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" label-width="80">
                  <div class="block">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="form.time" type="datetimerange"
                      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="pubNotice">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
      <div class="activity-mid">
        <div class="activity-mid-main">
          <div class="list" v-for="(item, index) in activitySplice" :key="index">
            <div>
              <div>活动范围:{{ item.extent }}</div>
              <div>活动类型:{{ item.type }}</div>
              <div>活动时间:<span style="font-size:10px">{{ item.time }}</span></div>
            </div>
            <i class="iconfont" style="font-size:22px" @click="deleteNotice(item)">&#xe718;</i>
          </div>
        </div>
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="currentPage"
          :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="activityList.length" background>
          >
        </el-pagination>

      </div>
      <div class="activity-bottom">
        <img src="../../../assets/images/create/activity/tixian.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  data() {
    return {
      dialogFormVisible: false,
      activityList: [
      ],
      pageSize: 6,
      currentPage: 1,
      form: {
        extent: '',
        type: '',
        time: ''
      }
    }
  },
  created() {
    this.getNotice();
  },
  methods: {
    async deleteNotice(item) {
      try {
        let Rid = JSON.parse(sessionStorage.getItem('item')).nanoid;
        let Cid = item.nanoid
        let url = this.$route.path == '/create/activity' ? '/api/Cgroup/delNotice' : '/api/Rgroup/delNotice';
        const res = await this.$API({
          method: 'post',
          url: url,
          data: {
            Cid: JSON.parse(sessionStorage.getItem('item')).Cid,
            nanoid: this.$route.path == '/create/activity'? Cid:Rid,
            nanoid1:item.nanoid1
          }
        })
        this.getNotice();
        this.currentPage = this.activitySplice.length==1? this.currentPage-1:this.currentPage;
        this.$message.success('删除通知成功~');
      } catch (error) {
        this.$message.error(`删除失败了..${error.message}`)
      }
    },
    async getNotice() {
      try {
        let url = this.$route.path == '/create/activity' ? '/api/Cgroup/showNotice' : '/api/Rgroup/showNotice';
        const res = await this.$API({
          method: 'post',
          url: url,
          data: {
            Cid: JSON.parse(sessionStorage.getItem('item')).Cid,
            nanoid:JSON.parse(sessionStorage.getItem('item')).nanoid,
          }
        })
        this.activityList = res.data;
      } catch (error) {
        this.$message.error(`获取通知失败,${error.message}`)
      }
    },
    editNotice() {
      this.dialogFormVisible = true;
    },
    async pubNotice() {
      let url = this.$route.path == '/create/activity' ? '/api/Cgroup/notice' : '/api/Rgroup/notice';
      try {
        let Rid = JSON.parse(sessionStorage.getItem('item')).nanoid;
        let Cid = nanoid();
        this.dialogFormVisible = false;
        const res = await this.$API({
          method: 'post',
          url,
          data: {
            ...this.form,
            time: this.form.time[0],
            time1: this.form.time[1],
            Cid: JSON.parse(sessionStorage.getItem('item')).Cid,
            nanoid:this.$route.path == '/create/activity' ? Cid : Rid,
            nanoid1: nanoid()
          }
        })
        this.getNotice();
        for(let k in this.form){
          this.form[k] = '';
        }
        this.$message.success('发布通知成功~')
      } catch (error) {
        this.$message.error(`发布通知失败,${error.message}`)
      }
    },
    sizeChange(val) {
      this.pageSize = val;
    },
    currentChange(val) {
      this.currentPage = val;
    }
  },
  computed: {
    activitySplice() {
      return this.activityList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  }
};
</script>

<style lang="less" scoped>
.activity {
  width: 80%;
  height: 100%;
  display: flex;
  background-color: #e1edf0;

  .activity-main {
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .activity-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-left: 40px;

      >div {
        display: flex;
        font-size: 25px;
        font-weight: 600;
      }
    }

    .activity-mid {
      margin-top: 20px;
      background-color: #ffffff;
      width: 100%;
      height: 580px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;

      .activity-mid-main {
        width: 90%;
        height: 90%;
        display: flex;
        flex-wrap: wrap;

        .list {
          border-radius: 20px;
          width: 30%;
          background-color: #e7eefa;
          height: 40%;
          transition: all .5s;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin-right: 30px;

          >div {
            width: 80%;
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          i {
            cursor: pointer;
            position: absolute;
            right: 20px;
            bottom: 20px;
          }
        }

        .list:hover {
          transform: scale(1.1);
          background-color: #c4d8ff;
        }
      }
    }

    .activity-bottom {
      position: absolute;
      bottom: -106PX;
      right: -86PX;

      img {
        width: 250px;
        height: 250px;
      }
    }
  }
}
</style>