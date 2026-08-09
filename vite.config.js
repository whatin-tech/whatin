import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'pages/admin.html',
        placement: 'pages/placement.html',
      },
      external: [
        'js/script.js?v=3.0',
        'animations/animations.js',
        'react/app.jsx'
      ]
    }
  }
});
