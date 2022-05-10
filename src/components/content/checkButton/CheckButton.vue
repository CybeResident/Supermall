<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img v-show="isChecked" src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  components: {},
}
</script>

<style scoped>
.check-button {
  width: 20px;
  height: 20px;
  border: 1px solid #999;
  margin: 0 5px;
  border-radius: 50%;
  font-size: 0;
  line-height: 0;
}
.check-button > img {
  width: 100%;
  object-fit: contain;
}

.check {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>
