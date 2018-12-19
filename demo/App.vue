<template>
  <div id="app">
    <h1>VueModalRouter</h1>
    <div>
      <h4>
        element-ui
      </h4>
      <modal-link tag='el-button'
        :to="{name:'el-custom-edit',props:{list:list},on:{test:test}}">custom-edit</modal-link>

      <modal-link tag='el-button'
        :to="{name:'el-custom-edit',props:{list:list},on:{test:test}}">custom-edit-copy</modal-link>

      <modal-link tag='el-button'
        :to="{name:'el-async-user-edit'}">async-user-edit</modal-link>
    </div>
    <div class="mg-t20">
      <h4>
        ant-design-vue
      </h4>
      <modal-link tag='a-button'
        :to="{name:'antd-custom-edit'}">custom-edit</modal-link>
      <modal-link tag='a-button'
        :to="{name:'antd-async-user-edit'}">async-user-edit</modal-link>
    </div>
    <div class="mg-t20">
      <h4>
        tag a link
      </h4>
      <modal-link tag='a'
        href='javascript:;'
        :to="{name:'antd-custom-edit'}">custom-edit</modal-link>
      <modal-link tag='a'
        href='javascript:;'
        :to="{name:'antd-async-user-edit'}">async-user-edit</modal-link>
    </div>
    <div class="mg-t20">
      <h4>
        tag button link
      </h4>
      <modal-link tag='button'
        href='javascript:;'
        :to="{name:'antd-custom-edit'}">custom-edit</modal-link>
      <modal-link tag='button'
        href='javascript:;'
        :to="{name:'antd-async-user-edit'}">async-user-edit</modal-link>
    </div>
    <modal-router-view></modal-router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      list: [1, 2, 3]
    }
  },
  methods: {
    test(color) {
      console.log('test', color)
    }
  }
}
</script>

<style>
#app {
  padding: 40px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.mg-t20 {
  margin-top: 20px;
}
h1,
h2 {
  font-weight: normal;
}

a {
  color: #333;
}
</style>
