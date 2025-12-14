/// <reference types='vitest' />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import svgr from 'vite-plugin-svgr';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import tailwindcss from '@tailwindcss/vite';

const APP = './src/app';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/nova-frontend',
  server: {
    port: 5173,
    host: 'localhost',
  },
  preview: {
    port: 5173,
    host: 'localhost',
  },
  plugins: [
    tailwindcss(),
    nxViteTsPaths(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: `${APP}/routes`,
      generatedRouteTree: `${APP}/routeTree.gen.ts`,
    }),
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
          ['babel-plugin-react-compiler'],
        ],
      },
    }),
    nxCopyAssetsPlugin(['*.md']),
  ],
  // resolve: {
  //   alias: {
  //     '@shared': path.resolve(__dirname, './src/shared'),
  //   },
  // },
  build: {
    outDir: '../../dist/apps/nova-frontend',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
