import { debounce } from './utils'

export const itemListenerMixin = {
  data() {
    return {
      // 保存首页item-img-load事件监听函数
      itemImgListener: null,
    }
  },
  mounted() {
    // 1. 监听GoodsListItem中的图片加载是否完成
    let refresh = debounce(this.$refs.scroll.refresh, 200)
    // 保存 item-img-load 的监听器
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('item-img-load', this.itemImgListener)
  }
}