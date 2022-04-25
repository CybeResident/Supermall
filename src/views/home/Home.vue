<template>
  <div id="home">
    <nav-bar class="home-nav">
      <span slot="left">左边</span>
      <span slot="middle">购物街</span>
      <span slot="right">右边</span>
    </nav-bar>

    <scroll
      class="home-content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods" class="goods-list-pop"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComponents/HomeSwiper.vue'
import HomeRecommendView from './childComponents/HomeRecommendView.vue'
import HomeFeatureView from './childComponents/HomeFeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,

    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 记录当前展示的商品列表的类型（名称）
      currentType: 'pop',
      // 控制数据：是否显示 BackTop 按钮，默认不显示
      isShowBackTop: false,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  created() {
    // 1. 请求 轮播图、推荐 数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /*
     *  事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    /*
     *  网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      return getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
  },
}
</script>

<style scoped>
#home {
  height: calc(100vh - 54px);
  padding-top: 44px;
  /* position: relative; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 1;
}
.goods-list-pop {
  width: 100%;
  margin-top: 10px;
}
.home-content {
  height: 100%;
  /* height: 400px; */
  overflow: hidden;
  /* position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0; */
}
</style>