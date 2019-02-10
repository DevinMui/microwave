/*
 *  jquery-easy-loading - v1.3.0
 *  Easily add and manipulate loading states of any element on the page
 *  http://github.com/CarlosBonetti/jquery-loading
 *
 *  Made by Carlos Bonetti <carlosb_bc@hotmail.com>
 *  Under MIT License
 */
!function(a){"use strict";if("undefined"==typeof window)throw new Error("Could not find DOM window object.");"function"==typeof define&&define.amd?define(["jquery",window],a):"object"==typeof exports?a(require("jquery"),window):a(jQuery,window)}(function(a,b,c){var d=function(b,c){this.element=b,this.settings=a.extend({},d.defaults,c),this.settings.fullPage=this.element.is("body"),this.init(),this.settings.start&&this.start()};d.defaults={overlay:c,zIndex:c,message:"Loading...",theme:"light",shownClass:"loading-shown",hiddenClass:"loading-hidden",stoppable:!1,start:!0,onStart:function(a){a.overlay.fadeIn(150)},onStop:function(a){a.overlay.fadeOut(150)},onClick:function(){}},d.setDefaults=function(b){d.defaults=a.extend({},d.defaults,b)},a.extend(d.prototype,{init:function(){this.isActive=!1,this.overlay=this.settings.overlay||this.createOverlay(),this.resize(),this.attachMethodsToExternalEvents(),this.attachOptionsHandlers()},createOverlay:function(){var b=a('<div class="loading-overlay loading-theme-'+this.settings.theme+'"><div class="loading-overlay-content">'+this.settings.message+"</div></div>").addClass(this.settings.hiddenClass).hide().appendTo("body"),c=this.element.attr("id");return c&&b.attr("id",c+"_loading-overlay"),b},attachMethodsToExternalEvents:function(){var c=this;c.element.on("loading.start",function(){c.overlay.removeClass(c.settings.hiddenClass).addClass(c.settings.shownClass)}),c.element.on("loading.stop",function(){c.overlay.removeClass(c.settings.shownClass).addClass(c.settings.hiddenClass)}),c.settings.stoppable&&c.overlay.on("click",function(){c.stop()}),c.overlay.on("click",function(){c.element.trigger("loading.click",c)}),a(b).on("resize",function(){c.resize()}),a(function(){c.resize()})},attachOptionsHandlers:function(){var a=this;a.element.on("loading.start",function(b,c){a.settings.onStart(c)}),a.element.on("loading.stop",function(b,c){a.settings.onStop(c)}),a.element.on("loading.click",function(b,c){a.settings.onClick(c)})},calcZIndex:function(){return this.settings.zIndex!==c?this.settings.zIndex:(parseInt(this.element.css("z-index"))||0)+1+this.settings.fullPage},resize:function(){var a=this,b=a.element,c=b.outerWidth(),d=b.outerHeight();this.settings.fullPage&&(d="100%",c="100%"),this.overlay.css({position:a.settings.fullPage?"fixed":"absolute",zIndex:a.calcZIndex(),top:b.offset().top,left:b.offset().left,width:c,height:d})},start:function(){this.isActive=!0,this.resize(),this.element.trigger("loading.start",this)},stop:function(){this.isActive=!1,this.element.trigger("loading.stop",this)},active:function(){return this.isActive},toggle:function(){this.active()?this.stop():this.start()},destroy:function(){this.overlay.remove()}});var e="jquery-loading";a.fn.loading=function(b){return this.each(function(){var f=a.data(this,e);f?b===c?f.start():"string"==typeof b?f[b].apply(f):(f.destroy(),a.data(this,e,new d(a(this),b))):b!==c&&"object"!=typeof b&&"start"!==b&&"toggle"!==b||a.data(this,e,new d(a(this),b))})},a.fn.Loading=function(b){var f=a(this).data(e);return f&&b===c||a(this).data(e,f=new d(a(this),b)),f},a.expr[":"].loading=function(b){var c=a.data(b,e);return!!c&&c.active()},a.Loading=d});