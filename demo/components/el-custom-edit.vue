<template>
  <el-dialog :visible.sync="show" title="custom-edit">
    <p class="title">form here {{list}}</p>
    <el-button @click="onClickAdd">add item1222</el-button>
    <el-button @click="emitTest">emitEvent</el-button>
    <el-button v-modal-link="{name:'el-user-edit'}">inner Modal open edit</el-button>
    <el-button @click="close">close</el-button>
  </el-dialog>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    onClickAdd() {
      this.list.push(4);
    },
    close() {
      this.emitTest();
      this.show = false;
    },
    emitTest() {
      this.$emit("test");
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 20px;
}
</style>


