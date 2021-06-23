<script lang="ts">
export let path: string
export let size = 24
</script>

<svg
  {...$$restProps}
  style="width:{size}px;height:{size}px"
  viewBox="0 0 {size} {size}"
>
  <path class="fill-current" style={`transform: scale(${size / 24});`} d={path} />
</svg>
