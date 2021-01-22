const production = process.env.NODE_ENV === 'production'

module.exports = {
  future: {
    // for tailwind 2.0 compat
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  plugins: [
    // for tailwind UI users only
    // require('@tailwindcss/ui')
    require('@tailwindcss/forms')
    // other plugins here
  ],
  purge: {
    content: [
      './src/**/*.svelte'
      // may also want to include base index.html
    ],
    enabled: production // disable purge in dev
  }
}
