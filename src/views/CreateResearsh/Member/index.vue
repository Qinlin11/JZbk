<template>
  <div class="member">
    <el-dialog title="提示" :visible.sync="Visable" width="30%">
      <span>是否发起协同</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visable = false">否</el-button>
        <el-button type="primary" @click="launch">是</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible" width="50%" center>
      <div class="dialog-top" slot="title">
        <div :class="{ active: index == currentIndex }" @click="changeLink(index)" v-for="(item, index) in dialogList"
          :key="index">
          {{ item }}
        </div>
      </div>
      <div class="dialog-bottom">
        <div class="dialog-bottom-main" v-show="show">

          <div class="dialog-please">
            请选择你要协同的教研组:<el-select style="outline: none;" v-model="select" clearable size="mini">
              <el-option :value="item.nanoid" :label="item.name" v-for="(item, index) in reaList"
                :key="index"></el-option>
            </el-select><span><router-link to="/subject/detailtea">查看全部教研组</router-link></span>
          </div>
          <div style="font-size: 20px">设置权限</div>
          <div class="dialog-edit" :class="{ active: nowIndex == index }" @click="check(index)"
            v-for="(item, index) in editView" :key="index">
            <div>
              <img :src="item.imgUrl" alt="" />
              <div>
                <div style="font-weight: 600; color: black">
                  {{ item.text }}
                </div>
                <div>收到邀请的好友{{ item.text }}</div>
              </div>
            </div>
          </div>
        </div>
        <addPeo v-show="!show" @update="update"></addPeo>
      </div>
      <span slot="footer">
        <el-button @click="addGroup" type="warning" v-if="show">创建邀请</el-button>
      </span>
    </el-dialog>

    <div class="member-div">
      <div class="member-top">
        <div>教研团队 ({{ Member.length }})</div>

        <div style="display:flex">
          <myButton :warn="true" v-if="$route.path == '/group/member' && identity" @click.native="disband">解散团队
          </myButton>
          <myButton :grey="!disabled" ref='btn' @click.native="joinGroup"
            v-if="($route.path == '/create/member' && id !== 2) || (!identity && id !== 2)">{{ text
            }}</myButton>
          <myButton :disabled="disabled" :grey="disabled" @click.native="dialogFormVisible = true"
            style="margin-left:10px">
            邀请成员</myButton>
        </div>
      </div>
      <div class="member-mid">
        <div class="list" v-for="(member, index) in memberSlice" :key="index">
          <div class="list-left">
            <div style="border-radius:50%;overflow:hidden;width:60px;height:60px;">
              <img v-image-preview :src="member.pic" alt="" />
            </div>

            <div class="list-left-name">
              <div style="font-weight: 600">{{ member.name }}</div>
              <div style="font-weight: 200; color: #9a9999">
                {{ member.identity }}
              </div>
            </div>
          </div>
          <div class="list-right">
            <div>
              <div>性别</div>
              <div>{{ member.sex }}</div>
            </div>
            <div>
              <div>加入时间</div>
              <div>{{ member.datatime }}</div>
            </div>
            <div class="iconfont" @click="deleteMember(member)"
              :style="{ fontSize: 40 + 'px', color: (($route.path == '/group/member' && identity == true) ? '#008ad3' : '') }">
              &#xe652;</div>
          </div>
        </div>
      </div>
      <div class="member-bottom">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          layout="prev, pager, next" :total="Member.length" :page-size="pagesize" :current-page="currentPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import addPeo from './addPeo'
export default {
  components: {
    addPeo
  },
  props: ['item'],
  data() {
    return {
      id: JSON.parse(sessionStorage.getItem('item')).id,
      Visable: false,
      select: '',
      disabled: false,
      search: '',
      dialogFormVisible: false,
      show: false,
      dialogList: ["邀请成员", "教研组协同"],
      currentIndex: 0,
      nowIndex: 0,
      editView: [
        {
          imgUrl: require("../../../assets/images/create/member/edit.png"),
          text: "可编辑",
        },
        {
          imgUrl: require("../../../assets/images/create/member/view.png"),
          text: "可查看",
        },
      ],
      currentPage: 1,
      pagesize: 4,
      reaList: '',
      Member: '',
      text: '加入团队',
      identity: false,
    };
  },
  created() {
    this.judgeLaunch()
    this.ifYes()
    this.ifIdentity()
    this.getRea();
    this.getMember();
    this.updateJoin();
    this.dialogList = this.$route.path == '/create/member' ? this.dialogList : ['邀请成员'];
  },
  methods: {
    async judgeLaunch() {
      try {
        const res = await this.$API({
          method: 'post',
          url: '/api/Cgroup/judge',
          data: {
            Cid: JSON.parse(sessionStorage.getItem('item')).Cid
          }
        })
        if(this.id==2){this.Visable = res.data==1? true:false}
      } catch (error) {
        this.$message.error(`判断失败,${error.message}`)
      }
    },
    async launch() {
      try {
        const res = await this.$API({
          method: 'post',
          url: '/api/Cgroup/launch',
          data: {
            Cid: JSON.parse(sessionStorage.getItem('item')).Cid
          }
        })
        this.$message.success('发起协同成功');
        this.Visable = false;
      } catch (error) {
        this.$message.error(`发起协同失败...${error.message}`)
      }
    },
    async addGroup() {
      try {
        const res = await this.$API({
          method: 'post',
          url: '/api/Cgroup/addGroup',
          data: {
            nanoid: this.select,
            cid: JSON.parse(sessionStorage.getItem('item')).Cid
          }
        })
        this.getMember();
        this.$message.success('邀请教研组协同成功~');
      } catch (error) {
        this.$message.error(`邀请教研组失败啦..${error.message}`);
      }
    },
    async ifIdentity() {
      if (this.$route.path == '/create/member') return;
      try {
        const item = JSON.parse(sessionStorage.getItem('item'))
        const res = await this.$API({
          method: 'post',
          url: '/api/Rgroup/checkIdentity',
          data: {
            nanoid: item.nanoid
          }
        })
        if (!this.identity) {
          if (res.data === 1) { this.disabled = false; this.text = '已加入团队' } else { this.disabled = true }
        }
      } catch (error) {
        this.$message.error(`获取本人信息失败,${error.message}`)
      }
    },
    async ifYes() {
      if (this.$route.path == '/create/member') return;
      try {
        const item = JSON.parse(sessionStorage.getItem('item'))
        const res = await this.$API({
          method: 'post',
          url: '/api/Rgroup/check',
          data: {
            nanoid: item.nanoid
          }
        })
        this.identity = res.data == 1 ? true : false;
        if (res.data === 1) { this.disabled = false; this.text = '已加入团队' } else { this.disabled = true }
      } catch (error) {
        this.$message.error(`未知错误,${error.message}`)
      }
    },
    async deleteMember(member) {
      if (this.$route.path == '/create/member') return this.$message.error('删除失败,权限不够');
      if (this.identity === false) return this.$message.error('删除失败,权限不够')
      if (member.id === 1) return this.$message.error('删除失败,权限不够')

      this.$confirm('此操作将永久删除该成员，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await this.$API({
            method: 'post',
            url: '/api/Rgroup/del',
            data: {
              nanoid: member.nanoid,
              name: member.name
            }
          })
          this.getMember()
          this.currentPage = this.memberSlice.length !== 1
            ? this.currentPage
            : this.currentPage - 1;
          this.currentPage == 0 ? this.currentPage = 1 : this.currentPage;
          this.$message.success('删除成功~');
        } catch (error) {
          this.$message.error(`删除失败了...,${error.message}`)
        }
      }).catch(() => {
        this.$message.info('已取消删除');
      })

    },
    async disband() {
      this.$confirm('此操作将永久解散该团队,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await this.$API({
            method: 'post',
            url: '/api/Rgroup/dissolution',
            data: {
              nanoid: JSON.parse(sessionStorage.getItem('item')).nanoid
            }
          })
          this.$message.success('解散团队成功~');
          this.$router.push('/subject/detailtea');
        } catch (error) {
          this.$message.error(`解散团队失败,${error.message}`)
        }
      }).catch(() => {
        this.$message.info('已取消解散')
      })
    },
    update() {
      this.getMember()
    },
    async updateJoin() {
      if (this.$route.path == '/group/member') return;
      try {
        const res = await this.$API({
          method: 'post',
          url: '/api/Cgroup/check',
          data: {
            cid: JSON.parse(sessionStorage.getItem('item')).Cid
          }
        })
        if (this.$route.path == '/create/member') {
          if (res.data === 1) { this.disabled = false; this.text = '已加入团队' } else { this.disabled = true }
        }
        this.$bus.$emit('changeData', this.disabled);
      } catch (error) {
        this.$message.error(`信息获取失败,${error.message}`)
      }
    },
    async getMember() {
      try {
        const item = JSON.parse(sessionStorage.getItem('item'))
        let url = item.Cid ? '/api/Cgroup/index' : '/api/Rgroup/click'
        const res = await this.$API({
          method: 'post',
          url,
          data: {
            Cid: item.Cid,
            nanoid: item.nanoid,
          }
        })
        this.Member = res.data;
      } catch (error) {
        this.$message.error(`获取教师列表失败,${error.message}`)
      }
    },
    async getRea() {
      if (this.$route.path == '/group/member') return;
      try {
        const res = await this.$API({
          method: 'get',
          url: '/api/Cgroup/rendering'
        })
        this.reaList = res.data;
      } catch (error) {
        this.$message.error(`获取教研组数据失败,${error.message}`)
      }
    },
    check(index) {
      this.nowIndex = index;
    },
    changeLink(index) {
      this.currentIndex = index;
      if (this.$route.path == '/group/member') {
        this.show = this.show;
      } else {
        this.show = !this.show;
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async joinGroup() {
      try {
        let url = this.$route.path == '/create/member' ? '/api/Cgroup/join' : '/api/Rgroup/enter'
        const res = await this.$API({
          url,
          method: 'post',
          data: {
            Cid: JSON.parse(sessionStorage.getItem('item')).Cid,
            id: 2,
            nanoid: JSON.parse(sessionStorage.getItem('item')).nanoid
          }
        })
        this.updateJoin();
        this.ifIdentity();
        this.text = this.disabled ? '已加入团队' : '加入团队';
        this.getMember();
        this.currentPage = this.memberSlice.length !== 1
          ? this.currentPage
          : this.currentPage - 1;
        this.currentPage == 0 ? this.currentPage = 1 : this.currentPage;
        if (res.data) {
          this.$message.success('加入团队成功')
        } else {
          this.$message.info('已退出该团队');
        }
      } catch (error) {
        this.$message.error(`加入团队失败,${error.message}`)
      }
    }
  },
  computed: {
    memberSlice() {
      return this.Member.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0caa7f; //修改后的背景图颜色
  color: #fff;
}

.member {
  width: 80%;
  height: 100%;
  display: flex;

  /deep/ .el-dialog__header {
    padding: 0;
  }

  .dialog-top {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    align-items: flex-end;

    .active {
      color: #0a8e6b;

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100% !important;
        height: 3px;
        background-color: #0a8e6b;
        transition: all 0.5s;
      }
    }

    >div {
      margin-left: 30px;
      color: #000;
      font-weight: 600;
      font-size: 18px;
      padding-bottom: 5px;
      position: relative;
    }

    >div:first-child::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0%;
      height: 3px;
      background-color: #0a8e6b;
    }

    >div:nth-child(2)::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0%;
      height: 3px;
      background-color: #0a8e6b;
    }
  }

  .dialog-bottom {
    display: flex;
    justify-content: center;

    .dialog-bottom-main {
      display: flex;
      flex-direction: column;
      height: 320px;
      justify-content: space-between;

      .dialog-please {
        font-size: 18px;

        select {
          height: 100%;
        }

        span {
          cursor: pointer;
          margin-left: 8px;
          font-size: 12px;

          a {
            color: #46ab7e;
          }
        }
      }

      width: 90%;

      .active {
        border: 2px solid #13955c;
        background-color: #ddf7f7;
      }

      img {
        width: 60px;
        height: 60px;
      }

      .dialog-edit {
        border-radius: 5px;
        display: flex;
        height: 100px;
        box-sizing: border-box;

        >div {
          margin-left: 20px;
          display: flex;
          width: 35%;
          align-items: center;
          justify-content: space-between;

          >div {
            height: 60%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
          }
        }
      }

      .dialog-resure {
        display: flex;
        transition: all 0.5s;
      }
    }
  }

  .member-div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .member-top {
      font-weight: 600;
      width: 80%;
      font-size: 25px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .member-mid {
      margin-top: 20px;
      width: 100%;
      height: 550px;

      .list {
        width: 100%;
        height: 90px;
        border-radius: 20px;
        background-color: #fffbfb;
        display: flex;
        align-items: center;
        padding: 10px 0;
        margin-bottom: 20px;

        .list-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-evenly;

          img {
            width: 65px;
            // border-radius: 50%;
          }

          .list-left-name {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }

        .list-right {
          flex: 2.5;
          color: #9a9999;
          display: flex;
          align-items: center;
          justify-content: space-around;

          >div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>