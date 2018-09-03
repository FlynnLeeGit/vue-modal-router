/**
 * vue-modal-router v0.2.0
 * (c) 2018 FlynnLee
 * @license MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.vueModalRouter=e()}(this,function(){"use strict";var t={name:"ModalLink",props:{tag:{type:String,default:"button"},to:{type:Object,default:function(){return{}},required:!0}},methods:{onClick:function(t){t.preventDefault(),console.log("click"),this.$modalRouter.replace(this.to)},onMousedown:function(t){0===t.button&&console.log("mousedown")}},render:function(t){return t(this.tag,{props:this.$attrs,nativeOn:{click:this.onClick,mousedown:this.onMousedown}},this.$slots.default)}},e={name:"ModalRouterView",functional:!0,render:function(t,e){var n=e.parent,o=n.$createElement,i=n.$modals;if(i.length){var r=i.map(function(t){return o(t.component,{props:t.props,on:t.on})});return o("div",{class:"vue_modal_router_view_modals"},r)}return o("div",{class:"vue_modal_router_view_placeholader"})}},n=function(t){return"function"==typeof t},o=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var s={key:t,arg:e,resolve:n,reject:i,next:null};u?u=u.next=s:(r=u=s,o(t,e))})}function o(n,r){try{var u=e[n](r),s=u.value;s instanceof t?Promise.resolve(s.value).then(function(t){o("next",t)},function(t){o("throw",t)}):i(u.done?"return":"normal",u.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":r.resolve({value:e,done:!0});break;case"throw":r.reject(e);break;default:r.resolve({value:e,done:!1})}r=r.next,r?o(r.key,r.arg):u=null}var r,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},u=function(){function t(){o(this,t),this._modals=[]}return i(t,[{key:"push",value:function(t){this._modals.push(t)}},{key:"replace",value:function(t){this._modals.pop();this._modals.push(t)}},{key:"current",get:function(){return this._modals.length?this._modals[this._modals.length-1]:null}}]),t}(),s=(new u,function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.routes,i=void 0===n?[]:n,r=e.delay,u=void 0===r?100:r,s=e.model,a=void 0===s?"show":s;o(this,t),this._model=a,this._delay=u,this._routes=i,this._routesMap={},this._modals=[],this._initRoutesMap()}return i(t,[{key:"_init",value:function(t){this.app=t}},{key:"_initRoutesMap",value:function(){var t=this;this._routes.forEach(function(e){t._routesMap[e.name]={name:e.name,component:e.component,isAsync:n(e.component),model:e.model||t._model}})}},{key:"pop",value:function(){var t=this;setTimeout(function(){t._modals.pop()},this._delayy)}},{key:"replace",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.name,o=e.props,i=void 0===o?{}:o,u=e.on,s=void 0===u?{}:u;if(!this._routesMap[n])throw new Error("[VueModalRouter] can not find modal ["+n+"],please register first");var a=this,l=this._routesMap[n],c={created:function(){this[l.model]=!0},watch:r({},l.model,function(t){t||a.pop()})};l.isAsync?l.component().then(function(e){e.mixins=e.mixins||[],-1===e.mixins.indexOf(c)&&e.mixins.push(c),t._modals.push({component:e,props:Object.assign({},i),on:s,model:l.model})}):(l.component.mixins=l.component.mixins||[],-1===l.component.mixins.indexOf(c)&&l.component.mixins.push(c),this._modals.push({component:l.component,props:Object.assign({},i),on:s,model:l.model}))}}]),t}());return s.install=function(n){n.mixin({beforeCreate:function(){if(this.$options.modalRouter){var t=this.$options.modalRouter;this._modalRouter=t,t._init(this),n.util.defineReactive(this,"_modals",this._modalRouter._modals)}Object.defineProperty(this,"$modals",{get:function(){return this.$root._modals}}),Object.defineProperty(this,"$modalRouter",{get:function(){return this.$root._modalRouter}})}}),n.component(t.name,t),n.component(e.name,e)},s});