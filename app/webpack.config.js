const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const TerserPlugin = require('terser-webpack-plugin');


// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {
  paths,
  rules,
  plugins,
  resolve,
  stats,
  performance,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
} = require('./webpack/config');

const devServer = require('./webpack/dev-server').devServer;

plugins.push(
  // Using following libraries as global variable
  new webpack.ProvidePlugin({
    React: 'react',
  }),
  // Extracts CSS to a file
  new MiniCssExtractPlugin({
    filename: IS_PRODUCTION ? 'main.[contenthash:8].css' : 'main.css',
    chunkFilename: IS_PRODUCTION ? '[name].[contenthash:8].css' : '[name].css',
  }),
  new StatsWriterPlugin({
    filename: 'compilation-stats.json', // Default
    transform(data) {
      return Promise.resolve().then(() =>
        JSON.stringify(
          {
            assetsByChunkName: { ...data.assetsByChunkName },
            namedChunkGroups: { ...data.namedChunkGroups },
            sizes: (function () {
              const _sizes = {};

              data.assets.forEach((asset) => {
                if (asset.chunkNames.length) {
                  _sizes[asset.name] = asset.size; // Size in bytes
                }
              });

              return _sizes;
            })(),
          },
          null,
          2
        )
      );
    },
    fields: ['assetsByChunkName', 'namedChunkGroups', 'assets', 'size'],
  })
);

if (IS_DEVELOPMENT) {
  // Development plugins
  plugins.push(
    // Don't emmit build when there was an error while compiling
    // No assets are emitted that include errors
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  plugins.push(
    new CompressionPlugin({
      test: /\.(js|css)$/,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      deleteOriginalAssets: false,
    })
    // new BundleAnalyzerPlugin()
  );
}

plugins.push(

/*
  new HtmlWebpackPlugin({
    template: path.join(paths.build, 'airbnb/index.html'),
    path: paths.build,
    filename: 'index.html',
    html_opts: Object.assign({}, htmlMeta),
    minify: {
      collapseWhitespace: IS_PRODUCTION,
      minifyCSS: IS_PRODUCTION,
      minifyJS: IS_PRODUCTION,
      removeComments: IS_PRODUCTION,
      useShortDoctype: IS_PRODUCTION,
    },
  })
*/
);

/* To be bundled separately from other vendor JS*/
let baseVendor = [
  'react',
  'react-dom',
  '@hot-loader/react-dom',
  'react-router',
  'react-router-dom',
  'redux',
  'react-redux',
  'react-helmet',
  'firebase/app',
  'firebase/functions',
].join('|');

// Webpack config
module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  context: paths.javascript,
  watch: !IS_PRODUCTION,
  entry: {
    main: path.join(paths.javascript, 'client.js'),
  },
  output: {
    path: paths.build,
    publicPath: '/',
    filename: IS_PRODUCTION ? `[name].[contenthash:8].js` : '[name].js',
    chunkFilename: IS_PRODUCTION ? `[name].[contenthash:8].js` : '[name].js',
  },
  module: {
    rules,
  },
  plugins,
  resolve,
  stats,
  performance,
  devServer,
  optimization: {
    // Minification
    minimize: IS_PRODUCTION,
    minimizer: [
      new TerserPlugin({
        test: /\.(js|jsx)(\?.*)?$/i,
        parallel: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: true,
        },
      }),
    ],
    // Creates vendor chunk from modules coming from node_modules folder
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        base_vendor: {
          chunks: 'all',
          // test: new RegExp(`[\\/]node_modules[\\/](${baseVendor})[\\/].*`),
          test: new RegExp(`[\\/]node_modules[\\/](${baseVendor})[\\/](.*?)`),
          name: 'base_vendor',
          enforce: true,
        },
        vendor: {
          chunks: 'all',
          // Select this regex, otherwise, react-loadable and react-is are packed in vendors~main.js in mode = "development"
          test: new RegExp(`[\\/]node_modules[\\/](?!(${baseVendor})[\\/]).+`),
          /*
          test: new RegExp(
            `[\\/]node_modules[\\/](?:(?!(${baseVendor})).)(.*?)[\\/]`
          ),
        */
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
};
