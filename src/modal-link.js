// component ModalLink
export const ModalLink = {
  name: 'ModalLink',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    to: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {
      modalClickHander: null,
      modalRouteInstance: null,
      modalRouteModel: ''
    }
  },
  methods: {
    onClick(e) {
      // preventDefault because of form case
      e.preventDefault()
      if (this.modalRouteInstance) {
        this.modalRouteInstance[this.modalRouteModel] = true
      } else {
        this.modalClickHander = function(modal, routeOptions) {
          modal[routeOptions.model] = true
        }
      }
    },
    onMousedown(e) {
      // clear hanlder
      this.clickHander = null
      this.modalRouteInstance = null
      if (e.button === 0) {
        this.to.autoOpen = false
        this.$modalRouter.push(
          Object.assign(this.to),
          (modal, routeOptions) => {
            this.modalRouteInstance = modal
            this.modalRouteModel = routeOptions.model
            this.modalClickHander && this.modalClickHander(modal, routeOptions)
          }
        )
      }
    }
  },
  created() {
    const isDev =
      process && process.env && process.env.NODE_ENV === 'development'
    if (isDev) {
      console.warn(
        '[VueModelRouter] modal-link component is deperated,use directive v-modal-link instead',
        this.to
      )
    }
    if (!this.$modalRouter.has(this.to.name)) {
      if (isDev) {
        console.warn(
          `[VueModalRouter] can not find modal "${
            this.to.name
          }", please check routes option`
        )
      }
    }
  },
  render(h) {
    const options = {
      props: this.$attrs
    }
    if (['a', 'button', 'input', 'div', 'span'].indexOf(this.tag) > -1) {
      options.on = {
        click: this.onClick,
        mousedown: this.onMousedown
      }
    } else {
      options.nativeOn = {
        click: this.onClick,
        mousedown: this.onMousedown
      }
    }

    return h(this.tag, options, this.$slots.default)
  }
}
