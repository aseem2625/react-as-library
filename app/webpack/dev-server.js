/*
const { IS_PRODUCTION, paths, stats } = require('./config');

const devServer = {
  contentBase: IS_PRODUCTION ? paths.build : paths.source,
  historyApiFallback: true,
  compress: IS_PRODUCTION,
  inline: !IS_PRODUCTION, // Change to false for IE10 dev mode
  hot: !IS_PRODUCTION,
  host: '0.0.0.0',
  disableHostCheck: true, // To enable local network testing
  overlay: true,
  stats,
  port: 7000,
};

module.exports = {
  devServer,
};
*/

const { IS_PRODUCTION, paths, stats } = require('./config');

const devServer = {
  contentBase: IS_PRODUCTION ? paths.build : [paths.build, paths.source],
  compress: IS_PRODUCTION,
  inline: !IS_PRODUCTION, // Change to false for IE10 dev mode
  hot: !IS_PRODUCTION,
  host: '0.0.0.0',
  disableHostCheck: true, // To enable local network testing
  overlay: true,
  stats,
  port: 7000,
};

module.exports = {
  devServer,
};