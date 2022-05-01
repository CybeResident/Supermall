<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="middle" class="title">
        <div
          v-for="(item, index) in titles"
          :key="item"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    // 点击选项时，通过改变 currentIndex，实现样式变化
    titleClick(index) {
      this.currentIndex = index
    },
    // 返回按钮的返回功能
    backClick() {
      this.$router.back()
    },
  },
  components: {
    NavBar,
  },
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title .title-item {
  flex: 1;
}
.title .active {
  color: var(--color-high-text);
}

.back img {
  vertical-align: middle;
}
</style>
