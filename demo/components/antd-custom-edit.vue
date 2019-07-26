<template>
  <a-modal v-model="show" title="custom-edit">
    <h1 class="h1">form 1235</h1>
    <a-button v-modal-link="{name:'antd-custom-edit'}">inner antd</a-button>
  </a-modal>
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

<style scoped>
.h1 {
  font-size: 22px;
}
</style>


