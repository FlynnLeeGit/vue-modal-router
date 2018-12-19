/**
 * vue-modal-router v0.2.6
 * (c) 2018 FlynnLee
 * @license MIT
 */
!function(o,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):o.vueModalRouter=t()}(this,function(){"use strict";var o={name:"ModalLink",props:{tag:{type:String,default:"button"},to:{type:Object,default:function(){return{}},required:!0}},data:function(){return{modalClickHander:null,modalRouteInstance:null,modalRouteModel:""}},methods:{onClick:function(o){o.preventDefault(),this.modalRouteInstance?this.modalRouteInstance[this.modalRouteModel]=!0:this.modalClickHander=function(o,t){o[t.model]=!0}},onMousedown:function(o){var t=this;this.clickHander=null,this.modalRouteInstance=null,0===o.button&&(console.log(this.$modalRouter),this.to.autoOpen=!1,this.$modalRouter.push(Object.assign(this.to),function(o,n){t.modalRouteInstance=o,t.modalRouteModel=n.model,t.modalClickHander&&t.modalClickHander(o,n)}))}},created:function(){this.$modalRouter.has(this.to.name)||process&&process.env&&"development"===process.env.NODE_ENV&&console.warn('[VueModalRouter] can not find modal "'+this.to.name+'", please check routes option')},render:function(o){return o(this.tag,{props:this.$attrs,nativeOn:{click:this.onClick,mousedown:this.onMousedown}},this.$slots.default)}},t={name:"ModalRouterView",functional:!0,render:function(o,t){var n=t.parent,e=n.$createElement,i=n.$modalComponents;if(i.length){var a=i.map(function(o){return e(o.component,{props:o.props,on:o.on,ModalComponent:o})});return e("div",{class:"vue_modal_router_view_modals"},a)}return e("div",{class:"vue_modal_router_view_empty"})}},n=function(o){return"function"==typeof o},e=function(o){return void 0!==o},i=(function(){function o(o){this.value=o}function t(t){function n(o,t){return new Promise(function(n,i){var u={key:o,arg:t,resolve:n,reject:i,next:null};r?r=r.next=u:(a=r=u,e(o,t))})}function e(n,a){try{var r=t[n](a),u=r.value;u instanceof o?Promise.resolve(u.value).then(function(o){e("next",o)},function(o){e("throw",o)}):i(r.done?"return":"normal",r.value)}catch(o){i("throw",o)}}function i(o,t){switch(o){case"return":a.resolve({value:t,done:!0});break;case"throw":a.reject(t);break;default:a.resolve({value:t,done:!1})}a=a.next,a?e(a.key,a.arg):r=null}var a,r;this._invoke=n,"function"!=typeof t.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(o){return this._invoke("next",o)},t.prototype.throw=function(o){return this._invoke("throw",o)},t.prototype.return=function(o){return this._invoke("return",o)}}(),function(o,t){if(!(o instanceof t))throw new TypeError("Cannot call a class as a function")}),a=function(){function o(o,t){for(var n=0;n<t.length;n++){var e=t[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(o,e.key,e)}}return function(t,n,e){return n&&o(t.prototype,n),e&&o(t,e),t}}(),r=function(){function o(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=n.routes,r=void 0===a?[]:a,u=n.model,s=void 0===u?"show":u;n.delay;i(this,o),this._routeMap={},this._modalComponents=[],r.forEach(function(o){t._routeMap[o.name]={component:o.component,delay:e(o.delay)?o.delay:200,model:o.model||s,instances:[]}}),this._map={}}return a(o,[{key:"_init",value:function(o){this.app=o}},{key:"has",value:function(o){return o in this._routeMap}},{key:"push",value:function(){var o=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.name,i=void 0===e?"":e,a=t.props,r=void 0===a?{}:a,u=t.on,s=void 0===u?{}:u,l=t.autoOpen,d=void 0===l||l,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},m=this._routeMap[i];if(!m)throw new Error('[VueModalRouter] can not find modal "'+i+'",register first');if(n(m.component))m.component().then(function(t){t.modalRouteConfig={name:i,delay:m.delay,model:m.model,autoOpen:d};var n={component:t,props:r,on:s,callbacks:{onOpen:c}};o._modalComponents.push(n)});else{m.component.modalRouteConfig={name:i,delay:m.delay,model:m.model,autoOpen:d};var p={component:m.component,props:r,on:s,callbacks:{onOpen:c}};this._modalComponents.push(p)}}},{key:"close",value:function(o){var t=this._modalComponents.indexOf(o);this._modalComponents.splice(t,1)}},{key:"registerInstance",value:function(o,t){this._map[o]=this._map[o]||[],this._map[o].push(t)}},{key:"destroyInstance",value:function(o,t){var n=this._map[o].indexOf(t);this._map[o].splice(n,1),t.$destroy()}}]),o}();return r.install=function(n){n.mixin({beforeCreate:function(){if(this.$options.modalRouter){var o=this.$options.modalRouter;this._modalRouter=o,n._modalRouterInstalled=!0,o._init(this),n.util.defineReactive(this,"_modalComponents",this._modalRouter._modalComponents)}this.$modalRouter||(Object.defineProperty(this,"$modalComponents",{get:function(){return this.$root._modalComponents}}),Object.defineProperty(this,"$modalRouter",{get:function(){return this.$root._modalRouter}}))},created:function(){var o=this;if(this.$options.modalRouteConfig){var t=this.$options.modalRouteConfig,n=t.name,e=t.model,i=t.delay,a=t.autoOpen,r=this.$options._parentVnode.data.ModalComponent;this.$modalRouter.registerInstance(n,this),a&&(this[e]=!0),this.$watch(e,function(t){t||setTimeout(function(){o.$modalRouter.close(r),o.$modalRouter.destroyInstance(n,o)},i)})}},mounted:function(){if(this.$options.modalRouteConfig){var o=this.$options._parentVnode.data.ModalComponent,t=o.callbacks.onOpen;t&&t(this,this.$options.modalRouteConfig)}}}),n.component(o.name,o),n.component(t.name,t)},r});
