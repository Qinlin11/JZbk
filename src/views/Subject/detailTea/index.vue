<template>
  <div class="deteach">
    <div class="deteach-top">
      我的教研组<img
        src="../../../assets/images/subject/detailTea/1.png"
        alt=""
      />
    </div>
    <div class="deteach-bottom">
      <div class="deteach-main">
        <div class="deteach-main-top">
          <el-select size="mini" @change="paixu" v-model="currentSelect" style="margin-right: 5px; border-radius: 5px">
            <el-option value="1" label="全部教研组"></el-option>
            <el-option value="2" label="我创建的"></el-option>
            <el-option value="3" label="我加入的"></el-option>
          </el-select>
          <el-select size="mini"  @change="paixu" v-model="currentSelect1" style="margin-right: 5px; border-radius: 5px">
            <el-option value="1" label="默认排序" ></el-option>
            <el-option value="2" label="按创建时间排序">按创建时间排序</el-option>
            <el-option value="3" label="按名称排序">按名称排序</el-option>
          </el-select>
          <button @click="dialogVisible = true" class="create">
            创建教研组
          </button>
          <el-dialog
            center
            title="创建教研组"
            :visible.sync="dialogVisible"
            width="30%"
            @close=""
          >
            <el-form :model="form">
              <el-form-item label="名称" label-width="85px" required>
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="简介" label-width="85px">
                <el-input
                  v-model="form.introduce"
                  autocomplete="off"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="success" @click="addGroup()">确认</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="deteach-main-list">
          <div
            v-for="(item, index) in groupList"
            :key="index"
            @click="toJoin(item)"
          >
            <div class="list-div">
              <div class="list-fir">
                <div>教研组名称:{{ item.name }}</div>
                <div>人数:{{ item.sum }}</div>
              </div>
              <div class="list-sec">
                <img :src="item.pic" alt="" />
              </div>
              <div class="list-thr">简介:{{ item.introduce }}</div>
              <div class="list-fou">
                <span>活动</span>
                <span>动态</span>
                <span>浏览</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="teachList.length"
        background
      >
        :pager-count="7">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  data() {
    return {
      currentSelect:'1',
      currentSelect1:'1',
      dialogVisible: false,
      form: {
        name: "",
        introduce: "",
      },
      currentPage: 1,
      pagesize: 6,
      formLabelWidth: "80px",
      teachList: [],
    };
  },
  created() {
    this.getList();
  },
  computed: {
    groupList() {
      return this.teachList.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  methods: {
    async paixu(val){
      if(this.currentSelect==1&&this.currentSelect1==1)return this.getList();
      try {
        const res = await this.$API({
          method:'post',
          url:'/api/Rgroup/paixu',
          data:{
            identity:this.currentSelect,
            time:this.currentSelect1
          }
        })
        this.teachList= res.data;
      } catch (error) {
        this.$message.error(`获取排序失败...${error.message}`)
      }
    },
    async addGroup() {
      try {
        const res = await this.$API({
          url: "/api/Rgroup/add",
          method: "post",
          data: {
            ...this.form,
          nanoid:nanoid()},
        });
        this.getList();
        this.dialogVisible = false;
      } catch (error) {
        this.$message({ type: error, message: `添加失败,${error.message}` });
      }
    },
    async toJoin(item) {

        this.$router.push({
          path: "/group/member",
          query: {
            item,
          },
        });
      sessionStorage.setItem("item", JSON.stringify(item));
    },
    async getList() {
      try {
        const res = await this.$API({
          method: "get",
          url: "/api/Rgroup/index",
        });
        this.teachList = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    sizeChange(val) {
      this.pageSize = val;
    },
    currentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>

<style lang="less" scoped>
.deteach {
  width: 100%;
  height: 761.6px;
  .deteach-top {
    width: 100%;
    height: 6%;
    background-color: #008c4e;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 600;
    font-size: 18px;
    img {
      margin-left: 8px;
      width: 16px;
      height: 16px;
    }
  }
  .deteach-bottom {
    width: 100%;
    height: 94%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .deteach-main {
      width: 90%;
      height: 95%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .deteach-main-top {
        width: 100%;
        height: 4%;
        display: flex;
        justify-content: flex-end;
        margin-left: -31px;
        select{
          border: 1px solid#9b9b9b;
          outline: none;
        }
        .create{
          background-color: #fd9131;
          border: none;
          border-radius: 5px;
          color: #ffffff;
          font-size: 10px;
          cursor: pointer;
          transition: all .1s;
          &:hover{
            transform: scale(1.01);
          }
        }
      }
      .deteach-main-list {
        width: 100%;
        height: 93%;
        display: flex;
        flex-wrap: wrap;
        color: #403620;
        font-size: 14px;
        margin-left: 25px;
        > div {
          height: 47%;
          width: 265px;
          background-color: #def7f7;
          border-radius: 8px;
          transition: all 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 20px;
          &:hover {
            transform: scale(1.03);
            background-color: #c4d8ff;
          }
          .list-div {
            width: 90%;
            height: 90%;
            display: flex;
            flex-direction: column;
            > div {
              width: 100%;
            }
            .list-sec {
              margin: 10px 0;
              display: flex;
              justify-content: center;
              flex: 4.3;
            }
            .list-fir {
              flex: 2;
              padding-left: 15px;
              box-sizing: border-box;
            }
            .list-thr {
              flex: 4.3;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;
            }
            .list-fou {
              flex: 1;
              display: flex;
              justify-content: space-around;
              cursor: pointer;
              span:hover {
                color: #008c4e;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
}
</style>