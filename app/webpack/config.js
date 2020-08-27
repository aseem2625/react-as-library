const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const paths = {
  node_modules: path.join(__dirname, '../node_modules'),
  source: path.join(__dirname, '../src'),
  assets: path.join(__dirname, '../src/assets/'),
  css: path.join(__dirname, '../src/css/'),
  fonts: path.join(__dirname, '../src/assets/fonts/'),
  images: path.join(__dirname, '../src/assets/img'),
  javascript: path.join(__dirname, '../src/js'),
  svg: path.join(__dirname, '../src/assets/svg'),
  build: path.join(__dirname, '../../public'),
};

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

const ENV_CONFIG = require('dotenv').config({
  path: path.resolve(__dirname, `../environment/.env.${NODE_ENV}`)
});


// ----------
// PLUGINS
// ----------

// Shared plugins
const plugins = [
  // Injects env variables to our app
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
    'ENV': JSON.stringify(ENV_CONFIG.parsed || {})
  }),
];

if (IS_DEVELOPMENT) {
  // Shared development plugins
  plugins.push(
    // Enables pretty names instead of index
    new webpack.NamedModulesPlugin()
  );
} else {
  plugins.push(
    // Hashes are based on the relative path of the module
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
    })
  );
}

// ----------
// RULES
// ----------

// Shared rules
const rules = [
  // Babel loader
  {
    test: /\.(js|jsx)$/,
    // exclude: /node_modules\/(?!npm_module_name_to_exclude)/,
    include: [paths.source],
    use: ['babel-loader', 'class-to-classname'],
  },
  // SVG are imported as react components
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                removeTitle: true,
              },
            ],
            floatPrecision: 3,
          },
        },
      },
    ],
    include: paths.svg,
  },
  // Images
  {
    test: /\.(png|gif|jpg|jpeg|svg|webp)$/,
    include: paths.images,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: IS_PRODUCTION
            ? 'assets/[name].[hash:8].[ext]'
            : 'assets/[name].[ext]',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          disable: IS_DEVELOPMENT,
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          /*
          // the webp option will enable WEBP
          webp: {
            quality: 75
          }
*/
        },
      },
    ],
  },
  // Fonts
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    include: paths.fonts,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: IS_PRODUCTION
            ? 'fonts/[name].[hash:8].[ext]'
            : 'fonts/[name].[ext]',
        },
      },
    ],
  },
];

rules.push({
  test: /\.(styl|css)$/,
  use: [
    {
      loader: IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: !IS_PRODUCTION,
      },
    },
    {
      loader: 'postcss-loader',
      /*
       * On any request to server, extra unnecessary request tries to resolve for /src/css/index.css.map if source-map is enabled
       * for both postcss-loader and stylus-loader.
       * */
      // options: { sourceMap: !IS_PRODUCTION }
    },
    {
      loader: 'stylus-loader',
      options: { sourceMap: !IS_PRODUCTION },
    },
  ],
});

// ----------
// RESOLVE
// ----------

const resolve = {
  extensions: [
    '.webpack-loader.js',
    '.web-loader.js',
    '.loader.js',
    '.js',
    '.jsx',
    '.styl',
    '.css',
  ],
  modules: [
    'node_modules',
    paths.source,
    paths.javascript,
    paths.assets,
    paths.css,
  ],
  plugins: [
    new DirectoryNamedWebpackPlugin({
      honorIndex: true,
      exclude: /node_modules/,
    }),
  ],
  alias: {
    'react-dom': '@hot-loader/react-dom',
  },
};

// ----------
// CLI STATS
// ----------

const stats = {
  colors: true,
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
};

const performance = {
  hints: 'warning', // "error" or false are valid too
  maxEntrypointSize: 200 * 1024, // in bytes, default 250k
  maxAssetSize: 200 * 1024, // in bytes
  assetFilter: function (assetFilename) {
    return IS_PRODUCTION;
  },
};

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  paths,
  plugins,
  resolve,
  rules,
  stats,
  performance,
};
