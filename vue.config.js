const { name } = require('./package')
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      globalObject: 'window'
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack (config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }

})
