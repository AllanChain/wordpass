<script lang="ts">
import { generate } from '../generator'
import { DEFAULT_APP_OPTIONS } from '../app-options'
import type { WordpassAppOptions } from '../app-options'
import MDIcon from './MDIcon.svelte'
import OptionsBuilder from './OptionsBuilder.svelte'
import Expander from './Expander.svelte'
import ReadMe from '../../README.md'

import {
  mdiEyeOffOutline,
  mdiEyeOutline,
  mdiAlert,
  mdiLoading,
  mdiLightningBolt
} from '@mdi/js'

let password = ''
let service = ''
let result = ''
let showingPassword = false
const options: WordpassAppOptions = Object.assign(
  {},
  DEFAULT_APP_OPTIONS,
  JSON.parse(localStorage.getItem('wordpassConfig') || '{}')
)
const startFetching = (url: string) =>
  fetch(url).then(response => response.json())
let wordsPromise = startFetching(options.wordList)
const refresh = async (words: string[]) => {
  if (options.saveConfig)
    localStorage.setItem('wordpassConfig', JSON.stringify(options))
  result = await generate(password, service, words, options)
}
const targetValue = (event: Event): string =>
  (event.target as HTMLInputElement).value
</script>

<div class="w-full flex my-3">
  <label for="phrase" class="combined-text-label">Phrase</label>
  <div class="flex-1 relative">
    <input
      id="phrase"
      class="pr-10 combined-text-input"
      on:input={event => {
        password = targetValue(event)
      }}
      type={showingPassword ? 'text' : 'password'}
      placeholder="Your Meta Password"
      value={password}
    />
    <span
      class="text-gray-600 dark:text-gray-300 absolute top-0 right-0 py-2 px-3"
      on:click={() => {
        showingPassword = !showingPassword
      }}
    >
      <MDIcon path={showingPassword ? mdiEyeOutline : mdiEyeOffOutline} />
    </span>
  </div>
</div>

<div class="w-full flex my-3">
  <label for="service" class="combined-text-label">Service</label>
  <div class="flex-1">
    <input
      type="text"
      id="service"
      class="combined-text-input"
      placeholder="Service Name"
      bind:value={service}
    />
  </div>
</div>

<div class="w-full flex my-3">
  <input
    type="text"
    class="flex-1 border-gray-400 dark:bg-gray-800 dark:border-gray-600 px-4 py-2 rounded-l outline-none"
    placeholder="Generated Password"
    aria-label="Generated Password"
    value={result}
    disabled
  />
  <button
    class="bg-green-600  text-gray-100 hover:bg-green-500 flex items-center px-4 py-2 rounded-r"
    on:click={() => navigator.clipboard.writeText(result)}
  >
    Copy
  </button>
</div>

{#await wordsPromise}
  <button
    class="bg-gray-500 text-gray-100 rounded pl-2 pr-4 py-2 focus:outline-none"
    disabled
  >
    <MDIcon class="inline-block animate-spin" path={mdiLoading} />Loading
  </button>
{:then words}
  <button
    class="bg-green-600 text-gray-100 rounded hover:bg-green-500 pl-2 pr-4 py-2 focus:outline-none"
    on:click={() => refresh(words)}
  >
    <MDIcon class="inline-block" path={mdiLightningBolt} />
    Genetate
  </button>
{:catch}
  <button
    class="bg-red-500 text-red-100 rounded pl-2 pr-4 py-2 focus:outline-none"
    disabled
  >
    <MDIcon class="inline-block" path={mdiAlert} />
    Error
  </button>
{/await}

<Expander id="advanced-options">
  <span slot="title">Show Advanced Options</span>
  <OptionsBuilder
    {options}
    on:urlChange={() => {
      console.log(options.wordList)
      wordsPromise = startFetching(options.wordList)
    }}
  />
</Expander>

<Expander id="readme">
  <span slot="title">
    Show <a
      href="https://github.com/AllanChain/wordpass#readme"
      class="text-blue-600"
    >
      Documentation
    </a>
  </span>
  <div class="markdown"><ReadMe /></div>
</Expander>

<style lang="postcss" global>
.combined-text-label {
  @apply bg-gray-100 flex items-center px-4 py-2 border border-r-0 rounded-l text-sm font-medium text-gray-800 select-none dark:text-gray-100 dark:bg-gray-500 dark:border-gray-600;
}
.combined-text-input {
  @apply w-full border-gray-400 px-4 py-2 rounded-r focus:border-blue-500 focus:ring-1 outline-none dark:bg-gray-800 dark:border-gray-600;
}

</style>
