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
        console.log(this.$modalRouter)
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
    if (!this.$modalRouter.has(this.to.name)) {
      if (process && process.env && process.env.NODE_ENV === 'development') {
        console.warn(
          `[VueModalRouter] can not find modal "${
            this.to.name
          }", please check routes option`
        )
      }
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        props: this.$attrs,
        nativeOn: {
          click: this.onClick,
          mousedown: this.onMousedown
        }
      },
      this.$slots.default
    )
  }
}
