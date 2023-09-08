import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: { enabled: true },
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'SimpleScale',
        short_name: 'SimpleScale',
        description: 'Keep track of your weight journey',
        theme_color: '#FDB750',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon.ico',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
