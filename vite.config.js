import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      manifest: {
        name: 'wordpass',
        short_name: 'wordpass',
        description: 'A words-based password generator'
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
            const baseUrl = process.env.BASE_URL || ''
            return code
              .replace(
                '/manifest.webmanifest',
                baseUrl + '/manifest.webmanifest'
              )
              .replace('/sw.js', baseUrl + '/sw.js')
          }
        }
      ]
    }
  ]
}
