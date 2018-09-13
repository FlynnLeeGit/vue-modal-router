<template>
  <div id="app">
    <h1>VueModalRouter</h1>
    <div>
      <h4>
        element-ui
      </h4>
      <modal-link tag='el-button'
        :to="{name:'el-custom-edit',props:{a:6},on:{test:test.bind(null,'3')}}">custom-edit</modal-link>
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
        tag a
      </h4>
      <modal-link tag='a' href='javascript:;'
        :to="{name:'antd-custom-edit'}">custom-edit</modal-link>
      <modal-link tag='a' href='javascript:;'
        :to="{name:'antd-async-user-edit'}">async-user-edit</modal-link>
    </div>
    <modal-router-view></modal-router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
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
