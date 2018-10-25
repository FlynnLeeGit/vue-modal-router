// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAntd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.min.css'
import modalRouter from './modal-router'

import './second-import'
Vue.config.productionTip = false

// Using plugin
Vue.use(ElementUI)
Vue.use(VueAntd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  modalRouter,
  template: '<App/>',
  components: { App }
})
