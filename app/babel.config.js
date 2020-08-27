module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        useBuiltIns: 'entry',
        corejs: 2,
      },
    ],
    '@babel/preset-react',
  ];

  const plugins = [
    'react-hot-loader/babel',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-regenerator',
    [
      '@babel/plugin-transform-runtime',
      {
        loose: true,
        corejs: 2,
        regenerator: true,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-throw-expressions',
  ];

  return {
    presets,
    plugins,
  };
};
