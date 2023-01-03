const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const target = process.env.NODE_ENV === 'production' ? 'browserslist' : 'web';
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode,
  target,

  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },

  devServer: {
    hot: true,
  },
};
