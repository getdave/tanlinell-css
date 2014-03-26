/*

**** I SEE YOU'RE LOOKING AT THE SOURCE! ****

              .andAHHAbnn.
           .aAHHHAAUUAAHHHAn.
          dHP^~"        "~^THb.
    .   .AHF                YHA.   .
    |  .AHHb.              .dHHA.  |
    |  HHAUAAHAbn      adAHAAUAHA  |
    I  HF~"_____        ____ ]HHH  I
   HHI HAPK""~^YUHb  dAHHHHHHHHHH IHH
   HHI HHHD> .andHH  HHUUP^~YHHHH IHH
   YUI ]HHP     "~Y  P~"     THH[ IUP
    "  `HK                   ]HH'  "
        THAn.  .d.aAAn.b.  .dHHP
        ]HHHHAAUP" ~~ "YUAAHHHH[
        `HHP^~"  .annn.  "~^YHH'
         YHb    ~" "" "~    dHF
          "YAb..abdHHbndbndAP"
           THHAAb.  .adAHHF
            "UHHHHHHHHHHU"
              ]HHUUHHHHHH[
            .adHHb "HHHHHbn.
     ..andAAHHHHHHb.AHHHHHHHAAbnn..
.ndAAHHHHHHUUHHHHHHHHHHUP^~"~^YUHHHAAbn.
  "~^YUHHP"   "~^YUHHUP"        "^YUP^"
       ""         "~~"
*/

/**
 * ##################################
 *
 * TANLINELL FRAMEWORK
 *
 * ##################################
 *
 * a modular, frontend CSS/JS web framework
 * Version: 0.1.0 (26-03-2014)
 * URL: git://github.com/getdave/tanlinell-framework.git
 * License: MIT: https://github.com/getdave/tanlinell-framework/blob/master/LICENSE-MIT
 * Author: David Smith (Twitter: @get_dave)
 *
 * a modular, frontend CSS/JS web framework
 *
 *
 * This framework draws inspiration from the great work of the following projects/authors:
 *
 * OOCSS                  - https://github.com/stubbornella/oocss
 * Inuit.css              - https://raw.github.com/csswizardry/inuit.css/
 * SMACSS guidelines      - http://smacss.com/
 * Twitter Bootstrap      - http://twitter.github.com/bootstrap/
 * ZURB Foundation        - http://foundation.zurb.com/
 *
 */


(function(win, doc) {
    var DELAY = 100, TEST_STRING = "AxmTYklsjo190QW", TOLERANCE = 2, SANS_SERIF_FONTS = "sans-serif", SERIF_FONTS = "serif", parent = doc.createElement("div"), html = '<div style="font-family:%s;position:absolute;top:0;left:-9999px;font-size:48px">' + TEST_STRING + "</div>", sansSerif, serif, dimensions, appended = false;
    parent.innerHTML = html.replace(/\%s/, SANS_SERIF_FONTS) + html.replace(/\%s/, SERIF_FONTS);
    sansSerif = parent.firstChild;
    serif = sansSerif.nextSibling;
    FontFaceOnload = function(fontFamily, options) {
        var defaultOptions = {
            glyphs: "",
            success: function() {},
            error: function() {},
            timeout: 1e4
        }, startTime = new Date();
        if (!options) {
            options = {};
        }
        for (var j in defaultOptions) {
            if (!options.hasOwnProperty(j)) {
                options[j] = defaultOptions[j];
            }
        }
        if (options.glyphs) {
            sansSerif.innerHTML += options.glyphs;
            serif.innerHTML += options.glyphs;
        }
        if (!appended && doc.body) {
            appended = true;
            doc.body.appendChild(parent);
            dimensions = {
                sansSerif: {
                    width: sansSerif.offsetWidth,
                    height: sansSerif.offsetHeight
                },
                serif: {
                    width: serif.offsetWidth,
                    height: serif.offsetHeight
                }
            };
        }
        sansSerif.style.fontFamily = fontFamily + ", " + SANS_SERIF_FONTS;
        serif.style.fontFamily = fontFamily + ", " + SERIF_FONTS;
        (function checkDimensions() {
            if (Math.abs(dimensions.sansSerif.width - sansSerif.offsetWidth) > TOLERANCE || Math.abs(dimensions.sansSerif.height - sansSerif.offsetHeight) > TOLERANCE || Math.abs(dimensions.serif.width - serif.offsetWidth) > TOLERANCE || Math.abs(dimensions.serif.height - serif.offsetHeight) > TOLERANCE) {
                options.success();
            } else if (new Date().getTime() - startTime.getTime() > options.timeout) {
                options.error();
            } else {
                setTimeout(function() {
                    checkDimensions();
                }, DELAY);
            }
        })();
    };
})(this, this.document);

(function(w) {
    var doc = w.document, ref, css = [ ".fontface.generatedcontent.FONT_NAME .icon-fallback-text .icon { display: inline-block; }", ".fontface.generatedcontent.FONT_NAME .icon-fallback-text .text { clip: rect(0 0 0 0); overflow: hidden; position: absolute; height: 1px; width: 1px; }", ".fontface.FONT_NAME .icon-fallback-glyph .icon:before { font-size: inherit; line-height: inherit; }" ];
    function addEvent(type, callback) {
        if ("addEventListener" in w) {
            return w.addEventListener(type, callback, false);
        } else if ("attachEvent" in w) {
            return w.attachEvent("on" + type, callback);
        }
    }
    AFontGarde = function(fontFamily, sampleGlyphs) {
        var fontFamilyClassName = fontFamily.toLowerCase().replace(/\s/g, ""), executed = false;
        function init() {
            if (executed) {
                return;
            }
            executed = true;
            if (typeof FontFaceOnload === "undefined") {
                throw "FontFaceOnload is a prerequisite.";
            }
            if (!ref) {
                ref = doc.getElementsByTagName("script")[0];
            }
            var style = doc.createElement("style"), cssContent = css.join("\n").replace(/FONT_NAME/gi, fontFamilyClassName);
            style.setAttribute("type", "text/css");
            if (style.styleSheet) {
                style.styleSheet.cssText = cssContent;
            } else {
                style.appendChild(doc.createTextNode(cssContent));
            }
            ref.parentNode.insertBefore(style, ref);
            FontFaceOnload(fontFamily, {
                glyphs: sampleGlyphs || "",
                timeout: 5e3,
                success: function() {
                    doc.documentElement.className += " " + fontFamilyClassName;
                }
            });
        }
        addEvent("DOMContentLoaded", init);
        addEvent("readystatechange", init);
        addEvent("load", init);
        if (doc.readyState === "complete") {
            init();
        }
    };
})(this);

(function($) {
    var Tanlinell = function() {
        this.$doc = $(document);
        this.$root = $(":root");
        this.$body = $("body");
        this.init();
    };
    Tanlinell.prototype.utils = {};
    Tanlinell.prototype._helpers = {};
    Tanlinell.prototype.modules = {};
    Tanlinell.prototype.init = function() {
        if (this.utils.isOperaMini()) {
            this.$root.addClass("is-opera-mini");
        }
        if (this.utils.cutsTheMustard()) {
            this.$root.addClass("cuts-the-mustard");
        }
    };
    Tanlinell.prototype.utils = {
        Dictionary: function() {
            var Dictionary = function(startValues) {
                this.values = startValues || {};
            };
            Dictionary.prototype.store = function(name, value) {
                this.values[name] = value;
            };
            Dictionary.prototype.lookup = function(name) {
                return this.values[name];
            };
            Dictionary.prototype.contains = function(name) {
                return Object.prototype.hasOwnProperty.call(this.values, name) && Object.prototype.propertyIsEnumerable.call(this.values, name);
            };
            return Dictionary;
        }(),
        cutsTheMustard: function() {
            var cutsTheMustard = function() {
                if ("querySelector" in document && "localStorage" in window && "addEventListener" in window) {
                    return true;
                } else {
                    return false;
                }
            }();
            return cutsTheMustard;
        },
        isOperaMini: function() {
            var isOperaMini = Object.prototype.toString.call(window.operamini) === "[object OperaMini]";
            return isOperaMini;
        },
        activeMediaQuery: function() {
            var mqString, breakPoints, rtn;
            breakPoints = new this.Dictionary({
                none: 1,
                tiny: 2,
                small: 3,
                medium: 4,
                large: 5,
                xlarge: 6
            });
            mqString = $(":root").css("font-family");
            rtn = breakPoints.lookup(mqString);
            return rtn;
        }
    };
    window.Tanlinell = new Tanlinell();
})(jQuery);

(function(Tanlinell, $) {
    function SmoothScroll(el, options) {
        this.el = el;
        this.$el = $(el);
        this.settings = $.extend({
            targetEl: this.$el.data("smooth-scroll-target"),
            eventType: "click",
            duration: this.$el.data("smooth-scroll-duration") || 2e3,
            animationOptions: {
                easing: this.$el.data("smooth-scroll-easing") || "swing"
            }
        }, options);
        this.$targetEl = $(this.settings.targetEl);
        this.setup();
    }
    SmoothScroll.prototype.setup = function() {
        if (!this._checkForTargetEle()) {
            return;
        }
        this.addListeners();
    };
    SmoothScroll.prototype.addListeners = function() {
        var _this = this;
        this.$el.on(this.settings.eventType, function(e) {
            e.preventDefault();
            _this.scrollTo(_this.settings.targetEl, _this.$el, e);
        });
    };
    SmoothScroll.prototype.scrollTo = function(targetEl, triggerEl, event) {
        var _this = this;
        var $targetEl = $(targetEl);
        var $triggerEl = $(triggerEl);
        var offset = this._calculateOffset($targetEl);
        var animationOptions = $.extend({
            scrollTop: offset,
            queue: false
        }, _this.settings.animationOptions);
        $("html, body").stop().animate(animationOptions, _this.settings.duration, function() {
            $.event.trigger({
                type: "tanlinell:smooth-scroll:complete",
                targetEl: $targetEl,
                triggerEl: $triggerEl
            });
        });
    };
    SmoothScroll.prototype._calculateOffset = function($targetEL) {
        return $targetEL.offset().top;
    };
    SmoothScroll.prototype._checkForTargetEle = function() {
        return !!this.$targetEl.length;
    };
    $("[data-smooth-scroll]").each(function() {
        var $this = $(this);
        if ($this.data("tanlinell-module-initialized")) {
            return true;
        }
        $this.data("tanlinell-module-initialized", true);
        new SmoothScroll($this);
    });
    Tanlinell.modules.SmoothScroll = SmoothScroll;
})(Tanlinell, jQuery);

(function(Tanlinell, $) {
    function Toggle(el, options) {
        this.el = el;
        this.$el = $(el);
        this.settings = $.extend({
            eventType: "click",
            toggleTarget: this.$el.data("toggle-target"),
            classList: this.$el.data("toggle-classlist") || "is-active"
        }, options);
        this.$toggleTarget = $(this.settings.toggleTarget);
        this.setup();
    }
    Toggle.prototype.setup = function() {
        this.addListeners();
    };
    Toggle.prototype.addListeners = function() {
        var _this = this;
        this.$el.on(this.settings.eventType, this.el, function(e) {
            e.preventDefault();
            _this.toggleIt($(this), e);
        });
    };
    Toggle.prototype.toggleIt = function($ele, event) {
        this.$toggleTarget.toggleClass(this.settings.classList);
        $(event.currentTarget).toggleClass("toggle--active");
    };
    $("[data-toggle]").each(function() {
        var $this = $(this);
        if ($this.data("tanlinell-module-initialized")) {
            return true;
        }
        $this.data("tanlinell-module-initialized", true);
        new Toggle($this);
    });
    Tanlinell.modules.Toggle = Toggle;
})(Tanlinell, jQuery);