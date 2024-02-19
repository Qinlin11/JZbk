<template>
  <div class="container">
    <div style="width: 100%; position: fixed; top: 0; z-index: 99">
      <slot></slot>
    </div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="position: absolute; top: 95px; left: 115px;"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/subject' }" style="font-weight: 600">教研系统</el-breadcrumb-item>
      <el-breadcrumb-item style="font-weight: 600">{{select}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main">
      <div class="main-left">
        <div class="main-left-top">
          <div class="main-left-top-first">
            <div
              v-for="(item, index) in nameList"
              :key="index"
              :class="{ active: currentIndex1 === index }"
              @click="getIndex1(index)"
            >
              <router-link :to="item.path">{{ item.name }}</router-link>
            </div>
          </div>
          <div class="main-left-top-second">
            <div class="select">
              选择课程<img src="../../assets/images/subject/5.png" alt="" />
            </div>
            <div class="subject-detail">
              <div class="tag">
                <div>学段</div>
                <div class="tag-info">
                  <div
                    v-for="(item, index) in gradeList"
                    :key="index"
                    :class="{ active: currentIndex === index }"
                    @click="getIndex(index,item)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
              <div>
                <div>科目</div>
                <div style="width:170px">
                  <el-select
                    v-model="subjectDetail.kemuValue"
                    placeholder="请选择"
                    @change="getDetail1"
                    clearable
                  >
                    <el-option
                      v-for="item in subjectDetail.kemu"
                      :key="item.value"
                      :label="item.label"
                      :value="{item:item.label,value:item.value}"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <div>版别</div>
                <div style="width:170px">
                  <el-select
                    v-model="subjectDetail.publishValue"
                    placeholder="请选择"
                    @change="getDetail2"
                    clearable
                  >
                    <el-option
                      v-for="item in subjectDetail.publish"
                      :key="item.value"
                      :label="item.label"
                      :value="{item:item.label,value:item.value}"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <div>年级</div>
                <div style="width:170px">
                  <el-select
                    v-model="subjectDetail.gradeValue"
                    placeholder="请选择"
                    @change="getDetail3"
                    clearable
                  >
                    <el-option
                      v-for="item in subjectDetail.grade"
                      :key="item.value"
                      :label="item.label"
                      :value="{item:item.label,value:item.value}"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <div>学期</div>
                <div style="width:170px">
                  <el-select
                    v-model="subjectDetail.termValue"
                    placeholder="请选择"
                    @change="getDetail4"
                    clearable
                  >
                    <el-option
                      v-for="item in subjectDetail.term"
                      :key="item.value"
                      :label="item.label"
                      :value="{item:item.label,value:item.value}"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-left-bottom">
          <Catalogue></Catalogue>
        </div>
      </div>
      <div class="main-right" style="position: relative">
        <transition
          :duration="500"
          enter-active-class="animate__animated animate__backInRight"
          leave-active-class="animate__animated animate__backOutRight"
          mode="out-in"
          style="position: absolute; width: 100%"
        >
          <router-view
          v-if="dataShow"
            :subjectList="subjectList"
            @myslice="slicePage"
            @getList="getList"

          ></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Catalogue from "@/components/Catalogue";
export default {
  components: {
    Catalogue,
  },
  data() {
    return {
      dataShow:false,
      active: true,
      subjectDetail: {
        kemu: [
          {
            value: "1",
            label: "语文",
          },
          {
            value: "2",
            label: "数学",
          },
          {
            value: "3",
            label: "英语",
          },
        ],
        kemuValue: "",
        publish: [
          {
            value: "1",
            label: "人教部编版",
          },
        ],
        publishValue: "",
        grade: [],
        gradeValue: "",
        term: [
          {
            value: "1",
            label: "上学期",
          },
          {
            value: "2",
            label: "下学期",
          },
        ],
        termValue: "",
      },
      gradeList: ["小学", "初中", "高中"],
      currentIndex: null,
      currentIndex1: null,
      nameList: [
        {
          name: "课堂",
          path: "/subject/detailsub",
        },
        {
          name: "教研组",
          path: "/subject/detailtea",
        },
      ],
      detailInfo: [],
      pagesize: 3,
      currentPage: 0,
      detailNum: {
        subject: null,
        edition: null,
        grade: null,
        semester: null,
      },
      grade1: [
        {
          value: "7",
          label: "七年级",
        },
        {
          value: "8",
          label: "八年级",
        },
        {
          value: "9",
          label: "九年级",
        },
      ],
      grade2: [
        {
          value: "10",
          label: "高一",
        },
        {
          value: "11",
          label: "高二",
        },
        {
          value: "12",
          label: "高三",
        },
      ],
      grade3: [
        {
          value: "1",
          label: "一年级",
        },
        {
          value: "2",
          label: "二年级",
        },
        {
          value: "3",
          label: "三年级",
        },
        {
          value: "4",
          label: "四年级",
        },
        {
          value: "5",
          label: "五年级",
        },
        {
          value: "6",
          label: "六年级",
        },
      ],
      select:'课堂',
      subjectList:'',
      uri:''
    };
  },
  created() {
    this.getList()
    // this.getIndex(0);
    this.$route.path==='/subject/detailtea'? this.getIndex1(1):this.getIndex1(0)
  },
  methods: {
    async getList(index=0){
      try {
        let url = index ==0? '/api/Cgroup/showCourse':'/api/Course/index';
        this.uri = index==0? "/api/Cgroup/search":'/api/Course/select_course'
        const res = await this.$API({
          method:'get', 
          url
        })
        this.subjectList = res.data;
        this.dataShow =true;
      } catch (error) {
        this.$message.error(`获取课程数据失败...${error.message}`)
      }
    },
    async getIndex(index,item) {
      if (this.currentIndex !== index) {
        for(let key in this.subjectDetail){
          if(key.includes('Value')){
            this.subjectDetail[key]=""
          }
        }
        for (let key in this.detailNum) {
          this.detailNum[key]=null;
        }
        this.$bus.$emit("changePage", 1);
      }
      this.currentIndex = index;
      if(item)this.$bus.$emit('school',{item,num:0});
      if (index == 1) {
        this.subjectDetail.grade = this.grade1;
      } else if (index == 2) {
        this.subjectDetail.grade = this.grade2;
      } else {
        this.subjectDetail.grade = this.grade3;
      }
      try {
        const res = await this.$API({
          method: "post",
          url: this.uri,
          data: {
            id: index + 1,
            ...this.detailNum
          },
        });
        this.subjectList = res.data;
        console.log(this.subjectList);
      } catch (error) {
        this.$message.error(`筛选失败....${error.message}`)
      }
    },
    getIndex1(index) {
      this.currentIndex1 = index;
      if(index==0){
        this.select='课堂'
      }else{
        this.select='教研组'
      }
    },
    getDetail1(data1) {
      const {value,item} = data1;
      this.$bus.$emit('school',{item,num:1})
      this.detailNum.subject = value * 1;
      this.getIndex(this.currentIndex);
    },
    getDetail2(data1) {
      const {value,item} = data1;
      this.$bus.$emit('school',{item,num:2})
      this.detailNum.edition = value * 1;
      this.getIndex(this.currentIndex);
    },
    getDetail3(data1) {
      const {value,item} = data1;
      this.$bus.$emit('school',{item,num:3})
      this.detailNum.grade = value * 1;
      this.getIndex(this.currentIndex);
    },
    getDetail4(data1) {
      const {value,item} = data1;
      this.$bus.$emit('school',{item,num:4})
      this.detailNum.semester = value * 1;
      this.getIndex(this.currentIndex);
    },
    slicePage(p, c) {
      this.pagesize = p;
      this.currentPage = c;
    },
  },
};
</script>

<style lang="less" scoped>
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.container {
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  .el-breadcrumb ::v-deep .el-breadcrumb__inner {
    color: #008c4e !important;
    &:hover{
      color: #ff922e !important;
    }
  }
  /deep/.el-header{
    margin-bottom: 0;
  }
}
.main {
  width: 85%;
  height: 100%;
  display: flex;
  margin-top: 120px;
  .main-left {
    width: 360px;
    display: flex;
    flex-direction: column;
    .main-left-top {
      margin-bottom: 20px;
    }
  }
  .main-right {
    width: 100%;
    margin-left: 25px;
    background-color: #ffffff;
    .main-right-second {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: calc(100% - 100px);
      .main-right-second-detail {
        height: calc(100% - 100px);
        width: 95%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
      .main-right-second-detailInfo {
        border-radius: 5px;
        width: 100%;
        display: flex;
        box-sizing: border-box;
        padding: 15px 45px;
        background-color: #def7f7;

        .main-right-second-mid {
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          justify-content: space-around;
          box-sizing: border-box;
          padding: 15px;
          flex: 1;
        }
        .main-right-second-last {
          display: flex;
          justify-content: center;
          color: #ffffff;
          align-items: center;
          flex: 1;
          div {
            background-color: #1e98d7;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            cursor: pointer;
            font-size: 20px;
            border-radius: 10px;
          }
        }
        img {
          width: 90px;
          height: 120px;
        }
      }
      .main-right-second-search {
        display: flex;
        padding: 10px 50px;
        box-sizing: border-box;
        width: 100%;
        .search {
          cursor: pointer;
          width: 80px;
          background-color: #008c4e;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          border-radius: 5px;
        }
      }
    }
  }
  .main-left-bottom {
    width: 100%;
    height: 370px;
    background-color: #ffffff;
    /deep/ .aside-mulu {
      height: 9%;
      font-weight: 600;
    }
    /deep/ .demo-diy {
      height: 91%;
      padding-bottom: 30px;
    }
  }
  .el-menu-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      height: 50px;
    }
  }
  .main-left-top-first {
    display: flex;
    margin-bottom: 10px;
    height: 55px;
    > div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      height: 100%;
      font-weight: 600;
      background-color: #ffffff;
      color: #9a9c9c;
      border-radius: 5px;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #8f8f8f;
        width: 100%;
        height: 100%;
      }
    }
  }
  .main-left-top-second {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    align-items: center;
    border-radius: 5px;
    .select {
      background-color: #008c4e;
      color: #ffffff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 35px;
      font-size: 14px;
      width: 100%;
      border-radius: 5px;
      font-weight: 600;
      box-sizing: border-box;
      padding-left: 20px;
      > img {
        width: 14px;
        height: 14px;
        margin-left: 3px;
      }
    }
    .subject-detail {
      display: flex;
      flex-direction: column;
      width: 80%;
      padding: 10px;
      > div {
        display: flex;
        font-weight: 600;
        width: 100%;
        align-items: center;
        margin-bottom: 10px;
        > div:first-child {
          width: 41px;
          margin-right: 8px;
        }
        .tag-info {
          display: flex;
          font-weight: 400;
          color: #535757;
          justify-content: space-between;
          flex: 1;
          height: 100%;
          align-items: center;
          > div {
            cursor: pointer;
            background-color: #ffffff;
            border-radius: 5px;
            width: 50px;
            height: 80%;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1.5px solid #cccccc;
          }
        }
      }
      .tag {
        height: 41.6px;
      }
    }
  }
}
.active {
  background-color: #ff922e !important;
  a{
      color: #ffffff !important;
  }
}
</style>