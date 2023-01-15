// @ts-check
import SimpleBarCore from 'simplebar-core';
import { lifecycleEventNames } from './utils.js';
import { h, isVue3 } from 'vue-demi';

/**
 * This is not as easy to read than a regular <template> block, but a
 * render function is a necessary "evil" to avoid compiler output
 * differences between vue2 and vue3, which would required a
 * different cross-compatible implementation.
 *
 * IMPORTANT NOTES:
 *  - options API is required to keep backwards compatibility to vue<@2.6.
 *    only superior versions get compat with @vue/composition-api plugin.
 *  - String template refs are required for compat @vue<2.7
 *  - If refactoring to composition-api and thus dropping support to vue<@2.6
 *    do note that returning a render function from setup() hook does not
 *    in >=2.6.0 < 2.7.0 because the way @vue/composition-api handles
 *    template refs.
 *    {@link https://github.com/vuejs/composition-api#limitations}
 *
 * ALTERNATIVES:
 *  - https://github.com/vueuse/vue-demi/issues/152
 *  - https://github.com/vueuse/vue-demi/issues/153
 *  - https://github.com/vueuse/vue-demi/issues/154
 *  - {@link https://github.com/cloydlau/json-editor-vue/blob/3a6127d6587ef297f7ab60800cf78a8be5327cb7/src/Component.ts}
 *
 *
 * @todo maybe using jsx in a next version would make this a bit more readable.
 * but we need to ensure it compiles to a cross-compatible render function
 * to avoid going back to the same place where we've been with the <template>
 */
function renderFn({ h, emit, slots }) {
  const onScroll = (event) => emit('scroll', event);

  return h('div', { ref: 'element' }, [
    h('div', { class: 'simplebar-wrapper' }, [
      h('div', { class: 'simplebar-height-auto-observer-wrapper' }, [
        h('div', { class: 'simplebar-height-auto-observer' }),
      ]),
      h('div', { class: 'simplebar-mask' }, [
        h('div', { class: 'simplebar-offset' }, [
          h(
            'div',
            {
              ref: 'scrollElement',
              class: 'simplebar-content-wrapper',
              ...(isVue3 ? { onScroll } : { on: { scroll: onScroll } }),
            },
            [
              h(
                'div',
                { class: 'simplebar-content', ref: 'contentElement' },
                slots.default?.()
              ),
            ]
          ),
        ]),
      ]),
      h('div', { class: 'simplebar-placeholder' }),
    ]),
    h('div', { class: 'simplebar-track simplebar-horizontal' }, [
      h('div', { class: 'simplebar-scrollbar' }),
    ]),
    h('div', { class: 'simplebar-track simplebar-vertical' }, [
      h('div', { class: 'simplebar-scrollbar' }),
    ]),
  ]);
}

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
      validator: (v) => typeof v === 'boolean' || v === 'x' || v === 'y',
      default: undefined,
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
      validator: (v) => v === 'ltr' || v === 'rtl',
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
    scrollbarMaxSize: Number,
  },

  // @ts-ignore
  emits: ['scroll'],
  /**
   * @returns {{ SimpleBar?: SimpleBar; scrollElement?: HTMLDivElement; contentElement?: HTMLDivElement }}
   */
  data() {
    return {};
  },

  mounted() {
    // @ts-ignore (`getOptions` needs to be added to the type definition file)
    const options = SimpleBarCore.getOptions(this.$refs.element.attributes);

    for (const [key, value] of Object.entries(this.$props))
      if (value != undefined && typeof value !== 'function')
        options[key] = value;

    // @ts-ignore (unable to type cast `$refs`)
    this.SimpleBar = new SimpleBarCore(this.$refs.element, options);
    // @ts-ignore (unable to type cast `$refs`)
    this.scrollElement = this.$refs.scrollElement;
    // @ts-ignore (unable to type cast `$refs`)
    this.contentElement = this.$refs.contentElement;
  },
  [lifecycleEventNames.beforeUnmount]() {
    // unMount is not present in types package https://github.com/Grsmto/simplebar/blob/6125d4ac0897c02a82432441aa3bae5e6c6ccb87/packages/simplebar/src/simplebar.js#L925
    // @ts-ignore
    this.SimpleBar?.unMount();
    // @ts-ignore
    this.SimpleBar = undefined;
  },
  methods: {
    recalculate() {
      this.SimpleBar?.recalculate();
    },
  },
  /**
   * Note that createElement argument is only provided in <=vue@2.7.x,
   * in other versions it's a context object that we do not use.
   */
  render(createElement) {
    return renderFn({
      h: typeof createElement === 'function' ? createElement : h,
      // @ts-ignore
      emit: (...args) => this.$emit(...args),
      slots: isVue3 ? this.$slots : this.$scopedSlots,
    });
  },
};
