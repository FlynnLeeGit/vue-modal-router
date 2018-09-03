<template>
  <el-dialog :visible.sync='show'
    title='custom-edit'>
    <p>
      form here {{a}}
    </p>
    <el-button @click='test'>emitEvent</el-button>
    <modal-link tag='el-button'
      :to="{name:'el-user-edit'}">
      inner Modal open edit
    </modal-link>
  </el-dialog>
</template>

<script>
export default {
  props: {
    a: {
      type: Number
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    test() {
      this.$emit('test')
    }
  }
}
</script>

