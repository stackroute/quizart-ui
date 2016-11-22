module.exports={
  devtool: 'inline-source-map',
  entry:'./client/client',
  output:{
    path:'client/assets/',
    filename:'bundle.js',
    publicPath: '/assets/'
  },
  module:
  {
    loaders:[{
      loader:'babel',
      test:/\.js$/,
      exclude: /node_modules/,
      query:{
        presets:['es2015','react','stage-1']
      }
    },
    {
      test: /\.css$/,
      loader: 'style!css?modules',
      include: /flexboxgrid/
    }
  ]
  },
	resolve:{
		extensions: ['','.js','.jsx','/index','/index.js','/index.jsx']
	},
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
