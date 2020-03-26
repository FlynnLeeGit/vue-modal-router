<template>
  <div id="app">
    <h1>VueModalRouter</h1>
    <div>
      <h4>element-ui</h4>
      <el-button
        v-modal-link="{
          name: 'el-custom-edit',
          props: { list: list },
          on: { test: test }
        }"
        >custom-edit</el-button
      >
      <el-button
        v-modal-link="{
          name: 'el-custom-edit',
          props: { list: list },
          on: { test: test }
        }"
        >custom-edit-234</el-button
      >
      <el-button
        v-modal-link="{
          name: dynamicName,
          props: { list: list },
          on: { test: test }
        }"
        >dynamic dynamicName</el-button
      >
      <el-button
        v-modal-link="{
          name: 'el-custom-edit-test',
          props: { list: list },
          on: { test: test }
        }"
        >local modals</el-button
      >
      <el-button @click="onClickAsyncModal">anync modal</el-button>
    </div>
    <div class="mg-t20">
      <h4>ant-design-vue</h4>
      <a-button v-modal-link="{ name: 'antd-custom-edit' }"
        >custom-edit</a-button
      >
    </div>
    <div class="mg-t20">
      <h4>tag a link</h4>
      <a href="javascript:;" v-modal-link="{ name: 'antd-custom-edit' }"
        >custom-edit</a
      >
    </div>
    <div class="mg-t20">
      <h4>tag button link</h4>
      <button href="javascript:;" v-modal-link="{ name: 'antd-custom-edit' }">
        custom-edit
      </button>
    </div>
    <div class="mg-t20">
      <h4>close by api</h4>
      <button @click="onOpenModal">open1</button>
    </div>
    <div class="mg-t20">
      <h4>close by api</h4>
      <button @click="onOpenModal2">open2</button>
    </div>

    <div class="close-btn">
      <button @click="onCloseModal">close1</button>
      <button @click="onCloseModal2">close2</button>
      <button @click="onCloseModal3">closeAll</button>
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
    ElCustomEditTest,
    AsyncUserEdit: () =>
      import(/* webpackChunkName: "async-user-edit" */"./components/el-async-user-edit")
  },
  mounted() {
    setTimeout(() => {
      this.dynamicName = "el-custom-edit";
    }, 1000);
  },
  methods: {
    test(color) {
      console.log("test", color);
    },
    onOpenModal() {
      this.mid1 = this.$modalRouter.push({
        name: "el-custom-edit-test"
      });
    },
    onCloseModal() {
      this.$modalRouter.close(this.mid1);
    },
    onOpenModal2() {
      this.mid2 = this.$modalRouter.push({
        name: "custom-div"
      });
    },
    onCloseModal2() {
      this.$modalRouter.close(this.mid2);
    },
    onCloseModal3() {
      this.$modalRouter.closeAll();
    },
    onClickAsyncModal() {
      this.$modalRouter.push({
        name: "async-user-edit"
      });
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
.close-btn {
  position: fixed;
  left: 8px;
  bottom: 8px;
  z-index: 3000;
}
</style>
