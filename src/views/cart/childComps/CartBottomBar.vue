<template>
  <div class="cart-bottom-bar">
    <div class="bar-left">
      <div class="check-all">
        <check-button
          :is-checked="isCheckedAll"
          @click.native="checkClick"
        ></check-button>
        <span>全选</span>
      </div>
      <div class="total-price">合计：￥{{ totalPrice }}</div>
    </div>
    <div class="bar-right" @click="calcClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartList', 'cartLength']),

    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
        .toFixed(2)
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length
    },
    isCheckedAll() {
      if (!this.cartLength) return false
      // 1.
      // return !this.cartList.filter((item) => !item.checked).length
      // 2.
      // return this.cartList.every((item) => item.checked)
      // 3. （性能稍好）
      return !this.cartList.find((item) => !item.checked)
    },
  },
  methods: {
    checkClick() {
      if (this.isCheckedAll) {
        // 全部选中
        this.cartList.forEach((item) => (item.checked = false))
      } else {
        // 部分或全部不选中
        this.cartList.forEach((item) => (item.checked = true))
      }
      // 【简化】item.checked 的值，就是 this.isCheckedAll 的反值
      // 【失败】当 item.checked 改变时，isCheckedAll 也会改变
      // this.cartList.forEach((item) => (item.checked = !this.isCheckedAll))
    },
    calcClick() {
      if (!this.isCheckedAll) {
        this.$toast.show('请选择商品')
      }
    },
  },
  components: {
    CheckButton,
  },
}
</script>

<style scoped>
.cart-bottom-bar {
  width: 100%;
  height: 35px;

  display: flex;
}
.cart-bottom-bar .bar-left {
  background-color: #e1e2e3;
  width: 70%;
  padding-left: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.cart-bottom-bar .bar-left .check-all {
  margin-right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-bottom-bar .bar-right {
  text-align: center;
  line-height: 35px;
  background-color: #ff7f50;
  color: #fff;
  flex: 1;
}
</style>
