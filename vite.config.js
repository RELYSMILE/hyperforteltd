import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo_192x192.png', 'logo_512x512.png', 'logo.png'],
      manifest: {
        name: 'hyperfortel',
        short_name: 'hyperfortel',
        description: 'Hyperforte | Customized Solutions for Seamless Operations',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'logo_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
