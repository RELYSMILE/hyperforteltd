import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite-192.png', 'vite-192.png'],
      manifest: {
        name: 'My Cool App',
        short_name: 'CoolApp',
        description: 'My Vite PWA app',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'vite-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'vite-192.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
