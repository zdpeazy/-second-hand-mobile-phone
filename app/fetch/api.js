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
export function commitGoodOrder(token, goodId, needCount, orderType, resaleOrderFrom) {
  let commitInfo = {
    token: token,
    commodityId: goodId,
    needCount: needCount,
    orderType: orderType,
    orderChannel: 0
  }
  if(resaleOrderFrom){
    commitInfo = Object.assign({}, commitInfo, {
      resaleOrderFrom: resaleOrderFrom,
      pickUpWay: 0
    })
  }
  const result = post('/api/commodity/commit', commitInfo)
  return result
}

// 销售和转售确认订单查询/api/order/detail
export function orderDetail(token, orderId) {
  const result = get('/api/order/detail', {
    token: token,
    orderNo: orderId
  })
  return result
}

// 销售订单地址列表（自提地址已废弃）
export function adressList(token) {
  const result = get('/api/shop/receiver', {
    token: token
  })
  return result
}
// 用户地址查询
export function userAddress(token){
  const result = get('/api/address/list', {
    token: token
  })
  return result
}
// 用户添加地址/api/address/add
export function addAddress(addressInfo){
  const result = post('/api/address/add', addressInfo)
  return result
}

// 用户删除地址/api/address/add
export function delAddress(token, userAddrId){
  const result = post('/api/address/del', {
    token: token,
    userAddrId: userAddrId
  })
  return result
}

// 支付
export function orderPay(params) {
  const result = post('/api/commodity/pay', params)
  return result
}

// 获取销售和转售订单列表
export function orderList(token, orderType) {
  const result = get('/api/order/list', {
    token: token,
    orderType: orderType
  })
  return result
}

// 获取销售订单详情
export function payDetail(token, orderId) {
  const result = get('/api/order/payDetail', {
    token: token,
    orderNo: orderId
  })
  return result
}

// 请求发货/api/order/userAskDelivery
export function askDelivery(token, orderId) {
  const result = post('/api/order/userAskDelivery', {
    token: token,
    orderNo: orderId
  })
  return result
}

// 确认收货/api/order/userConfirmPickup---(已废弃)

export function oldc_onfirmPickup(token, orderId) {
  const result = post('/api/order/userConfirmPickup', {
    token: token,
    orderNo: orderId
  })
  return result
}

// 新确认收货（成交）接口
export function confirmPickup(token, orderId) {
  const result = post('/api/confirm/deal', {
    token: token,
    orderNo: orderId
  })
  return result
}

// 转售订单确认成交 /api/confirm/deal
export function confirmDeal(token, orderId) {
  const result = post('/api/confirm/deal', {
    token: token,
    orderNo: orderId
  })
  return result
}
// 查询物流信息
export function logisticsQuery(token, orderId) {
  const result = post('/api/shipment/query', {
    token: token,
    orderNo: orderId
  })
  return result
}