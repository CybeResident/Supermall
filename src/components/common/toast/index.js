import Toast from './Toast.vue'

const obj = {}
obj.install = function (Vue) {
  // 1. 创建组件构造器
  const ToastConstructor = Vue.extend(Toast)
  // 2. new 一个组件对象
  const toast = new ToastConstructor()
  // 3. 将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4. $el 对应的就是上面的 div
  document.body.appendChild(toast.$el)
  // 5. 给 Vue 原型对象注入属性，赋值组件对象 toast，让项目中的所有组件都能使用
  Vue.prototype.$toast = toast
}

export default obj