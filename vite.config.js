import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['eur-africa-192x192.png', 'eur-africa-512x512.png', 'logo.png'],
      manifest: {
        name: 'Ecogov/Eur-Africa',
        short_name: 'Eur-Africa',
        description: 'Eur-Africa Research Associates Ltd',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'eur-africa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'eur-africa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
