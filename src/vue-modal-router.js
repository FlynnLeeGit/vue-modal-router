import { ModalRouterView } from './modal-router-view'
import DirectiveModalLink from './directive-modal-link'
import { isFn, isDef } from './util'
import { isFunction } from 'util'
/**
 * vue-modal-router
 * (c) 2018 FlynnLee
 * @license MIT
 */

const toPascalName = name => {
  return name
    .replace(/-([a-z])/g, (r, $1) => $1.toUpperCase())
    .replace(/^[a-z]/, r => r.toUpperCase())
}

let mid = 0

class ModalRouter {
  constructor(modals = {}, root = null) {
    this._modals = modals
    /**
     * @type {ModalRouter}
     */
    this._root = root
    /**
     * 全局数组引用 来自vm.$root._modalComponents
     */
    this._modalComponents = []
    this._beforeEachOpen = []
    this._afterEachClosed = []
    this._init()
  }
  _init() {
    Object.keys(this._modals).forEach(k => {
      // inject $options._isModal
      this._modals[k]._isModal = true
    })
  }
  get(name) {
    const pascalName = toPascalName(name)
    if (this._root) {
      return (
        this._modals[name] || this._modals[pascalName] || this._root.get(name)
      )
    }
    return this._modals[name] || this._modals[pascalName]
  }
  push({ name = '', props = {}, on = {} } = {}) {
    const component = this.get(name)
    if (!component) {
      throw new Error(
        `[vue-modal-router].push can not find modal "${name}",register first`
      )
    }
    const modalMid = mid++
    const modalOptions = {
      mid: modalMid,
      name,
      component,
      props,
      on
    }
    if (this._root) {
      this._root._beforeEachOpen.forEach(fn => {
        fn(modalOptions)
      })
    }
    this._beforeEachOpen.forEach(fn => {
      fn(modalOptions)
    })
    this._modalComponents.push(modalOptions)
    return modalMid
  }
  beforeEachOpen(fn) {
    if (!isFunction(fn)) {
      throw new Error(
        `[vue-modal-router] beforeEachOpen should pass function but got ${fn}`
      )
    }
    this._beforeEachOpen.push(fn)
    return this
  }
  afterEachClosed(fn) {
    if (!isFunction(fn)) {
      throw new Error(
        `[vue-modal-router] afterEachClosed should pass function but got ${fn}`
      )
    }
    this._afterEachClosed.push(fn)
    return this
  }
  close(mid) {
    const { componentInstance, model, delay } = this._modalComponents.find(
      item => item.mid === mid
    )
    const idx = this._modalComponents.findIndex(item => item.mid === mid)

    componentInstance[model] = false

    setTimeout(() => {
      if (idx > -1) {
        this._modalComponents.splice(idx, 1)
        // hooks
        this._afterEachClosed.forEach(fn => {
          fn()
        })
        if (this._root) {
          this._root._afterEachClosed.forEach(fn => {
            fn()
          })
        }
      }
    }, delay)
  }
}

ModalRouter.install = function(Vue, { delay = 200, model = 'show' } = {}) {
  Vue.mixin({
    beforeCreate() {
      // 只在根组件挂载了modalRouter的才执行初始化
      if (this.$root.$options.modalRouter) {
        if (this.$options.modalRouter) {
          const modalComponents = []
          this.$modalRouter = this.$options.modalRouter
          Vue.util.defineReactive(this, '_modalComponents', modalComponents)
        } else {
          if (this.$options.modals) {
            this.$modalRouter = new ModalRouter(
              this.$options.modals || {},
              this.$root.$modalRouter
            )
          } else {
            this.$modalRouter = this.$root.$modalRouter
          }
        }
        this.$modalRouter._modalComponents = this.$root._modalComponents
      }
    },
    created() {
      if (this.$options._isModal) {
        const ModalComponent = this.$vnode.data.ModalComponent
        this[model] = true

        ModalComponent.componentInstance = this
        ModalComponent.model = model
        ModalComponent.delay = delay

        this.$watch(model, newVal => {
          if (!newVal) {
            const mid = ModalComponent.mid
            this.$modalRouter.close(mid)
          }
        })
      }
    }
  })
  Vue.component('modal-router-view', ModalRouterView)
  Vue.use(DirectiveModalLink)
}

export default ModalRouter
