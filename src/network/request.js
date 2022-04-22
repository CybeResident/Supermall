// 引入 axios 模块
import axios from 'axios'

export function request(config) {
  // 1. 创建 axios 实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://106.54.54.237:8000/api/mn',
    timeout: 5000
  });

  // 2. axios 拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(function (config) {
    // 把拦截掉的 config 返回出去
    return config;
  }, function (err) {
    console.log(err);
  });

  // 2.2 响应拦截
  instance.interceptors.response.use(function (res) {
    // 对响应做处理：只返回 response 里的 data，其他舍弃
    return res.data;
  }, function (err) {
    console.log(err);
  })

  // 3. 发送真正的网络请求：让外界使用 then、catch 等方法
  return instance(config);
}

