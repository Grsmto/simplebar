#SimpleBar.js

SimpleBar is a plugin that tries to solve a long time problem : how to get custom scrollbars for your web-app ?

1. [What it does](#1-what-it-does)
2. [Usage](#2-usage)
3. [How it works](#3-how-it-works)
4. [Limitations](#4-limitations)
5. [Credits](#5-credits)

##1. What it does

SimpleBar does only one thing : replace the browser's default scrollbars with a custom CSS-styled scrollbar without loosing performance. Unlike most of others plugins, SimpleBar doesn't mimic scroll with Javascript, causing janks and strange scrolling behaviours...You keep the awesomeness of native scrolling...with a custom scrollbar!
Design your scrollbar like you want, with CSS, on all browsers.

SimpleBar works with jQuery.

##3. Usage

Include jQuery and SimpleBar in your document. The paths and filenames may differ from those shown here:

    <link rel="stylesheet" href="css/trackpad-scroll-emulator.css" />
    <script src="js/jquery.simplebar.1.0.min.js"></script>

**Via data attributes

You can get SimpleBar basic usage purely through the markup API without writing a single line of JavaScript.

Set `data-simplebar="vertical"` on the element where you want your custom scrollbar. You're done.

**Via JavaScript

    $('#myElement').simplebar();

You will also have to add the `simplebar` class to the element : `<div id="myElement" class="simplebar">`

###Options

Options can be applied to the plugin during initialization:

    $('#myElement').simplebar({
      option1: value1,
      option2: value2
    });

Available options are:

####wrapContent

By default TrackpadScrollEmulator requires minimal markup, as shown above. When initialized it will wrap the `tse-content`element in a div with the class `tse-scroll-content`. If you prefer to include this wrapper element directly in your markup you can switch the default behaviour off by setting the `wrapContent` option to `false`:

    $('#myElement').simplebar({ wrapContent: false });

Default value is `true`

####autoHide

By default SimpleBar automatically hides the scrollbar if the user is not scrolling (it emulates Mac OSX Lion's scrollbar). You can make the scrollbar always visible by setting the `autoHide` option to `false`:

    $('#myElement').simplebar({ autoHide: false });


Default value is `true`

You can also control the animation via CSS as it's a simple CSS opacity transition.

###Notifying the plugin of content changes

If you later dynamically modify your content, for instance changing its height or width, or adding or removing content, you should recalculate the scrollbars like so:

    $('#myElement').simplebar('recalculate');

###Non-JS fallback

SimpleBar hides the browser's default scrollbars, which obviously is undesirable if the user has JavaScript disabled. To restore the browser's scrollbars you can include the following `noscript` element in your document's `head`:

    <noscript>
      <style>
        .simplebar, [data-simplebar] {
          overflow: auto;
        }
      </style>
    </noscript>

##4. How it works

For the most part SimpleBar uses the browser's native scrolling functionality, but replaces the conventional scrollbar with a custom CSS-styled scrollbar. The plugin listens for scroll events and redraws the custom scrollbar accordingly.

Key to this technique is hiding the native browser scrollbar. The scrollable element is made slightly wider/taller than its containing element, effectively hiding the scrollbar from view.

##5. Limitations

SimpleBar can currently handle vertical or horizontal scrollbars, but not both simultaneously.

##6. Credits

Most of the credit goes to [Jonathan Nicol](http://www.f6design.com/) who made the original plugin called [Trackpad Scroll Emulator](https://github.com/jnicol/trackpad-scroll-emulator).

Credit is also due to Jonathan Sharp, who wrote the original function for measuring the width of the browser's scrollbar (http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php).

###Additional contributors

Yoh Suzuki: wrapContent option
Adrien Grsmto: autoHide option