const path=require('path')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  //开发环境配置
  dev: {
    //接口代理地址
    proxy: [{
      //需代理的应用
      context: [],
      //代理目标主机
      target: 'http://192.168.20.9',
      //代理域名     
      changeOrigin: true,
      // 利用node.js重写domain,解决tomcat接口重定向（302）导致接口跨域问题
      hostRewrite: 'localhost:8080'
    }],
    //host
    host: 'localhost',
    //端口
    port: 8085,
    //开发路径别名
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
      '_c': resolve('src/component'),
      '_p': resolve('src/pages')
    },
    //自动解析拓展
    extensions: ['.js', '.vue', '.scss']
  },
  build: {
    //输出目标目录
    //输出目录
    assetsRoot: resolve('./mike'),
    //输出静态资源目录
    assetsSubDir: 'static',
    //sourcemap配置
    sourcemap: true,
    //是否开启gzip
    gzip: false,
    //开启bundleAnalyzerReport
    bundleAnalyzerReport: false
  }
}