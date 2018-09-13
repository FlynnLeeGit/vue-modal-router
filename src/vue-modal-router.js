import { ModalLink } from './modal-link'
import { ModalRouterView } from './modal-router-view'
import { isFn, isDef } from './util'
/**
 * vue-modal-router
 * (c) 2018 FlynnLee
 * @license MIT
 */
class ModalRouter {
  constructor({ routes = [], model = 'show', delay = 200 } = {}) {
    this._routeMap = {}
    this._modalComponents = []

    routes.forEach(route => {
      this._routeMap[route.name] = {
        component: route.component,
        delay: isDef(route.delay) ? route.delay : 200,
        model: route.model || model,
        instances: []
      }
    })
    this._map = {}
  }
  _init(appInstance) {
    this.app = appInstance
  }
  push(
    { name = '', props = {}, on = {}, autoOpen = true } = {},
    onOpen = () => {}
  ) {
    const route = this._routeMap[name]
    if (!route) {
      throw new Error(
        `[VueModalRouter] can not find modal [${name}],register first`
      )
    }
    if (isFn(route.component)) {
      route.component().then(component => {
        component.modalRouteConfig = {
          name,
          delay: route.delay,
          model: route.model,
          autoOpen
        }
        const ModalComponent = {
          component,
          props,
          on,
          callbacks: {
            onOpen
          }
        }
        this._modalComponents.push(ModalComponent)
      })
    } else {
      route.component.modalRouteConfig = {
        name,
        delay: route.delay,
        model: route.model,
        autoOpen
      }
      const ModalComponent = {
        component: route.component,
        props,
        on,
        callbacks: {
          onOpen
        }
      }

      this._modalComponents.push(ModalComponent)
    }
  }
  close(ModalComponet) {
    const index = this._modalComponents.indexOf(ModalComponet)
    this._modalComponents.splice(index, 1)
  }
  registerInstance(name, vm) {
    this._map[name] = this._map[name] || []
    this._map[name].push(vm)
  }
  destroyInstance(name, vm) {
    const vmIndex = this._map[name].indexOf(vm)
    this._map[name].splice(vmIndex, 1)
    vm.$destroy()
  }
}

ModalRouter.install = function(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.modalRouter) {
        /**
         * @type {ModalRouter}
         */
        const modalRouter = this.$options.modalRouter
        this._modalRouter = modalRouter
        modalRouter._init(this)
        Vue.util.defineReactive(
          this,
          '_modalComponents',
          this._modalRouter._modalComponents
        )
      }

      Object.defineProperty(this, '$modalComponents', {
        get() {
          return this.$root._modalComponents
        }
      })
      Object.defineProperty(this, '$modalRouter', {
        get() {
          return this.$root._modalRouter
        }
      })
    },
    created() {
      if (this.$options.modalRouteConfig) {
        const { name, model, delay, autoOpen } = this.$options.modalRouteConfig
        const ModalComponent = this.$options._parentVnode.data.ModalComponent
        this.$modalRouter.registerInstance(name, this)
        if (autoOpen) {
          this[model] = true
        }
        this.$watch(model, newVal => {
          if (!newVal) {
            setTimeout(() => {
              this.$modalRouter.close(ModalComponent)
              this.$modalRouter.destroyInstance(name, this)
            }, delay)
          }
        })
      }
    },
    mounted() {
      if (this.$options.modalRouteConfig) {
        const ModalComponent = this.$options._parentVnode.data.ModalComponent
        const onOpenCallback = ModalComponent.callbacks.onOpen
        onOpenCallback && onOpenCallback(this, this.$options.modalRouteConfig)
      }
    }
  })

  Vue.component(ModalLink.name, ModalLink)
  Vue.component(ModalRouterView.name, ModalRouterView)
}

export default ModalRouter
