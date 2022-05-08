import { debounce } from './utils'
import { BACK_POSITION } from './const'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      // 保存首页和详情页 item-img-load 事件监听函数
      itemImgListener: null,
    }
  },
  mounted() {
    // 1. 监听GoodsListItem中的图片加载是否完成
    let refresh = debounce(this.$refs.scroll.refresh, 200)
    // 保存 item-img-load 的监听器
    this.itemImgListener = () => {
      refresh()
      // console.log('home / detail refresh');
    }
    this.$bus.$on('item-img-load', this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      // 控制数据：是否显示 BackTop 按钮，默认不显示
      isShowBackTop: false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 0)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  },
  components: {
    BackTop
  }
}