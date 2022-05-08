<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tab-click', index)
    },
  },
  components: {},
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 1.5;
  font-size: 15px;
  background-color: #fff;
}

.tab-control .tab-control-item {
  flex: 1;
  padding: 5px;
}

.tab-control .tab-control-item span {
  padding: 5px;
}

.tab-control .active {
  color: var(--color-high-text);
}

.tab-control .active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
