<template>
  <div>
    <div class="mask"></div>
    <div class="content">
      custom-div
    </div>
  </div>
</template>

<style scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.3);
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 200px;
  margin: auto;
  background-color: #fff;
  width: 300px;
  padding: 16px;
}
</style>