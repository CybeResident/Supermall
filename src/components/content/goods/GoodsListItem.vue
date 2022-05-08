<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="itemImgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    },
  },
  methods: {
    itemImgLoad() {
      this.$bus.$emit('item-img-load')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    },
  },
  components: {},
}
</script>

<style scoped>
.goods-item {
  display: block;
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-item .goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
  /* border: 1px solid red; */
}

.goods-item .goods-info p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 3px 3px;
}

.goods-item .goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-item .goods-info .favorites {
  position: relative;
}

.goods-item .goods-info .collect {
  position: relative;
}

.goods-item .goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') no-repeat 0 0/100%;
}
</style>
