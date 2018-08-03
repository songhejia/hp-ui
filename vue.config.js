module.exports = {
  // pages: {
  //   index: {
  //     entry: './es/index.js'
  //   }
  // },
  chainWebpack: (config) => {
    // config.output.set('library', 'hp-ui')
    // config.output.set('libraryTarget', 'umd')
    // config.output.set('umdNamedDefine', true)
    // config.output.set('globalObject', 'this')
    config.module
      .rule('pug')

    // .test(/\.pug$/)
    // .use('pug-loader')
    // .loader('pug-loader')
    config.module.rule('jade')
  }
}