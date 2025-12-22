import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import svgr from 'vite-plugin-svgr';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import tailwindcss from '@tailwindcss/vite';
import projectJson from './project.json';
export default defineConfig(({ mode }) => {
  const APP = `${import.meta.dirname}/src/app`;

  return {
    root: import.meta.dirname,
    cacheDir: `../../node_modules/.vite/apps/${projectJson.name}`,
    server: {
      port: 5173,
      host: '0.0.0.0',
    },
    preview: {
      port: 5173,
      host: '0.0.0.0',
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
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          memo: true,
          svgoConfig: {
            multipass: true,
            floatPrecision: 2,
          },
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
    build: {
      outDir: `../../dist/apps/${projectJson.name}`,
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
