<script lang="ts">
import { fade } from 'svelte/transition'
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
  mdiAlertOutline,
  mdiLoading,
  mdiLightningBolt
} from '@mdi/js'

let password = ''
let service = ''
let result = ''
let showingPassword = false
let currentPhraseTrace = ''
const options: WordpassAppOptions = Object.assign(
  {},
  DEFAULT_APP_OPTIONS,
  JSON.parse(localStorage.getItem('wordpassConfig') || '{}')
)
let phraseTraces: string[] = JSON.parse(
  localStorage.getItem('wordpassTraces') || '[]'
)
const startFetching = (url: string) =>
  fetch(url).then(response => response.json())
let wordsPromise = startFetching(options.wordList)
const refresh = async (words: string[]) => {
  if (options.saveConfig) {
    localStorage.setItem('wordpassConfig', JSON.stringify(options))
  }
  if (options.checkTrace) {
    // Use a constant test service
    currentPhraseTrace = await generate(password, 'WordPass', words, options)
    if (!phraseTraces.length) {
      // first ever
      localStorage.setItem(
        'wordpassTraces',
        JSON.stringify([currentPhraseTrace])
      )
      phraseTraces.push(currentPhraseTrace)
    }
  }
  result = await generate(password, service, words, options)
}
const rememberTrace = (mode: 'append' | 'overwrite') => {
  phraseTraces =
    mode === 'append' ? [...phraseTraces, currentPhraseTrace] : phraseTraces
  localStorage.setItem('wordpassTraces', JSON.stringify(phraseTraces))
}
const targetValue = (event: Event): string =>
  (event.target as HTMLInputElement).value
</script>

<div class="w-full flex my-3">
  <label for="phrase" class="combined-text-label">Phrase</label>
  <div class="flex-1 relative">
    <!-- type cannot be dynamic if input uses two-way binding -->
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
    class="flex-1 overflow-x-auto border-gray-400 dark:bg-gray-800 dark:border-gray-600 px-4 py-2 rounded-l outline-none"
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
  <!-- Do not show right or wrong if no previous to compare -->
  {#if currentPhraseTrace && phraseTraces.length && !phraseTraces.includes(currentPhraseTrace)}
    <div
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 500 }}
      class="bg-black bg-opacity-20 w-screen h-screen fixed px-3
        flex justify-center items-center inset-0 z-50 outline-none focus:outline-none"
      on:click={() => {
        currentPhraseTrace = ''
      }}
    >
      <div
        class="w-full max-w-lg p-5 mx-auto my-auto rounded-xl shadow-lg bg-gray-50 dark:bg-gray-700"
      >
        <h2 class="text-3xl text-center font-bold text-yellow-500">
          <MDIcon class="block mx-auto" size={72} path={mdiAlertOutline} />
          Caution!
        </h2>
        <p
          class="text-left text-red-600 dark:text-red-500 sm:px-1 md:px-2 py-4"
        >
          Current phrase and option are not previously known. Either of them can
          be wrong. Use the generated password with caution. Do you want to
          <b>ignore</b> this time, <b>remember</b> this phrase and option too or
          <b>overwrite</b> existing ones?
        </p>
        <div class="flex text-blue-600 dark:text-blue-400">
          <button
            class="font-bold flex-1 justify-center"
            on:click={() => {
              currentPhraseTrace = ''
            }}
          >
            Ignore
          </button>
          <button
            class="font-bold flex-1 justify-center"
            on:click={() => rememberTrace('append')}
          >
            Remember
          </button>
          <button
            class="font-bold flex-1 justify-center"
            on:click={() => rememberTrace('overwrite')}
          >
            Overwrite
          </button>
        </div>
      </div>
    </div>
  {/if}
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
