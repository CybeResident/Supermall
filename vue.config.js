module.exports = {
  transpileDependencies: true,

  // configureWebpack：相当于 webpack.config.js
  configureWebpack: {
    resolve: {
      alias: {
        // 内置：'@': 'src'
        // 在 vue-cli2 中，不能将之前设置的别名用在此处设置；但 vue-cli3 可以
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
