import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pinet.png', 'pinet.png', 'pinet.png'],
      manifest: {
        name: 'Stake Pi',
        short_name: 'StakePi',
        description: 'Stake and Unlock PI',
        theme_color: '#fffff',
        background_color: '#fffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pinet.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pinet.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
