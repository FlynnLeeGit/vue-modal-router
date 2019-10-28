export const ModalRouterView = {
  name: 'ModalRouterView',
  functional: true,
  render(_, { parent }) {
    const h = parent.$createElement
    const modalComponents = parent.$root._modalComponents
    return h(
      'div',
      {},
      modalComponents.map(ModalComponent =>
        h(ModalComponent.component, {
          props: ModalComponent.props,
          on: ModalComponent.on,
          // 传入mid 唯一标识
          ModalComponent: ModalComponent
        })
      )
    )
  }
}
