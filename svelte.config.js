const sveltePreprocess = require('svelte-preprocess')
const { markdown } = require('svelte-preprocess-markdown')

module.exports = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    sveltePreprocess({
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          require('postcss-nesting')
        ]
      }
    }),
    markdown({
      headerIds: true
    })
  ]
}
