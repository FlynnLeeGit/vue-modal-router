import Vue from 'vue'

new Vue({
  render(h) {
    return h('h1', 'Second Mounted App')
  }
}).$mount('#second')
