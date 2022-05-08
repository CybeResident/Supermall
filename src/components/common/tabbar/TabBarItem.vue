<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  data() {
    return {
      // isActive: true,
    }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red',
    },
  },
  methods: {
    itemClick() {
      this.$router.push({
        path: this.path,
      })
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    },
  },
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  height: 54px;
  font-size: 14px;
}

.tab-bar-item:hover {
  background-color: #e3e5e7;
}

.tab-bar-item img {
  width: 24px;
  object-fit: contain;
  vertical-align: middle;
}

/* .active {
  color: #f00;
} */
</style>