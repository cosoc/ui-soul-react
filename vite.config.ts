/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dts from "vite-plugin-dts";
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      libInjectCss(),
      dts({
         outDir: 'dis',
         entryRoot: 'src',
      }),
    viteStaticCopy({
      targets: [
        { src: 'package.json', dest: '' },
      ],
    })
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src'),
    }
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
    proxy: {

    }
  },
  build: {
    outDir: 'dis',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'UISoul4React',
      fileName: 'ui-soul-react',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom','react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  }
})
