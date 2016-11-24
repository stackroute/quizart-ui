const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');
config.devtool = 'eval-source-map';

config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/',
  'webpack/hot/dev-server');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  contentBase: 'client/',
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
});

server.listen(8080, function() {
  console.log('Webpack started on port:', 8080);
});
