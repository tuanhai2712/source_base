const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.paths.json');
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#DCF537', '@text-color': '#FCFCFD', '@border-radius-base': '8px' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
      }),
    },
  },
};
