/**
 * TrackpadScrollEmulator
 * Version: 1.0
 * Author: Jonathan Nicol @f6design
 * https://github.com/jnicol/trackpad-scroll-emulator
 *
 * The MIT License
 *
 * Copyright (c) 2012 Jonathan Nicol
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */(function(a){function c(c,d){function q(){if(f.hasClass("horizontal")){m="horiz";n="scrollLeft";o="width";p="left"}f.prepend('<div class="tse-scrollbar"><div class="drag-handle"></div></div>');i=f.find(".tse-scrollbar");j=f.find(".drag-handle");h.wrap('<div class="tse-scroll-content" />');g=f.find(".tse-scroll-content");z();f.on("mouseenter",w);j.on("mousedown",r);g.on("scroll",u);v()}function r(b){b.preventDefault();var c=b.pageY;m==="horiz"&&(c=b.pageX);k=c-j.offset()[p];a(document).on("mousemove",s);a(document).on("mouseup",t)}function s(a){a.preventDefault();var b=a.pageY;m==="horiz"&&(b=a.pageX);var c=b-i.offset()[p]-k,d=c/i[o](),e=d*h[o]();g[n](e)}function t(){a(document).off("mousemove",s);a(document).off("mouseup",t)}function u(a){w()}function v(){var a=h[o](),b=g[n](),c=i[o](),d=c/a,e=Math.round(d*b)+2,f=Math.floor(d*(c-2))-2;if(c<a){m==="vert"?j.css({top:e,height:f}):j.css({left:e,width:f});i.show()}else i.hide()}function w(){v();x()}function x(){j.addClass("visible");typeof l=="number"&&window.clearTimeout(l);l=window.setTimeout(function(){y()},1e3)}function y(){j.removeClass("visible");typeof l=="number"&&window.clearTimeout(l)}function z(){if(m==="vert"){g.width(f.width()+A());g.height(f.height())}else{g.width(f.width());g.height(f.height()+A());h.height(f.height())}}function A(){var b=a('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');a("body").append(b);var c=a("div",b).innerWidth();b.css("overflow-y","scroll");var d=a("div",b).innerWidth();b.remove();return c-d}function B(){z();v()}function C(a,b){if(!b)return d[a];d[a]=b}function D(){h.insertBefore(i);i.remove();g.remove();h.css({height:f.height()+"px","overflow-y":"scroll"});E("onDestroy");f.removeData("plugin_"+b)}function E(a){d[a]!==undefined&&d[a].call(e)}var e=c,f=a(c),g,h=f.find(".tse-content"),i,j,k,l,m="vert",n="scrollTop",o="height",p="top";d=a.extend({},a.fn[b].defaults,d);q();return{option:C,destroy:D,recalculate:B}}var b="TrackpadScrollEmulator";a.fn[b]=function(d){if(typeof arguments[0]=="string"){var e=arguments[0],f=Array.prototype.slice.call(arguments,1),g;this.each(function(){if(!a.data(this,"plugin_"+b)||typeof a.data(this,"plugin_"+b)[e]!="function")throw new Error("Method "+e+" does not exist on jQuery."+b);g=a.data(this,"plugin_"+b)[e].apply(this,f)});return g!==undefined?g:this}if(typeof d=="object"||!d)return this.each(function(){a.data(this,"plugin_"+b)||a.data(this,"plugin_"+b,new c(this,d))})};a.fn[b].defaults={onInit:function(){},onDestroy:function(){}}})(jQuery);