export const ModalRouterView = {
  name: 'ModalRouterView',
  functional: true,
  render(_, { parent }) {
    const h = parent.$createElement
    const modalComponents = parent.$root._modalComponents
    console.log('modalComponents', modalComponents)
    return h(
      'div',
      {},
      modalComponents.map(ModalComponent =>
        h(ModalComponent.component, {
          props: ModalComponent.props,
          on: ModalComponent.on,

          // 传入构造对象
          ModalComponent
        })
      )
    )
  }
}
