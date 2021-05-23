<script lang="ts">
import { createEventDispatcher, onMount } from 'svelte'
import { builtinWordLists } from '../wordlists'

export let value: string
let selectRef: HTMLSelectElement

const dispatch = createEventDispatcher()
const whichToSelect = (url: string) => {
  for (const wordList of builtinWordLists) {
    if (wordList.url === url) return url
  }
  return '$current-custom$'
}
onMount(() => {
  // Assign to value instead of binding
  // to avoid value not updated problem
  selectRef.value = whichToSelect(value)
})

const oninput = (event: Event) => {
  const selected = (event.target as HTMLInputElement).value
  let url = selected
  if (selected === '$new-custom$') url = prompt('Enter the URL', value)
  if (url && url !== value) {
    value = url
    dispatch('urlChange', value)
  }
  selectRef.value = whichToSelect(value)
}
</script>

<div class="md:col-span-2 my-1 mx-2 flex items-center">
  <label for="wordlist-url" class="mr-1">Word List URL:</label>
  <select
    id="wordlist-url"
    class="py-0 px-2 truncate min-w-0 flex-1 dark:bg-gray-800"
    bind:this={selectRef}
    on:input={oninput}
  >
    <option value="$current-custom$" disabled>{value}</option>
    {#each builtinWordLists as wordList}
      <option value={wordList.url}>{wordList.name}</option>
    {/each}
    <option value="$new-custom$">Enter URL...</option>
  </select>
</div>
