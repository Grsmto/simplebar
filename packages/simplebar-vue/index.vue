<template>
  <div
    data-simplebar
  >
    <div class="simplebar-scroll-content">
      <div class="simplebar-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import 'simplebar';
export default {
  name: 'simplebar-vue'
}
</script>