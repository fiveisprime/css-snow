!function(window) {

  "use strict";
  
  var proto = {

    /**
     * ID index for use when creating new snow particles.
     * @type {Number}
     */

    idIndex: 1

    /**
     * Variable sizes of snow particles.
     * @type {Array}
     */

  , sizes: [
      ''
    , 'snow-small'
    , 'snow-med'
    , 'snow-large'
    ]

    /**
     * Variables speeds of snow particles.
     * @type {Array}
     */

  , speeds: [
      ''
    , 'snow-slow'
    , 'snow-med'
    , 'snow-fast'
    ]

    /**
     * Variable opacities of snow particles.
     * @type {Array}
     */

  , opacities: [
      ''
    , 'snow-faint'
    , 'snow-light'
    , 'snow-dark'
    ]

    /**
     * Variable keyframe delays for snow particles.
     * @type {Array}
     */

  , delays: [
      ''
    , 'snow-delay-1'
    , 'snow-delay-2'
    , 'snow-delay-3'
    , 'snow-delay-4'
    , 'snow-delay-5'
    , 'snow-delay-6'
    ]

    /**
     * Creates a pseudo-random number between the specified start and end values.
     * @param  {number} start Starting number.
     * @param  {number} end Ending number.
     * @return {number} A random number between the specified values.
     */

  , randomBetween: function(start, end) {
      return Math.floor(Math.random() * (end - start + 1) + start);
    }

    /**
     * Finds the CSS keyframe animation for the specified name.
     * @param  {string} name The name of the keyframe.
     * @return {object} The keyframe object; null if no keyframe found.
     */

  , findKeyframeAnimation: function(name) {
      var stylesheet = document.styleSheets
        , i
        , j;

      for (i = stylesheet.length - 1; i >= 0; i--) {
        var sheet = stylesheet[i]
          , rules = sheet.cssRules ? sheet.cssRules : sheet.rules ? sheet.rules : [];

        for (j = rules.length - 1; j >= 0; j--) {
          if ((rules[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE
            || rules[j].type === window.CSSRule.MOZ_KEYFRAMES_RULE)
            && rules[j].name === name) {
            return rules[j];
          }
        }
      }

      return null;
    }

    /**
     * Update the keyframe height so that snow uses the entire page.
     */

  , updateKeyframeHeight: function() {
      var keyframe = this.findKeyframeAnimation('falling')
        , rule;

      if (keyframe) {
        var height = this.pageContainer.offsetHeight;

        if (window.innerHeight > height) {
          height = window.innerHeight;
        }

        if (keyframe.cssText.match(/-webkit-/)) {
          rule = '100% { -webkit-transform: translate3d(0,' + height + 'px,0) rotate(360deg); }';
        } else if (keyframe.cssText.match(/-moz-/)) {
          rule = '-moz-transform: translate(0,' + height + 'px) rotate(360deg);';
        } else if (keyframe.cssText.match(/-o-/)) {
          rule = '-o-transform: translate(0,' + height + 'px) rotate(360deg);';
        }

        keyframe.insertRule(rule);
      }
    }

    /**
     * Adds snow to the page using the specified page container and
     * snow container.
     * @param {string} pageID The ID of the page container.
     * @param {string} snowID The ID of the snow container.
     * @param {number} count  Number of snow particles to add to the page.
     */

  , addSnow: function(pageID, snowID, count) {
      this.pageContainer = document.getElementById(pageID);
      this.snowContainer = document.getElementById(snowID);

      var i = 0;
      this.updateKeyframeHeight();
      while (i < count) {
        var snowflake = document.createElement('i')
          , size      = this.sizes[this.randomBetween(0, this.sizes.length - 1)]
          , speed     = this.speeds[this.randomBetween(0, this.speeds.length - 1)]
          , opacity   = this.opacities[this.randomBetween(0, this.opacities.length - 1)]
          , delay     = this.delays[this.randomBetween(0, this.delays.length - 1)];

        snowflake.setAttribute('id', 'snowId' + this.idIndex);
        snowflake.setAttribute('class', 'snow ' + size + ' ' + speed + ' ' + opacity + ' ' + delay);
        snowflake.setAttribute('style', 'left: ' + this.randomBetween(0, 100) + '%;');
        this.snowContainer.appendChild(snowflake);

        i++;
        this.idIndex++;
      }
    }
  };

  /**
   * Expose the snow API to the global window object.
   */

  window.snow = Object.create(proto);

}(window);
