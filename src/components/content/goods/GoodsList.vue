<template>
  <div class="goods">
    <goods-list-item
      v-for="item in goods"
      :key="item.title"
      :goodsItem="item"
      class="goods-item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  components: {
    GoodsListItem,
  },
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
}

.goods .goods-item {
  flex: none;
  width: 45%;
}
</style>
