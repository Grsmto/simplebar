# TrackpadScrollEmulator

A jQuery plugin that emulates OSX Lion trackpad-style scrollbars in any browser or platform. Based on the scrollbars in the Rdio app.

1. [What it does](#1-what-it-does)
2. [Dependencies](#2-dependencies)
3. [Usage](#3-usage)
4. [How it works](#4-how-it-works)
5. [When to use it](#5-when-to-use-it)
6. [Limitations](#6-limitations)
7. [Credits](#7-credits)

## 1. What it does

Traditionally scrollbars are permanently displayed whenever an area of a webpage is scrollable. By contrast, scrollbars in OSX Lion are hidden from sight, and revealed only when the user executes a swipe gesture with a 'magic' trackpad pointing device.

This plugin emulates Lion's UI pattern by replacing the browser's default scrollbars with a custom CSS-styled scrollbar that is only revealed when the user hovers over a scrollable element.

Modern browsers get a very accurate emulation of Lion's scrollbars, while less capable browsers miss out on a few bells and whistles such as rounded corners, opacity, and animated fades.

## 2. Dependencies

TrackpadScrollEmulator has the following dependencies:

- jQuery

## 3. Usage

Include jQuery, the TrackpadScrollEmulator JS and CSS in your document. The paths and filenames may be different from those shown here:

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

    $('wrapper').TrackpadScrollEmulator();

If you later dynamically modify your content, for instance changing its height or width, or adding or removing content, you should recalculate the scrollbars like so:

    $('wrapper').TrackpadScrollEmulator('recalculate');

To remove the plugin from your element, call its `destroy` method:

    $('wrapper').TrackpadScrollEmulator('destroy');

The dimensions of the `tse-scrollable` wrapping element determine the visible dimensions of your content. Chances are that you'll want to change the width or height of the wrapping element, which can be done using CSS or JavaScript:

    .wrapper {
      width: 250px; /* Example of overwiting default width */
    }

The demo bundled with TrackpadScrollEmulator demonstrates how you might dynamically alter the dimensions of `tse-scrollable` using JavaScript.

### Non-JS fallback

TrackpadScrollEmulator hides the browser's default scrollbars, which obviously is undesirable if the user has JavaScript disabled. To restore the browser's scrollbars you can include the following `noscript` element in your document's `head`:

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

## 4. How it works

TrackpadScrollEmulator actually still uses the native browser scrollbar to scroll content, but hides the conventional scrollbar from the user and replaces it with a custom CSS-styled scrollbar. The plugin listens for scroll events and redraws the custom scrollbar accordingly.

Whether scrolling using a trackpad or mousewheel the experience is identical to the browser's native behaviour. OSX users still get intertial scrolling when they perform a trackpad swipe, without any additional calculation required on the plugin's part.

Key to this technique is hiding the native browser scrollbars. In modern browsers (i.e. webkit) this is achieved simply by hiding the scrollbar using the ::webkit-scrollbar pseudo selector. In other browsers the width of the browser scrollbar is added to the content element, which has its overflow hidden, effectively hiding the scrollbar from view.

## 5. When to use it

TrackpadScrollEmulator is designed for use in web application UIs. A good example is the Rdio app, on which the plugin is based. In Rdio the UI is divided into a number of discrete segments, each of which contains an infinitely long content blob - a list of online friends, for instance. Traditionally a browser scrollbar would be permanently displayed alongside each content blob, which eats into valuable screen real estate and clutters the interface.

TrackpadScrollEmulator hides the scrollbars, leaving a much more attractive interface. The user can still scroll each segment independently, but scrollbars are only revealed as required.

## 6. Limitations

TrackpadScrollEmulator can currently handle vertical or horizontal scrollbars, but not both simultaneously.

## 7. Credits

Obviously most of the credit for this technique goes to Rdio's developers. Rdio is a Backbone application, so their solution is a combination of Backbone, Underscore, jQuery, CSS and Bujagali (their own templating system). What I have done is to recreate the same scrolling functionality using only jQuery and CSS.

Credit is also due to Jonathan Sharp, who wrote the original function for measuring the width of the browser's scrollbar (http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php).
