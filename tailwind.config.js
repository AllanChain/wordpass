const production = process.env.NODE_ENV === 'production'

module.exports = {
  darkMode: 'class',
  future: {
    // for tailwind 2.0 compat
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  plugins: [require('@tailwindcss/forms')],
  purge: {
    content: ['./src/**/*.svelte', './index.html'],
    enabled: production
  }
}
