<template>
  <div id="home">
    <nav-bar class="home-nav">
      <span slot="left">左边</span>
      <span slot="middle">购物街</span>
      <span slot="right">右边</span>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <home-feature-view></home-feature-view>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    ></tab-control>
    <goods-list :goods="showGoods" class="goods-list-pop"></goods-list>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
      <li>31</li>
      <li>32</li>
      <li>33</li>
      <li>34</li>
      <li>35</li>
      <li>36</li>
      <li>37</li>
      <li>38</li>
      <li>39</li>
      <li>40</li>
      <li>41</li>
      <li>42</li>
      <li>43</li>
      <li>44</li>
      <li>45</li>
      <li>46</li>
      <li>47</li>
      <li>48</li>
      <li>49</li>
      <li>50</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from './childComponents/HomeSwiper.vue'
import HomeRecommendView from './childComponents/HomeRecommendView.vue'
import HomeFeatureView from './childComponents/HomeFeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,

    NavBar,
    TabControl,
    GoodsList,
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
      })
    },
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
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
</style>