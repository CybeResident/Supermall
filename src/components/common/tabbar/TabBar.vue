<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  background-color: #f3f5f7;
  /* box-shadow: rgba(243, 245, 247, 0.8) 0 -5px 4px 1px; */

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>