export default (Vue,container) => {
  Vue.directive('modal-link', {
    inserted(el, binding) {
      const $modalRouter = container.modalRouter
      const to = binding.value
      const modifiers = binding.modifiers
      const eventName = binding.arg || 'click'
      if (!$modalRouter.has(to.name)) {
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
        $modalRouter.push(Object.assign(to))
      })
    }
  })
}
