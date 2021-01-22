<script lang="ts">
export let value: string
export let id: string
</script>

<div>
  <label for={id}>
    <slot />
  </label>
  <input
    {id}
    type="text"
    class="border-b-2 border-t-0 border-r-0 border-l-0 focus:ring-0 border-blue-400 dark:bg-gray-800 text-sm py-1 px-2 w-24 mx-auto text-center"
    bind:value
  />
</div>
