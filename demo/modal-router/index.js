import CustomEdit from '../components/el-custom-edit.vue'
import UserEdit from '../components/el-user-edit'
import AntdCustomEdit from '../components/antd-custom-edit.vue'
import Vue from 'vue'
const ModalRouter =
  process.env.NODE_ENV === 'development'
    ? require('../../src/vue-modal-router.js').default
    : require('../../dist/vue-modal-router.js')

Vue.use(ModalRouter, {
  delay: 200,
  model: 'show'
})

const modalRouter = new ModalRouter({
  'el-custom-edit': CustomEdit,
  'el-user-edit': UserEdit,
  AntdCustomEdit
})

export default modalRouter
