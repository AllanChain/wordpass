<script>
import WordPass from './components/WordPass.svelte'
import { theme } from './store'
</script>

<svelte:head>
  <meta name="theme-color" content={$theme === 'dark' ? '#374151' : '#f9fafb'} />
</svelte:head>

<main class="px-3 mx-auto text-center">
  <WordPass />
</main>

<style>
main {
  max-width: 600px;
}
</style>
