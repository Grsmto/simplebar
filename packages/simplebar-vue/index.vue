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
            @scroll="$emit('scroll', $event)"
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
// @ts-check
import SimpleBar from 'simplebar';
import { lifecycleEventNames } from './utils.js'

export default {
  name: 'simplebar-vue',
  props: {
    /**
     * By default SimpleBar automatically hides the scrollbar if the user is not scrolling
     * (it emulates Mac OSX Lion's scrollbar). You can make the scrollbar always visible
     * by passing `false`.
     *
     * Default value is `true`.
     *
     * You can also control the animation via CSS as it's a simple CSS opacity transition.
     */
    autoHide: { type: Boolean, default: undefined },

    /**
     * It is possible to change the default class names that SimpleBar uses.
     * To get your own styles to work refer to simplebar.css to get an idea how to setup your css.
     * - `content` represents the wrapper for the content being scrolled.
     * - `scrollContent` represents the container containing the elements being scrolled.
     * - `scrollbar` defines the style of the scrollbar with which the user can interact to scroll the content.
     * - `track` styles the area surrounding the `scrollbar`.
     *
     * ```js
     * classNames: {
     *   // defaults
     *   content: 'simplebar-content',
     *   scrollContent: 'simplebar-scroll-content',
     *   scrollbar: 'simplebar-scrollbar',
     *   track: 'simplebar-track'
     * }
     * ```
     */
    classNames: Object,

    /**
     * Force the track to be visible (same behaviour as `overflow: scroll`).
     * Can be `boolean | 'x' | 'y'`, defaults to `false`, which behaves like `overflow: auto`.
     */
    forceVisible: {
      type: [Boolean, String],
      validator: v => typeof v === 'boolean' || v === 'x' || v === 'y',
      default: undefined
    },

    /**
     * Set custom aria-label attribute for users with screen reader.
     */
    ariaLabel: String,

    /**
     * Activate RTL support by passing `'rtl'`.
     * You will also need a css rule with `direction: rtl`.
     */
    direction: {
      type: String,
      validator: v => v === 'ltr' || v === 'rtl'
    },

    /**
     * Define the delay until the scrollbar hides. Has no effect if `autoHide` is `false`.
     * Default value is `1000`.
     */
    timeout: Number,

    /**
     * Controls the click on track behaviour.
     * Default to `true`.
     */
    clickOnTrack: { type: Boolean, default: undefined },

    /**
     * Controls the min size of the scrollbar in `px`.
     * Default is `25`.
     */
    scrollbarMinSize: Number,

    /**
     * Controls the max size of the scrollbar in `px`.
     * Default is `0` (no max size).
     */
    scrollbarMaxSize: Number
  },

  // @ts-ignore
  emits: ['scroll'],

  /**
   * @returns {{ SimpleBar?: SimpleBar; scrollElement?: HTMLDivElement; contentElement?: HTMLDivElement }}
   */
  data() { return { }; },

  mounted () {
    // @ts-ignore (`getOptions` needs to be added to the type definition file)
    const options = SimpleBar.getOptions(this.$refs.element.attributes);

    for(const [key, value] of Object.entries(this.$props))
      if(value != undefined && typeof value !== "function")
        options[key] = value;

    // @ts-ignore (unable to type cast `$el`)
    this.SimpleBar = new SimpleBar(this.$el, options);
    // @ts-ignore (unable to type cast `$refs`)
    this.scrollElement = this.$refs.scrollElement;
    // @ts-ignore (unable to type cast `$refs`)
    this.contentElement = this.$refs.contentElement;
  },
  [lifecycleEventNames.beforeUnmount]() {
    // unMount is not present in types package https://github.com/Grsmto/simplebar/blob/6125d4ac0897c02a82432441aa3bae5e6c6ccb87/packages/simplebar/src/simplebar.js#L925
    // @ts-ignore
    this.SimpleBar?.unMount()
    this.SimpleBar = null
  },
  methods: {
    recalculate () { this.SimpleBar?.recalculate(); }
  }
}
</script>
