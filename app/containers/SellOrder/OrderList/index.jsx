import React from 'react';
import {  hashHistory, browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as api from '../../../fetch/api';
import * as util from '../../../util/index';
import * as constants from '../../../constants/constants.js';

import './style.less';

class OrderList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			orderNo: ''
		}
	}
	judgeStatus(status){
		let statusDesc = '', statusClassName = '', btnStaus = 0;
		switch(status) {
			case 0:
			statusDesc = '待付款';
			statusClassName = 'status';
			btnStaus = 0;//0 是未支付状态 1 支付完成待提货  2 已完成展示
			break;
			case 1:
			statusDesc = '已关闭';
			btnStaus = 1;// 商家取消订单已关闭
			break;
			case 2:
			statusDesc = '待发货';
			btnStaus = 2;
			break;
			case 3:
			statusDesc = '待收货';
			btnStaus = 3;
			case 4:
			statusDesc = '待收货';
			btnStaus = 3;
			break;
			default:
			statusDesc = '已完成';
			btnStaus = 5;
			break;
		}
		return {
			desc: statusDesc,
			className: statusClassName,
			btnStaus: btnStaus
		};
	}
	gotoPay(e){
		let isOk = confirm('继续支付');
		if(isOk){
			let orderId = e.currentTarget.getAttribute('data-orderId');
			hashHistory.push('/ConfirmOrder/' + orderId);
		} else {
			util.toast('已取消');
		}
	}
	// 请求发货
	pleaseDelivery(e){
		let orderId = e.currentTarget.getAttribute('data-orderId');
		let isOk = confirm('是否请求发货');
		if(isOk){
			let orderId = e.currentTarget.getAttribute('data-orderId');
			let askDeliveryApi = api.askDelivery(this.props.userInfo.token, orderId);
			askDeliveryApi.then(res => {
				return res.json();
			}).then(json => {
				if(json.code != 0){
	        util.toast(json.msg);
	        return;
	      }
	      util.toast('请求发货成功');
	      setTimeout(() => {
	      	window.location.reload();
	      }, 1000)
			})
		} else {
			util.toast('取消收货');
		}
	}
	// 查看物流接口
	lookLogistics(e){
		let orderId = e.currentTarget.getAttribute('data-orderId');
		hashHistory.push('/Logistics/' + orderId);
	}
	gotoOrderDetail(e){
		let orderId = e.currentTarget.getAttribute('data-orderId');
		hashHistory.push('/OrderDetail/' + orderId);
	}
	// 转售
	reSellBtn(e){
		let btnStatus = e.currentTarget.getAttribute('data-btnStatus');
		let goodId = e.currentTarget.getAttribute('data-goodId');
		let orderId = e.currentTarget.getAttribute('data-orderId');
		hashHistory.push('/ResellConfirmOrder/' + orderId);
	}
	confirmReceipt(e){
		let isOk = confirm('确认收货');
		if(isOk){
			let orderId = e.currentTarget.getAttribute('data-orderId');
			let confirmReceiptApi = api.confirmPickup(this.props.userInfo.token, orderId);
			confirmReceiptApi.then(res => {
				return res.json();
			}).then(json => {
				if(json.code != 0){
	        util.toast(json.msg);
	        return;
	      }
	      util.toast('确认收货成功');
	      setTimeout(() => {
	      	window.location.reload();
	      }, 1000)
			})
		} else {
			util.toast('取消收货');
		}
	}
	componentDidMount() {
	}
	render() {
		let orderList = this.props.data;
		return (
			<ul className="orderListBox">
				{
					orderList.map((item, index) => {
						return (
							<li className="item" key={index}>
								<div className="statusInfo">
									<span className="orderId">单号：{item.orderInfo.orderNo}</span>
									<span className={this.judgeStatus(item.orderInfo.saleStatus).className}>
										{this.judgeStatus(item.orderInfo.saleStatus).desc}
									</span>
								</div>
								<div className="goodInfo"  data-orderId={item.orderInfo.orderNo} onClick={this.gotoOrderDetail.bind(this)}>
									<div className="imgBox">
										<img src={item.image} />
									</div>
									<div className="info">
										<div className="props">{item.name + ' ' + item.subName + ' ' + item.desc}</div>
										<div className="priceInfo">
											<span className="price">￥{item.unitPrice}</span>
											<span className="number">×{item.needCount}</span>
										</div>
									</div>
								</div>
								<div className="timeInfo">
									<span className="time">{new Date(item.orderInfo.createTime).format('yyyy-MM-dd hh:mm:ss')}</span>
									<span className="totalPrice">合计：￥{item.orderInfo.totalMoney}</span>
								</div>
								{
									(this.judgeStatus(item.orderInfo.saleStatus).btnStaus == 0 || this.judgeStatus(item.orderInfo.saleStatus).btnStaus == 2 || this.judgeStatus(item.orderInfo.saleStatus).btnStaus == 3) &&
									<div className="btnBox">
										<div className="emptyDiv"></div>
										{
											this.judgeStatus(item.orderInfo.saleStatus).btnStaus == 0 &&
											<div className="btnRight"  data-orderId={item.orderInfo.orderNo}  onClick={this.gotoPay.bind(this)}>
												<span className="noPay">立即支付</span>
											</div>
										}
										{
											this.judgeStatus(item.orderInfo.saleStatus).btnStaus == 2 &&
											<div className="btnRight"  data-orderId={item.orderInfo.orderNo}>
												<span className="receiving" data-orderId={item.orderInfo.orderNo} onClick={this.pleaseDelivery.bind(this)}>请求发货</span>
												<span className="resell" data-btnStatus={this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).btnStaus} data-orderId={item.orderInfo.orderNo} onClick={this.reSellBtn.bind(this)}>卖了赚钱</span>
											</div>
										}
										{
											this.judgeStatus(item.orderInfo.saleStatus).btnStaus == 3 &&
											<div className="btnRight"  data-orderId={item.orderInfo.orderNo}>
												<a className="servicePhone" href={`tel:+${constants.SERVICE_PHONE}`}>售后</a>
												<span className="logistics" data-orderId={item.orderInfo.orderNo} onClick={this.lookLogistics.bind(this)}>查看物流</span>
												<span className="receiving" data-orderId={item.orderInfo.orderNo} onClick={this.confirmReceipt.bind(this)}>确认收货</span>
											</div>
										}
									</div>
								}
							</li>
						)
					})
				}
			</ul>
		);
	}
}

let mapStateToProps = (state)=>{
  return {
  	userInfo: state.userInfo
  }
}
let mapDispatchToProps = (dispatch)=>{
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)
