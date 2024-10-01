import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      include: ['src/components']
    })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/components/index.tsx'),
      formats: ['es']
    },
    sourcemap: true,
    minify: true,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-router-dom'],
    }
  }
});
