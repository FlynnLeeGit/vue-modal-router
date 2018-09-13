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
          console.log(modal)
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
  render(h) {
    return h(
      this.tag,
      {
        props: this.$attrs,
        nativeOn: {
          click: this.onClick,
          mousedown: this.onMousedown
        },
        on: {
          click: this.onClick,
          mousedown: this.onMousedown
        }
      },
      this.$slots.default
    )
  }
}
