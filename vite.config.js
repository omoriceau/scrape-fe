import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/i18n'
    }),
    sveltekit()
  ],
  resolve: {
    alias: {
      '$paraglide': path.resolve('./src/lib/i18n')
    }
  },
  //assetsInclude: ['**/*.md'],
  optimizeDeps: {
    exclude: ['@mdsvex/mdsvex']
  }, 

  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {}
    }
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    '__API_URL__': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:3000/api')
  },

  server: {
    port: 5173,
    host: true
  },

  preview: {
    port: 4173,
    host: true
  }
});