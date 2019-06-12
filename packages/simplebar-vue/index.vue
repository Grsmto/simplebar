<template>
  <div
    ref="element"
  >
    <div class="simplebar-wrapper">
        <div class="simplebar-height-auto-observer-wrapper">
          <div class="simplebar-height-auto-observer" />
        </div>
        <div class="simplebar-mask">
          <div class="simplebar-offset">
            <div class="simplebar-content-wrapper">
              <div class="simplebar-content">
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
  data () {
    return {
      instance: null
    }
  },
  mounted () {
    const options = SimpleBar.getElOptions(this.$refs.element)
    this.instance = new SimpleBar(this.$refs.element, options)
  },
  methods: {
    getScrollElement () {
      return this.instance.getScrollElement()
    },
    getContentElement () {
      return this.instance.getContentElement()
    },
    recalculate () {
      return this.instance.recalculate()
    }
  },
  computed: {
    SimpleBar () {
      return this.instance
    }
  }
}
</script>
