<template>
  <div
    data-simplebar
  >
    <div class="simplebar-wrapper">
        <div class="simplebar-height-auto-observer-wrapper">
          <div class="simplebar-height-auto-observer" />
        </div>
        <div class="simplebar-mask">
          <div class="simplebar-offset">
            <div class="simplebar-content">
              <div class="simplebar-resize-wrapper">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
        <div class="simplebar-placeholder" />
      </div>
      <div class="simplebar-track simplebar-horizontal">
        <div class="simplebar-scrollbar" />
      </div>
      <div class="simplebar-track simplebar-vertical">
        <div class="simplebar-scrollbar" />
      </div>
  </div>
</template>

<script>
import 'simplebar';
export default {
  name: 'simplebar-vue'
}
</script>
