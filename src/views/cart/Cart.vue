<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <slot slot="middle">购物车({{ cartLength }})</slot>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- <div style="height: calc(100vh-44px-40px);background-color=red"></div> -->

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavBar from 'components/common/navBar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

export default {
  name: 'Cart',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartLength']),
  },
  components: {
    NavBar,

    CartList,
    CartBottomBar,
  },
}
</script>

<style scoped>
#cart {
  height: calc(100vh - 54px);
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
}
</style>
