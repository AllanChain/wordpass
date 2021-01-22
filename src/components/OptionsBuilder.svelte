<script lang="ts">
import CheckboxOption from './CheckboxOption.svelte'
import SliderOption from './SliderOption.svelte'
import type { WordpassAppOptions } from '../app-options'
import TextOption from './TextOption.svelte'
import UrlPrompt from './URLPrompt.svelte'
import { theme } from '../store'

export let options: WordpassAppOptions

const getLog2 = (y: number) => Math.round(Math.log(y) / Math.log(2))
const targetValueNumber = (event: Event): number =>
  parseInt((event.target as HTMLInputElement).value)
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-gray-600 dark:text-gray-200">
  <CheckboxOption id="capitailze" bind:checked={options.capitalize}>
    Capitalize
  </CheckboxOption>
  <CheckboxOption id="save-config" bind:checked={options.saveConfig}>
    Save This Config
  </CheckboxOption>
  <CheckboxOption id="append-number" bind:checked={options.appendNumber}>
    Append Number
  </CheckboxOption>
  <CheckboxOption id="append-symbol" bind:checked={options.appendSymbol}>
    Append Symbol
  </CheckboxOption>
  <CheckboxOption
    id="random-separator"
    checked={options.separator === '$random$'}
    on:input={() => {
      options.separator = '$random$'
    }}>Random Separator</CheckboxOption
  >
  <CheckboxOption
    id="theme"
    checked={$theme === 'dark'}
    on:input={theme.toggle}
  >
    Dark Theme
  </CheckboxOption>
  <TextOption id="salt-prefix" bind:value={options.saltPrefix}>
    Salt Prefix:
  </TextOption>
  <TextOption id="separator" bind:value={options.separator}>
    Separator:
  </TextOption>
  <SliderOption
    id="strength"
    step="1"
    min="2"
    max="7"
    bind:value={options.strength}
  >
    Strength:
    {options.strength}
  </SliderOption>
  <SliderOption
    id="N"
    step="1"
    min="4"
    max={24 - getLog2(options.r)}
    value={getLog2(options.N)}
    on:input={event => {
      options.N = Math.pow(2, targetValueNumber(event))
    }}
  >
    <code>costParameter (N):</code><br />
    {options.N}
    = 2<sup>{getLog2(options.N)}</sup>
  </SliderOption>
  <SliderOption id="r" step="1" min="4" max="32" bind:value={options.r}>
    <code>blockSize (r):</code>
    {options.r}
  </SliderOption>
  <SliderOption id="p" step="1" min="1" max="8" bind:value={options.p}>
    <code>parallelization (p):</code>
    {options.p}
  </SliderOption>
</div>
<UrlPrompt bind:value={options.wordList} on:urlChange />
<p class="text-sm text-left mt-3">
  Reference:
  <a
    class="text-blue-600"
    href="https://tools.ietf.org/html/rfc7914"
    target="_blank"
    rel="noopener noreferrer"
  >
    RFC 7914
  </a>
</p>
