export const ModalRouterView = {
  name: 'ModalRouterView',
  functional: true,
  render(_, { parent }) {
    const h = parent.$createElement
    const modalComponents = parent.$modalComponents
    if (modalComponents.length) {
      const viewChildren = modalComponents.map(ModalComponent => {
        return h(ModalComponent.component, {
          props: ModalComponent.props,
          on: ModalComponent.on,
          // inject ModalComponet then vm._parentVnode.data will use this
          ModalComponent
        })
      })
      return h('div', { class: 'vue_modal_router_view_modals' }, viewChildren)
    } else {
      return h('div', { class: 'vue_modal_router_view_empty' })
    }
  }
}
