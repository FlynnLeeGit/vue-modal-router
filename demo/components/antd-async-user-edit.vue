<template>
    <a-modal v-model='show'
        title='async user modal'>
        this is async modal
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

