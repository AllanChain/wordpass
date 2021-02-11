import { VitePWA } from 'vite-plugin-pwa'

const resolveBase = path => (process.env.BASE_URL || '') + path

export default {
  plugins: [
    VitePWA({
      manifest: {
        name: 'wordpass',
        short_name: 'wordpass',
        description: 'A words-based password generator',
        start_url: resolveBase('/'),
        theme_color: '#374151',
        icons: [
          {
            src: resolveBase('/icon.png'),
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
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
    }),
    {
      name: 'patch-pwa-base',
      indexHtmlTransforms: [
        {
          apply: 'post',
          transform({ code, isBuild }) {
            if (!isBuild) return code
            return code
              .replace(
                '/manifest.webmanifest',
                resolveBase('/manifest.webmanifest')
              )
              .replace('/sw.js', resolveBase('/sw.js'))
          }
        }
      ]
    }
  ]
}
