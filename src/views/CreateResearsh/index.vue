<template>
  <Create :url="urlList" :toPath="toPath"></Create>
</template>

<script>
export default {
  data() {
    return {
      urlList:['/create/member','/create/activity','/create/discuss'],
      toPath:['/subject/detailsub','课堂','课程教研'],
    }
  },
};
</script>

<style lang="less" scoped>
</style>