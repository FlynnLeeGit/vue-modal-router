<template>
  <el-dialog :visible.sync='show'
    title='custom-edit'>
    <p>
      form here {{list}}
    </p>
    <el-button @click="onClickAdd">add item</el-button>
    <el-button @click='emitTest'>emitEvent</el-button>
    <modal-link tag='el-button'
      :to="{name:'el-user-edit'}">
      inner Modal open edit
    </modal-link>
    <el-button @click='close'>close</el-button>
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
      show: false
    }
  },
  methods: {
    onClickAdd() {
      this.list.push(4)
    },
    close() {
      this.emitTest()
      this.show = false
    },
    emitTest() {
      this.$emit('test')
    }
  }
}
</script>

