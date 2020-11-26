// @ts-check
import webpack from 'webpack';
import dotenv from 'dotenv';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProduction = process.env.NODE_ENV === 'production';
console.log('isProduction', isProduction);

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => ({
    ...prev,
    [`process.env.${next}`]: JSON.stringify(env[next]),
  }), {});

  return {
    mode: process.env.NODE_ENV || 'development',
    externals: {
      gon: 'gon',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: `${__dirname}/dist/public`,
      publicPath: '/assets/',
    },
    devServer: {
      publicPath: '/assets/',
      compress: true,
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
  };
};
