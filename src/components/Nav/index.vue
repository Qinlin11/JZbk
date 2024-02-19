<template>
  <div class="header-nav">
    <div
      @click="getIndex(index)"
      v-for="(item, index) in list"
      :key="index"
      :class="{ active: currentIndex === index }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ["小学", "语文", "人教部编版", "一年级", "上学期", "第一单元"],
      list1: ["小学", "语文", "人教部编版", "一年级", "上学期", "第一单元"],
      currentIndex: 5,
    };
  },
  created() {
    this.$bus.$on("school", this.changeSchool);
    this.$bus.$on("changeUnit", this.unit);
  },
  methods: {
    getIndex(index) {
      this.currentIndex = index;
    },
    changeSchool(items) {
      // this.list[0]=item;更新某个值,v-for检测不到
      let { item, num } = items;
      item = item ? item:this.list1[num]
      switch (num) {
        case 0:
          this.list = [
            "小学",
            "语文",
            "人教部编版",
            "一年级",
            "上学期",
            "第一单元",
          ];
          this.$set(this.list, num, item);
          break;
        case 1:
          this.$set(this.list, num, item);
          break;
        case 2:
          this.$set(this.list, num, item);
          break;
        case 3:
          this.$set(this.list, num, item);
          break;
        default:
          this.$set(this.list, num, item);
          break;
      }
    },
    unit(item){
      this.$set(this.list,5,item);
    }
  },
};
</script>

<style lang="less" scoped>
.header-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #000000;
  height: 80px;
  width: 100%;
  background-color: #ddfbd1;
  font-weight: 600;
  font-size: 18px;
  > div {
    cursor: pointer;
  }
  > div:hover {
    color: #fa871a;
  }
}
.active {
  color: #fa871a;
}
</style>