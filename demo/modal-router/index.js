import CustomEdit from '../components/el-custom-edit.vue'
import UserEdit from '../components/el-user-edit'
import AntdCustomEdit from '../components/antd-custom-edit.vue'
import Vue from 'vue'
const ModalRouter =
  process.env.NODE_ENV === 'development'
    ? require('../../src/vue-modal-router.js').default
    : require('../../dist/vue-modal-router.js')

Vue.use(ModalRouter)

const modalRouter = new ModalRouter({
  routes: [
    {
      name: 'el-custom-edit',
      component: CustomEdit
    },
    {
      name: 'el-user-edit',
      component: UserEdit
    },
    {
      name: 'el-async-user-edit',
      component: () => import('../components/el-async-user-edit.vue')
    },
    {
      name: 'antd-custom-edit',
      component: AntdCustomEdit
    },
    {
      name: 'antd-async-user-edit',
      component: () => import('../components/antd-async-user-edit.vue')
    }
  ]
})

export default modalRouter
