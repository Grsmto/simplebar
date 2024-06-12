declare module 'simplebar-vue' {
  import { DefineComponent } from 'vue';
  import SimpleBar from 'simplebar';

  export type SimpleBarComponent = DefineComponent<{ // Props

    /**
     * By default SimpleBar automatically hides the scrollbar if the user is not scrolling
     * (it emulates Mac OSX Lion's scrollbar). You can make the scrollbar always visible
     * by passing `false`.
     *
     * Default value is `true`.
     *
     * You can also control the animation via CSS as it's a simple CSS opacity transition.
     */
     autoHide?: boolean;

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
     classNames?: Partial<{ content: string; scrollContent: string; scrollbar: string; track: string }>;

     /**
      * Force the track to be visible (same behaviour as `overflow: scroll`).
      * Can be `boolean | 'x' | 'y'`, defaults to `false`, which behaves like `overflow: auto`.
      */
     forceVisible?: boolean | 'x' | 'y';

     /**
      * Set custom aria-label attribute for users with screen reader.
      */
     ariaLabel?: string;

      /**
      * Set custom tabIndex attribute.
      */
      tabIndex?: number;

     /**
      * Activate RTL support by passing `'rtl'`.
      * You will also need a css rule with `direction: rtl`.
      */
     direction?: 'ltr' | 'rtl';

     /**
      * Define the delay until the scrollbar hides. Has no effect if `autoHide` is `false`.
      * Default value is `1000`.
      */
     timeout?: number;

     /**
      * Controls the click on track behaviour.
      * Default to `true`.
      */
     clickOnTrack?: boolean;

     /**
      * Controls the min size of the scrollbar in `px`.
      * Default is `25`.
      */
     scrollbarMinSize?: number;

     /**
      * Controls the max size of the scrollbar in `px`.
      * Default is `0` (no max size).
      */
     scrollbarMaxSize?: number;
  },
  { }, // RawBindings
  { // Data
    SimpleBar: SimpleBar;
    contentElement: HTMLDivElement;
    scrollElement: HTMLDivElement;
  },
  { }, // Computed
  { // Methods
    recalculate (): void;
  },
  { }, // Mixins
  { }, // Extends
  { // Emits
    scroll: ($event: Event & { target: HTMLElement }) => void
  }>;

  const Component: SimpleBarComponent;
  export default Component;
}
