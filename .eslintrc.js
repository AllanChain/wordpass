module.exports = {
  parser: '@typescript-eslint/parser',
  extends: 'standard',
  env: { browser: true },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'svelte3',
    '@typescript-eslint'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    // sveltejs/eslint-plugin-svelte3#82
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2 }],
    'import/first': 'off'
  },
  settings: {
    'svelte3/typescript': true,
    'svelte3/ignore-styles': ({ lang }) => lang === 'postcss'
  }
}
