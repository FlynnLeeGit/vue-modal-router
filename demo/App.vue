<template>
  <div id="app">
    <h1>VueModalRouter</h1>
    <div>
      <h4>element-ui</h4>
      <el-button v-modal-link="{name:'el-custom-edit',props:{list:list},on:{test:test}}">custom-edit</el-button>
      <el-button
        v-modal-link="{name:'el-custom-edit',props:{list:list},on:{test:test}}"
      >custom-edit-234</el-button>
      <el-button
        v-modal-link="{name:dynamicName,props:{list:list},on:{test:test}}"
      >dynamic dynamicName</el-button>
      <el-button
        v-modal-link="{name:'el-custom-edit-test',props:{list:list},on:{test:test}}"
      >local modals</el-button>
    </div>
    <div class="mg-t20">
      <h4>ant-design-vue</h4>
      <a-button v-modal-link="{name:'antd-custom-edit'}">custom-edit</a-button>
    </div>
    <div class="mg-t20">
      <h4>tag a link</h4>
      <a href="javascript:;" v-modal-link="{name:'antd-custom-edit'}">custom-edit</a>
    </div>
    <div class="mg-t20">
      <h4>tag button link</h4>
      <button href="javascript:;" v-modal-link="{name:'antd-custom-edit'}">custom-edit</button>
    </div>
    <modal-router-view></modal-router-view>
  </div>
</template>

<script>
import ElCustomEditTest from "./components/el-custom-edit";
export default {
  name: "app",
  data() {
    return {
      list: [1, 1],
      dynamicName: "unknown"
    };
  },
  modals: {
    ElCustomEditTest
  },
  mounted() {
    setTimeout(() => {
      this.dynamicName = "el-custom-edit";
    }, 1000);
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
