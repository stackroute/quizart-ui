const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: ['./client/app']
  },
  output: {
    path: path.join(__dirname, 'client','assets'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  setup: function(app) {
    app.use(middleware);
    app.use('/api', router);
  },
  module:
  {
    loaders: [{
      loader: 'babel',
      test: /\.jsx$/,
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-1']
      }
    },
    {
      test: /\.css$/,
      loader: 'style!css?modules',
      include: /flexboxgrid/
    }
  ]
  },
	resolve: {
		extensions: ['', '.js', '.jsx', '/index', '/index.js', '/index.jsx']
	},
  node: {
    fs: 'empty',
    net: 'empty',
    dns: 'mock'
  },
  plugins: []
};
