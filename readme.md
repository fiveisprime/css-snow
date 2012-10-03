# CSS Snow

Uses CSS3 keyframes animations to create a snow effect - the JavaScript library adds snow elements and updates the
keyframes animation to use the full page.

Inspired by [Dave Olsen](https://github.com/dmolsen/CSS3-Snowflakes) and [Elizabeth Yalkut](https://github.com/elizabethyalkut/CSS3-Snowflakes). I basically took what Dave had and cleaned up the CSS and JavaScript so that I could use it for a project and I figured I would share.

## Getting Started

The CSS is what makes the snow work and the JavaScript is supplemental so you might need to add some specific IDs if you want to use the included `snow.css` stylesheet.

Include the references:

````html
<link href="src/css/base.css" rel="stylesheet" media="screen" />
<link href="src/css/snow.css" rel="stylesheet" media="screen" />
<script src="src/js/snow.js"></script>
````

Make sure that you have a container with an ID that can be used as the page container. This is where
the snow will be populated how the keyframes animation determines height.

Add a `div` for the snow:

````html
<div id="container">
  <div id="snow-container"></div>
</div>
````

Add the desired amount of snow using JavaScript (note that keyframes animations are pretty CPU intensive and will make you sad).

````javascript
snow.addSnow('container','snow-container', 40);
````

