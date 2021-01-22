<script lang="ts">
import CheckboxOption from './CheckboxOption.svelte'

export let id: string
let showingDetail = false
let optionsDivHeight: number
</script>

<CheckboxOption {id} class="mt-3" bind:checked={showingDetail}>
  <slot name="title" />
</CheckboxOption>
<div
  class="my-2 overflow-hidden transition-all ease-in-out duration-1000"
  style="max-height: {showingDetail ? optionsDivHeight + 40 : 0}px"
>
  <div
    bind:offsetHeight={optionsDivHeight}
    class="my-3 p-2 rounded border-dashed border-2 border-blue-300"
  >
    <slot />
  </div>
</div>
