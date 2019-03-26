require('es6-promise').polyfill();
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', function(){
    'use strict';

   let tabs =require('./parts/tabs.js'),
       timer =require('./parts/timer.js'),
       modal = require('./parts/modal.js'),
       form = require('./parts/form.js'),
       calc = require('./parts/calc.js'),
       slider = require('./parts/slider.js');

calc();
form();
slider();
tabs();
timer();
modal();
    

});

if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }