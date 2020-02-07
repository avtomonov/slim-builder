/*!
 * InitSwiper v0.2.8
 * Vladimir Ivanin
 * 2018
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function generateUUID(){var e=(new Date).getTime();return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?n:3&n|8).toString(16)})}function patchNumber(e){var t,n="string"==typeof e;if(!("number"==typeof e)&&!n)return 0;return n&&(e=(e=(e=e.replace(/,/g,".")).replace(/px/g,"")).replace(/\%/g,""),e=isNaN(+e)?1:+e),Number((t=e,Number(t)===t&&t%1!=0?e.toFixed(2):e))}function debounce(e,t,n){var r;return function(){var x=this,a=arguments,i=n&&!r;clearTimeout(r),r=setTimeout(function(){r=null,n||e.apply(x,a)},t),i&&e.apply(x,a)}}function slideLength(e,t){var n=Math.floor(e/t);return(!n||n<1)&&(n=1),n}function getContainerWidth(e){var t=e.parents(":visible").width(),n=e.width();return 0==n&&(n=t>0?t:e.parent().parent().width()),n}module.exports={slideLength:slideLength,debounce:debounce,generateUUID:generateUUID,getContainerWidth:getContainerWidth,patchNumber:patchNumber};
},{}],2:[function(require,module,exports){
var defaults=require("../variables").defaults,init=require("./init"),InitSwiper=function(i,t){var e=this,n=[];return e.options=$.extend(!0,{},defaults,t),e.init=init,("string"==typeof i?$(i):i).each(function(i,t){var r=e.init($(t));_.isArray(r)?n=n.concat(r):n.push(r)}),n};module.exports=InitSwiper;
},{"../variables":5,"./init":3}],3:[function(require,module,exports){
var debounce=require("./help").debounce,slideLength=require("./help").slideLength,generateUUID=require("./help").generateUUID,getContainerWidth=require("./help").getContainerWidth,patchNumber=require("./help").patchNumber;function init(e){var i=e.hasClass("swiper-container"),n=(i||e.find(".swiper-container"),i?e.parent():e),r=generateUUID(),t=this.options,a=n[0]&&n[0].swiper?n[0].swiper:null,s=".slider-"+r,p=".container-"+r,d=s+" .swiper-container"+p,o=s+" .swiper-button-next",l=s+" .swiper-button-prev",u=n.find(".swiper-slide").length,h=t._parents,w=null;h&&(w=n.parents(h+":first")),n.addClass(s.replace(".","")),n.find(".swiper-container").eq(0).addClass(p.replace(".",""));var c=1,g=$(d).eq(0),C=getContainerWidth(g);t.$swiperContainer=g,t.autoLength&&(c=slideLength(C,t.minCartWidth));var m={slidesPerView:c,loop:c<u,loopAdditionalSlides:u,navigation:{nextEl:o,prevEl:l},pagination:{el:s+" .swiper-pagination",type:"bullets",clickable:!0}},v=$.extend(!0,m,t),b=u>0;if(u<v.slidesPerView&&n.addClass("arrow-hide"),b){if(a)return a.params=v,a.update(!0),a;var f=new Swiper(d,v);return w&&w.on("mouseenter",function(e){f.update(!0)}),t.autoResponsive&&$(window).on("resize",debounce(function(e){void 0!==f.params&&(C=getContainerWidth(g),f.params.slidesPerView=slideLength(C,t.minCartWidth),f.update(!0))},150)),f}n.addClass("is-empty")}module.exports=init;
},{"./help":1}],4:[function(require,module,exports){
window.InitSwiper=require("InitSwiper");
},{"InitSwiper":2}],5:[function(require,module,exports){
var defaults={setWrapperSize:!0,controlBy:"container",spaceBetween:20,autoLength:!1,autoResponsive:!1,maxBreakpoint:4200,minBreakpoint:300,minCartWidth:300,gutterCart:10,pagination:{type:"bullets",clickable:!0}};module.exports={defaults:defaults};
},{}]},{},[4]);