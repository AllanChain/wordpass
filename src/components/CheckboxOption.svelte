<script lang="ts">
export let checked: boolean
export let id: string
</script>

<div class="align-middle" {...$$restProps}>
  <div>
    <input
      {id}
      type="checkbox"
      class="form-checkbox h-5 w-5 text-green-600 focus:ring-0"
      bind:checked
      on:input
    />
    <label for={id} class="ml-2 text-gray-600">
      <slot />
    </label>
  </div>
</div>
