/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dts from "vite-plugin-dts";
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      libInjectCss(),
      dts({
         outDir: 'lib',
         entryRoot: 'src',
         copyDtsFiles: true,
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
    outDir: path.resolve(__dirname, 'lib'),
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'UISoulReact',
      fileName: 'ui-soul-react',
    },
    rollupOptions: {
      external: ['react', 'react-dom','react/jsx-runtime'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].es.js',
          dir: 'lib',
          globals: {
            react: 'react',
            'react-dom': 'react-dom',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs.js',
          dir: 'lib',
          globals: {
            react: 'react',
            'react-dom': 'react-dom',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
        {
          format: 'umd',
          entryFileNames: '[name].umd.js',
          dir: 'lib',
          name: 'UISoulReact',
          globals: {
            react: 'react',
            'react-dom': 'react-dom',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
      ]
    },
  }
})
