<script lang="ts">
export let min: number | string
export let max: number | string
export let step: number | string
export let value: number
export let id: string
</script>

<label for={id} class="text-gray-600">
  <slot />
</label>
<input
  {id}
  type="range"
  {step}
  {min}
  {max}
  bind:value
  on:input
  class="w-52 align-middle mx-auto"
/>
