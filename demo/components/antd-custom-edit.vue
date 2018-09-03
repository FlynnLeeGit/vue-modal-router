<template>
  <a-modal v-model='show'
    title='custom-edit'>
    form here
    <modal-link tag='a-button'
      :to="{name:'antd-custom-edit'}">inner antd</modal-link>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

