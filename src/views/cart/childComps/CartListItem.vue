<template>
  <div id="cart-list-item">
    <check-button
      :is-checked="itemInfo.checked"
      @click.native="checkClick"
    ></check-button>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">x{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: '',
  data() {
    return {}
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    },
  },
  components: {
    CheckButton,
  },
}
</script>

<style scoped>
#cart-list-item {
  width: 100%;
  height: 110px;
  /* font-size: 0; */
  padding: 5px;
  border-bottom: 1px solid #ccc;

  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  height: 100%;
  /* padding: 2px; */
  /*border: 1px solid #ccc;*/
}

.item-img img {
  /* width: 80px;
  height: 100px; */
  height: 100%;
  object-fit: contain;
  /* display: block; */
  border-radius: 5px;
}

.item-info {
  flex: 1;

  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 5px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>

