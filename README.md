#Trackpad Scroll Emulator

A jQuery plugin that emulates OS X Lion trackpad-style scrollbars in any browser or platform. Based on the scrollbars in the Rdio app.

1. [What it does](#1-what-it-does)
2. [Dependencies](#2-dependencies)
3. [Usage](#3-usage)
4. [How it works](#4-how-it-works)
5. [Limitations](#5-limitations)
6. [Credits](#6-credits)

##1. What it does

Traditionally scrollbars are permanently displayed whenever an area of a webpage is scrollable. By contrast, scrollbars in OSX Lion are hidden from sight, and revealed only when the user executes a swipe gesture with a 'magic' trackpad pointing device.

This plugin emulates Lion's UI pattern by replacing the browser's default scrollbars with a custom CSS-styled scrollbar that is only revealed when the user hovers over a scrollable element.

Modern browsers get a very accurate emulation of Lion's scrollbars, while less capable browsers miss out on a few bells and whistles such as rounded corners, opacity, and animated fades.

View a demo: http://jnicol.github.io/trackpad-scroll-emulator/

##2. Dependencies

Trackpad Scroll Emulator has the following dependencies:

- jQuery

##3. Usage

Include jQuery and Trackpad Scroll Emulator in your document. The paths and filenames may differ from those shown here:

    <link rel="stylesheet" href="css/trackpad-scroll-emulator.css" />
    <script src="js/jquery-1.7.1.min.js"></script>
    <script src="js/jquery.trackpad-scroll-emulator-1.0.min.js"></script>

Mark up the content you wish to scroll like so:

    <div class="tse-scrollable wrapper">
      <div class="tse-content">
        My content
      </div>
    </div>

For horizontal scrolling add the class `horizontal` to the `tse-content` element:

    <div class="tse-scrollable wrapper">
      <div class="tse-content horizontal">
        My content
      </div>
    </div>

In the above examples the `wrapper` class is not required, but gives us a unique hook to use as a jQuery selector when initializing the plugin:

    $('.wrapper').TrackpadScrollEmulator();

###Options

Options can be applied to the plugin during initialization:

    $('.wrapper').TrackpadScrollEmulator({
      option1: value1,
      option2: value2
    });

Available options are:

####wrapContent

By default TrackpadScrollEmulator requires minimal markup, as shown above. When initialized it will wrap the `tse-content`element in a div with the class `tse-scroll-content`. If you prefer to include this wrapper element directly in your markup you can switch the default behaviour off by setting the `wrapContent` option to `false`:

    $('.wrapper').TrackpadScrollEmulator({ wrapContent: false });

Default value is `true`

####autoHide

By default TrackpadScrollEmulator automatically hides the scrollbar if the user is not scrolling. You can make the scrollbar always visible by setting the `autoHide` option to `false`:

    $('.wrapper').TrackpadScrollEmulator({ autoHide: false });

Default value is `true`

###Notifying the plugin of content changes

If you later dynamically modify your content, for instance changing its height or width, or adding or removing content, you should recalculate the scrollbars like so:

    $('.wrapper').TrackpadScrollEmulator('recalculate');

###Destroying the plugin

To remove the plugin from your element, call its `destroy` method:

    $('.wrapper').TrackpadScrollEmulator('destroy');

###Overwriting the content dimensions

The dimensions of the `tse-scrollable` wrapping element determine the visible dimensions of your content. Chances are that you'll want to change the width or height of the wrapping element, which can be done using CSS or JavaScript:

    .wrapper {
      width: 250px; /* Example of overwiting default width */
    }

The demo bundled with Trackpad Scroll Emulator demonstrates how you might dynamically alter the dimensions of `tse-scrollable` using JavaScript.

###Non-JS fallback

Trackpad Scroll Emulator hides the browser's default scrollbars, which obviously is undesirable if the user has JavaScript disabled. To restore the browser's scrollbars you can include the following `noscript` element in your document's `head`:

    <noscript>
      <style>
        .tse-scrollable {
          overflow-y: scroll;
        }
        .tse-scrollable.horizontal {
          overflow-x: scroll;
          overflow-y: hidden;
        }
      </style>
    </noscript>

##4. How it works

For the most part Trackpad Scroll Emulator uses the browser's native scrolling functionality, but replaces the conventional scrollbar with a custom CSS-styled scrollbar. The plugin listens for scroll events and redraws the custom scrollbar accordingly.

Key to this technique is hiding the native browser scrollbar. In modern browsers (i.e. WebKit) this is achieved simply by giving the scrollbar a width/height of zero using the `::webkit-scrollbar` and `::scrollbar`pseudo selectors. In other browsers the scrollable element is made slightly wider/taller than its containing element, effectively hiding the scrollbar from view.

##5. Limitations

Trackpad Scroll Emulator can currently handle vertical or horizontal scrollbars, but not both simultaneously.

##6. Credits

Obviously most of the credit for this technique goes to Rdio's developers. Rdio is a Backbone application, so their solution is a combination of Backbone, Underscore, jQuery, CSS and Bujagali (their own templating system). What I have done is to recreate the same scrolling functionality using only jQuery and CSS.

Credit is also due to Jonathan Sharp, who wrote the original function for measuring the width of the browser's scrollbar (http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php).

###Additional contributors

Yoh Suzuki: wrapContent option

Adrien Grsmto: autoHide option

David Orr: jumpScroll method