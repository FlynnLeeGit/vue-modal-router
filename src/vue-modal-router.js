import { ModalRouterView } from "./modal-router-view";
import DirectiveModalLink from "./directive-modal-link";
import { isFn, isDef, isPlainObject } from "./util";
import { isFunction } from "util";
/**
 * vue-modal-router
 * (c) 2018 FlynnLee
 * @license MIT
 */

const toPascalName = name => {
  return name
    .replace(/-([a-z])/g, (r, $1) => $1.toUpperCase())
    .replace(/^[a-z]/, r => r.toUpperCase());
};

let _globalMid = 0;

class ModalRouter {
  constructor(modals = {}, root = null) {
    this._modals = modals;
    /**
     * @type {ModalRouter}
     */
    this._root = root;
    /**
     * 全局数组引用 来自vm.$root._modalComponents
     */
    this._modalComponents = [];
    this._beforeEachOpen = [];
    this._afterEachClosed = [];
  }
  get(name) {
    const pascalName = toPascalName(name);
    if (this._root) {
      return (
        this._modals[name] || this._modals[pascalName] || this._root.get(name)
      );
    }
    return this._modals[name] || this._modals[pascalName];
  }
  push({ name = "", on = {}, props = {} } = {}) {
    const mid = _globalMid++;

    const component = this.get(name);
    if (!component) {
      throw new Error(
        `[vue-modal-router].push can not find modal "${name}",register first`
      );
    }

    if (isPlainObject(component)) {
      this._innerPush({
        name,
        mid,
        component,
        on,
        props
      });
      return mid;
    }
    if (isFn(component)) {
      const cPromise = component();
      if (cPromise && cPromise.then) {
        cPromise.then(Comp => {
          this._innerPush({
            name,
            mid,
            component: Comp,
            on,
            props
          });
        });
      }
      return mid;
    }
  }
  _innerPush({ mid, name, on = {}, component = {}, props = {} } = {}) {
    const modalOptions = {
      mid,
      name,
      component,
      props,
      on
    };
    if (this._root) {
      this._root._beforeEachOpen.forEach(fn => {
        fn(modalOptions);
      });
    }
    this._beforeEachOpen.forEach(fn => {
      fn(modalOptions);
    });

    this._modalComponents.push(modalOptions);
  }
  beforeEachOpen(fn) {
    if (!isFunction(fn)) {
      throw new Error(
        `[vue-modal-router] beforeEachOpen should pass function but got ${fn}`
      );
    }
    this._beforeEachOpen.push(fn);
    return this;
  }
  afterEachClosed(fn) {
    if (!isFunction(fn)) {
      throw new Error(
        `[vue-modal-router] afterEachClosed should pass function but got ${fn}`
      );
    }
    this._afterEachClosed.push(fn);
    return this;
  }
  closeAll() {
    while (this._modalComponents.length) {
      this._modalComponents.pop();
    }
  }
  close(mid) {
    const ModalComponent = this._modalComponents.find(item => item.mid === mid);
    if (ModalComponent) {
      const { componentInstance, model, delay } = ModalComponent;
      if (componentInstance) {
        const idx = this._modalComponents.findIndex(item => item.mid === mid);
        componentInstance.$set(componentInstance, model, false);
        setTimeout(() => {
          if (idx > -1) {
            this._modalComponents.splice(idx, 1);
            // hooks
            this._afterEachClosed.forEach(fn => {
              fn();
            });
            if (this._root) {
              this._root._afterEachClosed.forEach(fn => {
                fn();
              });
            }
          }
        }, delay);
      }
    }
  }
}

ModalRouter.install = function(Vue, { delay = 200, model = "show" } = {}) {
  Vue.mixin({
    beforeCreate() {
      // 只在根组件挂载了modalRouter的才执行初始化
      if (this.$root.$options.modalRouter) {
        if (this.$options.modalRouter) {
          const modalComponents = [];
          this.$modalRouter = this.$options.modalRouter;
          Vue.util.defineReactive(this, "_modalComponents", modalComponents);
        } else {
          if (this.$options.modals) {
            this.$modalRouter = new ModalRouter(
              this.$options.modals || {},
              this.$root.$modalRouter
            );
          } else {
            this.$modalRouter = this.$root.$modalRouter;
          }
        }
        this.$modalRouter._modalComponents = this.$root._modalComponents;
      }
    },
    created() {
      if (this.$vnode && this.$vnode.data && this.$vnode.data.ModalComponent) {
        const ModalComponent = this.$vnode.data.ModalComponent;
        this[model] = true;

        ModalComponent.componentInstance = this;
        ModalComponent.model = model;
        ModalComponent.delay = delay;

        this.$watch(model, newVal => {
          if (!newVal) {
            const mid = ModalComponent.mid;
            this.$modalRouter.close(mid);
          }
        });
      }
    }
  });
  Vue.component("modal-router-view", ModalRouterView);
  Vue.use(DirectiveModalLink);
};

export default ModalRouter;
