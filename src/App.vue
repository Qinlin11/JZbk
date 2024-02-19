<template>
  <div id="app">
    <router-view>
      <Header></Header>
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
body {
  margin: 0;
  background-color:#eaf6f9;
}
#app {
  height: 100vh;
  background-color:#eaf6f9;
}
a{
  text-decoration: none;
  color: #ffffff;
}
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 3751099 */
  src: url('//at.alicdn.com/t/c/font_3751099_wfpba6xfeli.woff2?t=1668926479237') format('woff2'),
       url('//at.alicdn.com/t/c/font_3751099_wfpba6xfeli.woff?t=1668926479237') format('woff'),
       url('//at.alicdn.com/t/c/font_3751099_wfpba6xfeli.ttf?t=1668926479237') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
