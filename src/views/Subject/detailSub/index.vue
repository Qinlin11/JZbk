<template>
  <div class="detail-main">
    <div class="new-add">
      <div :class="{ addactive: activeIndex == 0 }" @click="changeActive(0)"> <img
          src="../../../assets/images/subject/1.png" alt="" srcset="" style="width:20px;margin-right: 5px;" v-show="activeIndex==0">
        <img src="../../../assets/images/subject/2.png" alt="" srcset="" style="width:20px;margin-right: 5px;" v-show="activeIndex==1"> 我的协同课程
      </div>
      <div :class="{ addactive: activeIndex == 1 }" @click="changeActive(1)"> <img
          src="../../../assets/images/subject/3.png" alt="" srcset="" style="width:20px;margin-right: 5px;" v-show="activeIndex==1">
        <img src="../../../assets/images/subject/4.png" alt="" srcset="" style="width:20px;margin-right: 5px;" v-show="activeIndex==0">系统协同课程
      </div>

    </div>

    <div>
      <Nav></Nav>
    </div>
    <div class="main-right-second">
      <div class="main-right-second-search">
        <div class="search">
          <input placeholder="请输入搜索内容" v-model="input">
          <img @click="search" src="../../../assets/images/subject/search.png" alt="" />
        </div>
        <button @click="createSub">创建课程</button>
        <el-dialog title="课程选项" :visible.sync="dialogFormVisible" center width="30%">
          <el-form :model="form">
            <el-form-item label="学段" label-width="50px">
              <el-select v-model="form.period" placeholder="请选择活动区域" @change="gradeChange">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in period"
                  :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="科目" label-width="50px">
              <el-select v-model="form.subject" placeholder="请选择活动区域">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in subject"
                  :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年级" label-width="50px">
              <el-select v-model="form.grade" placeholder="请选择活动区域">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in grade"
                  :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学期" label-width="50px">
              <el-select v-model="form.semester" placeholder="请选择活动区域">
                <el-option :label="item.label" :value="item.value" v-for="(item, index) in semester"
                  :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitSub">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="main-right-second-detail">
        <div class="main-right-second-detailInfo" v-for="(item, index) in detailInfoSlice" :key="index">
          <div>
            <img :src="item.img" alt="" />
          </div>
          <div class="main-right-second-mid">
            <div style="font-size: 22px">
              {{ item.subject }}{{ item.edition }}{{ item.grade
              }}{{ item.semester }}
            </div>
            <div>
              {{ item.school }}&nbsp;|&nbsp;{{ item.grade }}&nbsp;|&nbsp;{{
                  item.edition
              }}&nbsp;|&nbsp;{{ item.semester }}
            </div>
          </div>
          <div class="main-right-second-last">
            <div @click="toCreate(item)">进入教研</div>
          </div>
        </div>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
        layout="prev, pager, next" :total="subjectListCopy.length" :page-size="pagesize" :current-page="currentPage"
        class="elpage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  props: ["subjectList"],
  components: {
    Nav,
  },
  data() {
    return {
      input: "",
      currentPage: 1,
      pagesize: 3,
      subjectListCopy:this.subjectList,
      list: ['我的协同课程', '系统协同课程'],
      activeIndex: 0,
      dialogFormVisible: false,
      form: {
        period: '',
        subject: '',
        grade: '',
        edition: '人教部编版',
        semester: ''
      },
      period: [
        {
          label: '小学',
          value: '小学',
        },
        {
          label: '初中',
          value: '初中',
        },
        {
          label: '高中',
          value: '高中',
        },
      ],
      subject: [
        {
          label: '语文',
          value: '语文'
        },
        {
          label: '数学',
          value: '数学'
        },
        {
          label: '英语',
          value: '英语'
        },
      ],
      grade: [
      ],
      grade1: [
        {
          label: '一年级',
          value: '一年级'
        },
        {
          label: '二年级',
          value: '二年级'
        },
        {
          label: '三年级',
          value: '三年级'
        },
        {
          label: '四年级',
          value: '四年级'
        },
        {
          label: '五年级',
          value: '五年级'
        },
        {
          label: '六年级',
          value: '六年级'
        },
      ],
      grade2: [
        {
          label: '七年级',
          value: '七年级'
        },
        {
          label: '八年级',
          value: '八年级'
        },
        {
          label: '九年级',
          value: '九年级'
        },
      ],
      grade3: [
        {
          label: '高一',
          value: '高一'
        },
        {
          label: '高二',
          value: '高二'
        },
        {
          label: '高三',
          value: '高三'
        },
      ],
      semester: [
        {
          label: '上学期',
          value: '上学期'
        },
        {
          label: '下学期',
          value: '下学期'
        },
      ]
    };
  },
  created() {
    this.$bus.$on("changePage", this.changeCurrent);
  },
  watch:{
    subjectList:{
      handler(newVal,oldVal){
        this.subjectListCopy = newVal;
      },
      immediate:true
    }
  },
  computed: {
    detailInfoSlice() {
      return this.subjectListCopy.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
  },
  methods: {
    gradeChange(val) {
      this.form.grade = '';
      if(val.includes('高中')){
        return this.grade = this.grade3
      }
      if(val.includes('初中')){
        return this.grade = this.grade2
      }
      if(val.includes('小学')){
        return this.grade = this.grade1
      }
    },
    createSub() {
      this.dialogFormVisible = true;
    },
    async submitSub() {
      try {
        const res = await this.$API({
          method: 'post',
          url: '/api/Cgroup/createCourse',
          data: this.form
        })
        this.$message.success('创建课程教研成功')
        this.$emit('getList', 0)
        this.dialogFormVisible = false;
      } catch (error) {
        this.$message.error(`创建课程教研失败...该课程已存在`)
      }
    },
    changeActive(index) {
      this.activeIndex = index;
      this.currentPage=1;
      this.$emit('getList', index)
    },
    search() {
      if (this.input === "" || this.input == null) {
        return this.subjectListCopy = this.subjectList;
      }
      this.subjectListCopy = this.subjectListCopy.filter((item) => {
        return (
          item.subject.includes(this.input) ||
          item.edition.includes(this.input) ||
          item.grade.includes(this.input) ||
          item.semester.includes(this.input)
        );
      });
      this.currentPage=1;
    },
    async toCreate(item) {
      this.$router.push({
        path: "/create/member",
        query: {
          item
        }
      });
      sessionStorage.setItem('item', JSON.stringify(item))
    },
    changeCurrent(page) {
      this.currentPage = page;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.$emit("myslice", this.pagesize, this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("myslice", this.pagesize, this.currentPage);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  display: flex;
  justify-content: center;
}

.detail-main {
  width: 100%;
  height: 761.6px;

  .new-add {
    display: flex;
    height: 60px;
    font-weight: 600;
    color: #7b7b7b;
    border-radius: 5px;

    >div {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &::after {
        width: 0;
        content: '';
        position: absolute;
        bottom: 0;
        height: 6px;
        background-color: #f99746;
      }
    }
  }

  .addactive {
    color: #078f52;

    &::after {
      content: '';
      position: absolute;
      border-radius: 5px;
      width: 25% !important;
      height: 6px;
      bottom: 0;
      background-color: #f99746;
      transition: all .5s;
    }
  }

  .main-right-second {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - 100px);
    position: relative;

    .main-right-second-detail {
      height: calc(100% - 100px);
      width: 95%;
      display: flex;
      flex-direction: column;
    }

    .main-right-second-detailInfo {
      border-radius: 5px;
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 15px 45px;
      background-color: #def7f7;
      margin-bottom: 30px;

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
      padding: 10px 25px;
      box-sizing: border-box;
      width: 100%;
      justify-content: flex-end;

      .search {
        position: relative;
        display: flex;
        align-items: center;
        color: #ffffff;
        border-radius: 5px;
        margin-right: 20px;

        input {
          outline: none;
          border-radius: 20px;
          height: 30px;
          border: 2px solid #bababa;
          text-indent: 1em;
          width: 800px;
        }

        img {
          cursor: pointer;
          width: 30px;
          position: absolute;
          top: 3px;
          right: 10px;
        }
      }

      >button {
        font-weight: 600;
        width: 100px;
        height: 35px;
        border-radius: 5px;
        background-color: #ff922e;
        color: #ffffff;
        border: none;
        cursor: pointer;
        letter-spacing: 2px;
      }
    }

    .elpage {
      position: absolute;
      bottom: 45px;
    }
  }
}
</style>