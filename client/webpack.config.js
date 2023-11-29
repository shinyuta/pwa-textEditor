const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Jate App',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'serviceWorker.js'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Jate",
        description: "Text Editor made with Javascript",
        background_color:'#2196f3',
        theme_color: '#2196f3',
        start_url: './',
        publicPath: './',
        icons: [{
          src: path.resolve('./src/images/logo.png'),
          sizes: [480],
          destination: path.join('assets','icons')
        }]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    },
  };
};