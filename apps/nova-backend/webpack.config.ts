import { NxAppWebpackPlugin } from '@nx/webpack/app-plugin';
import { join } from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
const nodeExternals = require('webpack-node-externals');

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  output: {
    path: join(__dirname, '../../dist/apps/nova-backend'),
    filename: 'main.js',
    clean: true,
  },

  entry: isDevelopment
    ? ['webpack/hot/poll?100', './src/main.ts']
    : './src/main.ts',

  target: 'node',

  externals: isDevelopment
    ? [
        nodeExternals({
          allowlist: ['webpack/hot/poll?100'],
        }),
      ]
    : [],

  plugins: [
    new NxAppWebpackPlugin({
      useTsconfigPaths: true,
      target: 'node',
      compiler: 'swc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),

    ...(isDevelopment ? [new HotModuleReplacementPlugin()] : []),
  ],

  ...(isDevelopment && {
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
  }),
};

export default config;
