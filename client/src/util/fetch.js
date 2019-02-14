import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000', // node环境的不同，对应不同的baseURL
  timeout: 5000, // 请求的超时时间
  withCredentials: true // 允许携带cookie 这里要设置好  不然请求不带上cookie 后端识别不到session的登录状态
})

export default service;