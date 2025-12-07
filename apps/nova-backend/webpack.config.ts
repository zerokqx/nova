import { NxAppWebpackPlugin } from '@nx/webpack/app-plugin';
import { HotModuleReplacementPlugin, WatchIgnorePlugin } from 'webpack';
// Используйте 'run-script-webpack-plugin' вместо RunScriptWebpackPlugin из импорта,
// если он установлен как зависимость, или убедитесь, что импорт правильный.
import { RunScriptWebpackPlugin } from 'run-script-webpack-plugin';
import { join } from 'path';

// Определяем, находимся ли мы в режиме разработки (HMR обычно для разработки)
const isDevelopment = process.env.NODE_ENV !== 'production';

export default {
  output: {
    path: join(__dirname, '../../dist/apps/nova-backend'),
    clean: true,
    ...(isDevelopment && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },

  // Добавляем точку входа для HMR только в режиме разработки
  entry: isDevelopment
    ? ['webpack/hot/poll?100', './src/main.ts']
    : './src/main.ts',

  plugins: [
    new NxAppWebpackPlugin({
      // Опции NxAppWebpackPlugin остаются прежними,
      // но убедитесь, что 'main' здесь не конфликтует с entry выше
      useTsconfigPaths: true,
      watch: true,
      target: 'node',
      compiler: 'swc',
      main: './src/main.ts', // Webpack объединит это с entry выше
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),

    // Добавляем плагины HMR только в режиме разработки
    ...(isDevelopment
      ? [
          new HotModuleReplacementPlugin(),
          // Этот плагин помогает автоматически перезапускать Node.js при HMR
          new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: false }),
        ]
      : []),
  ],

  // При использовании HMR на бэкенде, нужно явно указать externals
  externals: isDevelopment
    ? [
        require('webpack-node-externals')({
          allowlist: ['webpack/hot/poll?100'],
        }),
      ]
    : [],
};
