export default {
  install(Vue) {
    Vue.directive('modal-link', {
      bind(el, binding, vnode) {
        el.__modalTo__ = binding.value
        const eventName = binding.arg || 'click'
        const modifiers = binding.modifiers
        el.addEventListener(eventName, e => {
          if (modifiers.stop) {
            e.stopPropagation()
          }
          if (modifiers.prevent) {
            e.preventDefault()
          }
          vnode.context.$modalRouter.push(el.__modalTo__)
        })
      },
      componentUpdated(el, binding, vnode) {
        el.__modalTo__ = binding.value
      }
    })
  }
}
