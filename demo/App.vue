<template>
  <div id="app">
    <h1>VueModalRouter</h1>
    <div>
      <h4>element-ui</h4>
      <el-button v-modal-link="{name:'el-custom-edit',props:{list:list},on:{test:test}}">custom-edit</el-button>
      <el-button
        v-modal-link="{name:'el-custom-edit',props:{list:list},on:{test:test}}"
      >custom-edit-copy</el-button>
      <el-button v-modal-link="{name:'el-async-user-edit'}">async-user-edit</el-button>
    </div>
    <div class="mg-t20">
      <h4>ant-design-vue</h4>
      <a-button v-modal-link="{name:'antd-custom-edit'}">custom-edit</a-button>
      <a-button v-modal-link="{name:'antd-async-user-edit'}">async-user-edit</a-button>
    </div>
    <div class="mg-t20">
      <h4>tag a link</h4>
      <a href="javascript:;" v-modal-link="{name:'antd-custom-edit'}">custom-edit</a>
      <a href="javascript:;" v-modal-link="{name:'antd-async-user-edit'}">async-user-edit</a>
    </div>
    <div class="mg-t20">
      <h4>tag button link</h4>
      <button href="javascript:;" v-modal-link="{name:'antd-custom-edit'}">custom-edit</button>
      <button href="javascript:;" v-modal-link="{name:'antd-async-user-edit'}">async-user-edit</button>
    </div>
    <modal-link :to="{name:'el-custom-edit'}">deperated</modal-link>
    <modal-router-view></modal-router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      list: [1, 2, 3]
    };
  },
  mounted() {
    this.$nextTick().then(() => {
      this.list = [4, 5, 6];
    });
  },
  methods: {
    test(color) {
      console.log("test", color);
    }
  }
};
</script>

<style>
#app {
  padding: 40px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
