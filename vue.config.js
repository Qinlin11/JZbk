const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://8.134.186.119",
        // pathRewrite: {"^/api" : ""}
      }
    }
  },
})
