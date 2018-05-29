import { get } from './get';
import { post } from './post'

// 获取验证码
export function getCateData(phone) {
  const result = post('/api/user/loginpre', {
    phone: phone
  });
  return result
}

// 登录提交
export function login(phone, validCode) {
  const result = post('/api/user/login', {
    phone: phone,
    validCode: validCode
  })
  return result
}

// 获取商品列表
export function getGoodList(token, pageNo, pageSize) {
  const result = get('/api/commodity/list', {
    token: token,
    pageNo: pageNo,
    pageSize: pageSize
  })
  return result
}

// 获取商品详情
export function getGoodDetail(token, goodId) {
  const result = get('/api/commodity/detail', {
    token: token,
    id: goodId
  })
  return result
}


// 获取属性
export function getGoodProperty(token) {
  const result = get('/api/commodity/select', {
    token: token
  })
  return result
}

// 确认订单
// orderType 1 转售订单  0 销售订单
export function commitGoodOrder(token, goodId, needCount, orderType) {
  const result = post('/api/commodity/commit', {
    token: token,
    commodityId: goodId,
    needCount: needCount,
    orderType: orderType
  })
  return result
}

// 销售确认订单查询/api/order/detail
export function orderDetail(token, orderId) {
  const result = get('/api/order/detail', {
    token: token,
    id: orderId
  })
  return result
}

// 销售订单地址列表
export function adressList(token) {
  const result = get('/api/shop/receiver', {
    token: token
  })
  return result
}

