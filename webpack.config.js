
var webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry:{
    index: './src/index/main.js',
    info: './src/info/info.js'
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'js/[name]-[hash:5].js',
    publicPath: ''  //这个地址涉及到html页面引用js的路径问题
  },
  devServer: {
    contentBase: "./dist/",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/index.html',
      // inject: 'head',
      template: __dirname + '/src/index/index.html',
      chunks: ['index'],
      inlineSource: '.(js|css)$',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/info.html',
      template: __dirname + '/src/info/info.html',
      hash: true,
      // inject: 'head',
      chunks: ['info'],
      inlineSource: '.(js|css)$',
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: __dirname + '/dist/menu.html',
      // inject: 'head',
      template: __dirname + '/src/index/index.html',
      chunks: ['index'],
      inlineSource: '.(js|css)$',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    //设置每一次build之前先删除dist
    new CleanWebpackPlugin(
      ['dist/*', 'dist/*',],　     //匹配删除的文件
      {
        root: __dirname,       　　　　　　　　　　//根目录
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
        dry: false        　　　　　　　　　　//启用删除文件
      }
    )
  ],
  module: {
    rules: [{
      test:/(\.jsx | \.js)$/,
      use: {
        loader: "babel-loader",
        options: {
          presents: [
            'env'
          ]
        }
      },
      exclude: /node_modules/
    },
    {
      test:/\.css$/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            module: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }
      ]
    }]
  }
}