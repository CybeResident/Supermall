<template>
  <div id="home">
    <nav-bar class="home-nav">
      <span slot="left">左边</span>
      <span slot="middle">购物街</span>
      <span slot="right">右边</span>
    </nav-bar>

    <tab-control
      class="tab-control-top"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlTop"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="home-content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiper-img-load="swiperImgLoad"
      ></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods" class="goods-list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import HomeFeatureView from './childComps/HomeFeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin'

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
      // 记录 TabControl 的 offsetTop
      tabOffsetTop: 0,
      // 记录 TabControl 的吸顶状态
      isTabFixed: false,
      // 保存当前滚动位置Y
      saveY: 0,
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  mixins: [itemListenerMixin],
  created() {
    // 1. 请求 轮播图、推荐 数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {},
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)

    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1. 保存垂直滚动方向的Y坐标
    this.saveY = this.$refs.scroll.getScrollY()
    // 2. 取消全局事件 item-img-load 的监听
    this.$bus.$off('item-img-load')
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
      if (this.$refs.tabControlTop !== undefined) {
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControlTop.currentIndex = index
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      // 1. 判断 回到顶部 按钮是否出现
      this.isShowBackTop = -position.y > 1000

      // 2. 判断 TabControl 是否吸顶
      this.isTabFixed = -position.y >= this.tabOffsetTop - 44
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad() {
      // 赋值，记录TabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
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
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 调用finishPullUp，为下一次 pullingUp 事件作准备
        this.$refs.scroll.finishPullUp()
      })
    },
  },
}
</script>

<style scoped>
#home {
  height: calc(100vh - 54px);
  /* padding-top: 44px; */
  /* position: relative; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 使用原生滚动时，用来防止顶部导航栏一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 1;
} */
.goods-list {
  width: 100%;
  margin-top: 10px;
}
.home-content {
  height: calc(100% - 44px);
  /* height: 400px; */
  overflow: hidden;
  /* position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0; */
}

.tab-control-top {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 1;
}
</style>