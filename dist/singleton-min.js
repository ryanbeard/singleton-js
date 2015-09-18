/*!
 * Copyright (c) 2015 Ryan Beard
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function(t,n){"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?module.exports=n():t.singleton=n()}(this,function(){"use strict";var t=function(t){if(t.length)throw new Error("cannot pass arguments into an already instantiated singleton")};return function(n,e){e||(e={});var r=function(){if(n.instance)t(arguments);else{var r=function(t){return n.apply(this,t)};n.prototype.__setInstance=function(){n.instance=this},r.prototype=n.prototype,new r(arguments.length?arguments:e.arguments).__setInstance(),delete n.prototype.__setInstance}return n.instance};if(e.instantiate){var s=r.apply(r,e.arguments);return function(){return t(arguments),s}}return r}});