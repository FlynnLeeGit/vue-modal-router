export default (Vue, container) => {
  Vue.directive('modal-link', {
    inserted(el, binding) {
      const $modalRouter = container.modalRouter
      el.__modalTo__ = binding.value
      const modifiers = binding.modifiers
      const eventName = binding.arg || 'click'
      if (!$modalRouter.has(binding.value.name)) {
        if (process && process.env && process.env.NODE_ENV === 'development') {
          console.warn(
            `[VueModalRouter] can not find modal "${
              to.name
            }", please check routes option`
          )
        }
      }
      el.addEventListener(eventName, e => {
        if (modifiers.stop) {
          e.stopPropagation()
        }
        if (modifiers.prevent) {
          e.preventDefault()
        }
        $modalRouter.push(el.__modalTo__)
      })
    },
    update(el, binding) {
      el.__modalTo__ = binding.value
    }
  })
}
