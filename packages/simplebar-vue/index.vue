<template>
  <div ref="element">
    <div class="simplebar-wrapper">
      <div class="simplebar-height-auto-observer-wrapper">
        <div class="simplebar-height-auto-observer" />
      </div>
      <div class="simplebar-mask">
        <div class="simplebar-offset">
          <div
            class="simplebar-content-wrapper"
            ref="scrollElement"
            v-on="{
              ...($listeners.scroll && {
                scroll: $listeners.scroll,
              })
            }"
          >
            <div class="simplebar-content" ref="contentElement">
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
import SimpleBar from 'simplebar';

export default {
  name: 'simplebar-vue',
  mounted () {
    const options = SimpleBar.getOptions(this.$refs.element.attributes);
    this.SimpleBar = new SimpleBar(this.$refs.element, options);
  },
  computed: {
    scrollElement () {
      return this.$refs.scrollElement;
    },
    contentElement () {
      return this.$refs.contentElement;
    }
  }
}
</script>
