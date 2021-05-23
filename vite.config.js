import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svelte from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      manifest: {
        name: 'wordpass',
        short_name: 'wordpass',
        description: 'A words-based password generator',
        start_url: '/',
        theme_color: '#374151',
        icons: [
          {
            src: '/icon-512x512-maskable.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
          },
          {
            src: '/icon-512x512-any.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any'
          },
          {
            src: '/icon-144x144-any.png',
            type: 'image/png',
            sizes: '144x144',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        sourcemap: false,
        runtimeCaching: [
          {
            urlPattern: /.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'wordpass lists',
              networkTimeoutSeconds: 2,
              expiration: {
                maxEntries: 10
              }
            }
          }
        ]
      }
    })
  ]
})
