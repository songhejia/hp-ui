const path = require('path');
const config = require('./webpack.dev.js');
const isMinify = process.argv.indexOf('-p') !== -1;

delete config.serve;

module.exports = Object.assign(config, {
  mode: 'production',
  entry: [
    'font-awesome-webpack!./path/to/font-awesome.config.js',
    path.join(__dirname, '../packages/index.js')
  ],
  //   'font-awesome': 'font-awesome-webpack!./path/to/font-awesome.config.js',
  //   'hp-ui': path.join(__dirname, '../packages/index.js')
  // },
  output: {
    path: path.join(__dirname, '../lib'),
    library: 'HPUI',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  performance: false,
  optimization: {
    minimize: isMinify
  }
});