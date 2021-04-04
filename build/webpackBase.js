const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const path = require('path')
const page = ['login']
let enterArr = {}
let htmlplugin = []
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

page.forEach(item => {
  enterArr[item] = `./src/pages/${item}/index.js`
  htmlplugin.push(
    new HtmlWebpackPlugin({
      entryName: item,
      filename: `${item}.html`,
      template: `./src/pages/${item}/index.html`,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      // chunksSortMode: "dependency",
      chunks: ['vendors','commons',item]
    })
  )
}) 

const webpackconfig = {
  entry:enterArr,
  resolve: {
    extensions:config.dev.extensions,
    alias:config.dev.alias
  },
  devServer: {
    proxy:config.dev.proxy,
    hot: true,
    port:config.dev.port,
    host: 'localhost'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },{    
      test: /\.(jpg|png|gif)$/,
        //处理一个loader可以使用loader
        loader: 'url-loader',
        //其他设置
        options: {
          //图片大小小于8kb，就会被base64处理
          	//优点：减少请求数量（减轻服务器压力）
          	//缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024 * 1024,
          //因为url-loader没人使用ES6模块化解析，二html-loader引入图片是CommonJs
          //解析时会出问题：【object Module】
          //解决这个问题就需要关闭url-loader的ES6模块化，使用CommonJs解析
          esModule:false,
          //打包后的图片的名字[hash:10]:取图片前十位的哈希值，[ext]：保存原先的扩展名
          name:'[hash:10].[ext]'
        }
    },{
        test:/\.html$/,
        //处理HTML文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
    }]
  },
  plugins: [
    ...htmlplugin
  ]
}

module.exports = webpackconfig