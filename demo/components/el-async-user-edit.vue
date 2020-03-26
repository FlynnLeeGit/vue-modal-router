<template>
  <el-dialog :visible.sync="show" title="async user modal">
    this is async modal
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>

