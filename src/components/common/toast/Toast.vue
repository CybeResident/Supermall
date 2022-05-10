<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false,
    }
  },
  methods: {
    show(message = '默认显示', duration = 2000) {
      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
      }, duration)
    },
  },
  props: {},
  components: {},
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;

  padding: 8px 10px;
  margin: auto;

  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
}
</style>
