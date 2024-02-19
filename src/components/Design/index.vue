<template>
  <el-container class="vertical">
    <Header style="position:fixed;top: 0;z-index: 999;"></Header>
    <slot></slot>
    <el-container>
      <el-aside width="21%">
        <Catalogue>
          <div class="demo-img">
            <img src="../../assets/images/plan/planedit/1.png" alt="" />
          </div>
        </Catalogue>
      </el-aside>
      <el-main style="width:63%" >
        <Nav></Nav>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div>我的课程</div>
            <img src="../../assets/images/plan/planedit/4.png" alt="" />
          </div>
          <div class="text">
            <div v-for="(item,index) in unitSplice" :key="index">
              <div>
                <img :src="item.pic" alt="" />
              </div>
              <div>
                <div style="white-space:nowrap;font-size:16px">{{item.name}}</div>
                <slot name="edit" :item="item">
                  <div>
                    <router-link :to="{path:'/person/fir',query:{uid:item.uid}}">编辑</router-link>
                  </div></slot>
              </div>
            </div>
          </div>
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="unitList.length" background
            style="display:flex;justify-content:center;"
            >
            >
          </el-pagination>
        </el-card>
      </el-main>
      <slot name="design"></slot>
    </el-container>
  </el-container>
</template>
  
  <script>
import Nav from "@/components/Nav";
import Catalogue from "@/components/Catalogue";
export default {
  name: "Design",
  props:['url'],
  data() {
    return {
      unitList:'',
      pageSize:4,
      currentPage:1,
    }
  },
  components: {
    Nav,
    Catalogue,
  },
  created() {
    this.getUnit()
  },
  computed:{
    unitSplice(){
      return this.unitList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  methods: {
    currentChange(val){
      this.currentPage=val;
    },
    sizeChange(val){
      this.pageSize=val;
    },
    async getUnit(){
      try {
        const item = JSON.parse(sessionStorage.getItem('item')) 
        const res = await this.$API({
          method:'post',
          url:this.url,
          data:{
            cid:item.Cid
          }
        })
        this.unitList = res.data;
      } catch (error) {
        this.$message.error(`获取单元失败了o..,${error.message}`)
      }
    }
  },
};
</script>
  
  <style lang="less" scoped>
.box-card {
  margin: 20px 0;
  margin-top: 50px;
  .clearfix {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 18px;
    img {
      margin-left: 10px;
      width: 20px;
      height: 22px;
    }
  }
  > :first-child {
    background-color: #008c4e !important;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 22px;
    letter-spacing: 3px;
  }


  .text {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    > div {
      width: 40%;
      height: 150px;
      margin: 10px;
      background-color: #ddf7f7;
      display: flex;
      justify-content: space-between;

      > div:nth-child(1) {
        width: 107px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      > div:nth-child(2) {
        font-weight: 600;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 18px;

        > div:nth-child(2) {
          cursor: pointer;
          align-self: flex-end;
          width: 80px;
          height: 30px;
          background-color: #1e98d7;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          a {
            color: #fff;
            font-weight: 400;
          }
        }
        > div:nth-child(3) {
          font-weight: 400;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          background-color: #1e98d7;
          cursor: pointer;
          align-self: flex-end;
          width: 80px;
          height: 30px;
          color: #fff;
        }
      }
    }
  }
}
.vertical {
  flex-direction: column;
  background-color: #e4eef0;
  height: 100%;
  /deep/.el-header{
    margin-bottom: 40px;
  }
  .el-container {
    background-color: #e4eef0;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 120px;
  }
}
.el-aside {
  margin-left: 70px;
  height: 600px;
  border-radius: 10px;
  background-color: #ffffff;
  padding-bottom: 30px;
  width: 300px;
  .demo-img {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 100%;
    }
  }


  .el-menu-demo {
    border: none;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  }
}

.el-main {
  padding: 0;
  margin: 0 70px 0 70px;
  width: 1049px;
  flex: none;
}
</style>