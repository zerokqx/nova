const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/nova-backend'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  externals: {
    '@prisma/client/runtime/library':
      'commonjs2 @prisma/client/runtime/library',
  },
  // resolve: {
  //   alias: {
  //     '@ormClient': join(__dirname, 'src/generated/prisma/client.ts'),
  //     '@prisma/client': join(__dirname, 'src/generated/prisma'),
  //   },
  // },
  resolve: {
    // ← КРИТИЧНО: добавляем плагин для TypeScript paths
    plugins: [],
    // ← ВАЖНО: полностью отключаем ESM strict mode для алиасов
    fullySpecified: false,
  },
  plugins: [
    new TsconfigPathsPlugin({
      configFile: join(__dirname, 'tsconfig.app.json'),
      extensions: ['.ts', '.js'], // ← ESM расширения
    }),
    new NxAppWebpackPlugin({
      useTsconfigPaths: true,
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
};
