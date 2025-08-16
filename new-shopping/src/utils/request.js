// 创建 axis 实例，将来可创建出来的实例，进行自定义配置
// 好处：不会污染原始的 axis 实例
import { Toast } from 'vant'
import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000

})

// 自定义配置 "请求/响应 拦截器"
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '请求中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  const token = store.getters['user/getToken']
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 对响应的内容做什么（默认axios会包裹一层data，需要响应拦截器中处理一下）
  // 从响应中提取数据对象
  const res = response.data

  // 检查业务状态码是否为成功状态（200通常表示业务操作成功）
  if (res.status !== 200) {
    // 如果状态码异常，使用Toast组件显示后端返回的错误信息
    Toast(res.message)

    // 返回一个被拒绝的Promise，携带错误信息
    // 这会触发Promise链中的catch()方法
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }

  // 后续代码（当状态码为200时执行）

  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
// 导出配置好的实例
export default instance
