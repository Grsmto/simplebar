<template>
  <div ref="element">
    <div class="simplebar-wrapper">
      <div class="simplebar-height-auto-observer-wrapper">
        <div class="simplebar-height-auto-observer" />
      </div>
      <div class="simplebar-mask">
        <div class="simplebar-offset">
          <div class="simplebar-content-wrapper" ref="scrollElement">
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
import SimpleBar from 'simplebar-core';

/* Deprecated
 * Hardcode this here until we can safely deprecated it.
 * Helper function to retrieve options from element attributes
 */
const getOptions = function (obj) {
  const options = Array.prototype.reduce.call(
    obj,
    (acc, attribute) => {
      const option = attribute.name.match(/data-simplebar-(.+)/);
      if (option) {
        const key = option[1].replace(/\W+(.)/g, (x, chr) => chr.toUpperCase());
        switch (attribute.value) {
          case 'true':
            acc[key] = true;
            break;
          case 'false':
            acc[key] = false;
            break;
          case undefined:
            acc[key] = true;
            break;
          default:
            acc[key] = attribute.value;
        }
      }
      return acc;
    },
    {}
  );
  return options;
};

export default {
  name: 'simplebar-vue',
  props: Object.keys(SimpleBar.defaultOptions),
  mounted() {
    const deprecatedOptions = getOptions(this.$refs.element.attributes);

    if (Object.keys(deprecatedOptions).length) {
      console.warn(`simplebar-vue: this way of passing options is deprecated. Pass it like normal props instead:
        'data-simplebar-force-visible="true"' —> 'force-visible'
      `);
    }

    this.SimpleBar = new SimpleBar(
      this.$refs.element,
      Object.assign({}, deprecatedOptions, this.props)
    );
  },
  destroyed() {
    this.SimpleBar.unMount();
    this.SimpleBar = null;
  },
  computed: {
    scrollElement() {
      return this.$refs.scrollElement;
    },
    contentElement() {
      return this.$refs.contentElement;
    },
  },
};
</script>
