// Generated by CoffeeScript 1.3.3
(function() {
  var SliderBarr,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SliderBarr = (function() {
    'use strict';

    function SliderBarr(userSettings) {
      this._onMouseup = __bind(this._onMouseup, this);

      this._onSliderClick = __bind(this._onSliderClick, this);

      this._onHandleMousemove = __bind(this._onHandleMousemove, this);

      this._onHandleMousedown = __bind(this._onHandleMousedown, this);

      this._onHandleKeydown = __bind(this._onHandleKeydown, this);
      this._settings = {
        el: null,
        max: 100,
        min: 0,
        value: 25,
        bar: true,
        step: 1,
        onChange: null,
        onDrag: null
      };
      this._activeDrag = false;
      this._sliderAttr = {};
      this._cache = [];
      $.extend(this._settings, userSettings);
      this._validateHandles();
      this._render();
      this._initSelectors();
      this._initEvents();
      this._renderHandleChanges();
    }

    SliderBarr.prototype._validateHandles = function() {
      if (this._settings.step !== 1) {
        this._settings.value = Math.round(this._settings.value / this._settings.step) * this._settings.step;
      }
      if (this._settings.value > this._settings.max) {
        this._settings.value = this._settings.max;
      }
      if (this._settings.value < this._settings.min) {
        return this._settings.value = this._settings.min;
      }
    };

    SliderBarr.prototype._render = function() {
      if (this._settings.bar) {
        this._settings.el.append('<span class="bar"></span>');
      }
      return this._settings.el.append('<a href="#" class="handle"></a>');
    };

    SliderBarr.prototype._initSelectors = function() {
      this._cache['document'] = $(document);
      this._cache['slider'] = this._settings.el;
      if (this._settings.bar) {
        this._cache['bar'] = this._settings.el.find('.bar');
      }
      this._cache['handle'] = this._settings.el.find('.handle');
      return this._sliderAttr = {
        'width': this._cache['slider'].outerWidth(),
        'leftOffset': this._cache['slider'].offset().left
      };
    };

    SliderBarr.prototype._initEvents = function() {
      this._cache['handle'].on('keydown', this._onHandleKeydown);
      this._cache['handle'].on('mousedown', this._onHandleMousedown);
      this._cache['slider'].on('click', this._onSliderClick);
      return this._cache['document'].on('mouseup', this._onMouseup);
    };

    SliderBarr.prototype._changeHandle = function(dir) {
      this._settings.value = this._settings.value + (dir === 'r' ? this._settings.step : -this._settings.step);
      this._validateHandles();
      this._renderHandleChanges();
      if (this._settings.onChange !== null) {
        return this._settings.onChange(this._settings.value);
      }
    };

    SliderBarr.prototype._renderHandleChanges = function() {
      this._cache['handle'].css('left', this._settings.value + '%');
      if (this._settings.bar) {
        return this._cache['bar'].css({
          'width': this._settings.value + '%'
        });
      }
    };

    SliderBarr.prototype._onHandleKeydown = function(e) {
      var _ref, _ref1;
      if ((_ref = e.keyCode) === 37 || _ref === 38 || _ref === 39 || _ref === 40 || _ref === 65 || _ref === 68 || _ref === 83 || _ref === 87) {
        return this._changeHandle((_ref1 = e.keyCode) === 37 || _ref1 === 40 || _ref1 === 65 || _ref1 === 83 ? 'l' : 'r');
      }
    };

    SliderBarr.prototype._onHandleMousedown = function(e) {
      this._activeDrag = true;
      $(document).on('mousemove', this._onHandleMousemove);
      return e.preventDefault();
    };

    SliderBarr.prototype._onHandleMousemove = function(e) {
      if (this._activeDrag) {
        return this._setSliderValueOnDrag(e);
      }
    };

    SliderBarr.prototype._onSliderClick = function(e) {
      this._settings.value = this._getValFromMouseEvent(e);
      this._validateHandles();
      this._renderHandleChanges();
      if (this._settings.onChange !== null) {
        this._settings.onChange(this._settings.value);
      }
      return this._cache['handle'].focus();
    };

    SliderBarr.prototype._onMouseup = function(e) {
      if (this._activeDrag) {
        this._setSliderValueOnDrag(e);
        if (this._settings.onChange !== null) {
          this._settings.onChange(this._settings.value);
        }
        this._cache['handle'].focus();
      }
      return this._activeDrag = false;
    };

    SliderBarr.prototype._getValFromMouseEvent = function(e) {
      return parseInt(((e.pageX - this._sliderAttr.leftOffset) / this._sliderAttr.width) * 100, 10);
    };

    SliderBarr.prototype._setSliderValueOnDrag = function(e) {
      this._settings.value = this._getValFromMouseEvent(e);
      this._validateHandles();
      if (this._settings.onDrag !== null) {
        this._settings.onDrag(this._settings.value);
      }
      return this._renderHandleChanges();
    };

    return SliderBarr;

  })();

  if (typeof define === "function" && define.amd) {
    define("SliderBarr", [], function() {
      return SliderBarr;
    });
  } else {
    window.SliderBarr = SliderBarr;
  }

}).call(this);
