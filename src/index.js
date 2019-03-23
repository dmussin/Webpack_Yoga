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