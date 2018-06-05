import React from 'react';
import {  hashHistory, browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as api from '../../../fetch/api';
import * as util from '../../../util/index';

import './style.less';

class OrderList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			orderNo: ''
		}
	}
	judgeStatus(payStatus, status){
		let statusDesc = '', statusClassName = '', btnStaus = 0;
		if(payStatus && payStatus * 1 == 2){
			switch(status) {
				case 0:
				statusDesc = '待提货';
				statusClassName = 'status';
				btnStaus = 1;//0 是未支付状态 1 支付完成待提货  2 已完成展示
				break;
				case 1:
				statusDesc = '已提货';
				btnStaus = 2;
				break;
				case 3:
				statusDesc = '已完成';
				btnStaus = 4;
				case 4:
				statusDesc = '已完成';
				btnStaus = 4;
				break;
				default:
				statusDesc = '已完成';
				btnStaus = 3;
				break;
			}
		} else {
			statusDesc = '未支付';
			statusClassName = 'status';
			btnStaus = 0;
		}
		return {
			desc: statusDesc,
			className: statusClassName,
			btnStaus: btnStaus
		};
	}
	gotoPay(e){
		let orderId = e.currentTarget.getAttribute('data-orderId');
		hashHistory.push('/ConfirmOrder/' + orderId);
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
		/*if(btnStatus * 1 == 1){
			util.toast('请先确认收货');
			return;
		} else if(btnStatus * 1 == 2){
			util.toast('等待商家确认');
			return;
		}*/
		hashHistory.push('/ResellConfirmOrder/' + orderId);
	}
	confirmReceipt(e){
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
      })
		})
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
									<span className={this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).className}>
										{this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).desc}
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
								<div className="btnBox">
									<div className="emptyDiv"></div>
									{
										this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).btnStaus == 0 &&
										<div className="btnRight"  data-orderId={item.orderInfo.orderNo}  onClick={this.gotoPay.bind(this)}>
											<span className="noPay">立即支付</span>
										</div>
									}
									{
										this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).btnStaus == 1 &&
										<div className="btnRight"  data-orderId={item.orderInfo.orderNo}>
											<span className="receiving" data-orderId={item.orderInfo.orderNo} onClick={this.confirmReceipt.bind(this)}>确认收货</span>
											<span className="resell" data-btnStatus={this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).btnStaus} data-orderId={item.orderInfo.orderNo} onClick={this.reSellBtn.bind(this)}>卖了赚钱</span>
										</div>
									}
									{
										this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).btnStaus == 2 &&
										<div className="btnRight" data-orderId={item.orderInfo.orderNo}>
											<span className="resell" data-btnStatus={this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).btnStaus} data-orderId={item.orderInfo.orderNo} onClick={this.reSellBtn.bind(this)}>卖了赚钱</span>
										</div>
									}
									{
										this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).btnStaus == 3 &&
										<div className="btnRight"  data-orderId={item.orderInfo.orderNo}>
											<span className="resell"  data-orderId={item.orderInfo.orderNo} data-goodId={item.orderInfo.commodityId} data-btnStatus={this.judgeStatus(item.orderInfo.payStatus, item.orderInfo.orderStatus).btnStaus} data-orderId={item.orderInfo.orderNo} onClick={this.reSellBtn.bind(this)}>卖了赚钱</span>
										</div>
									}
								</div>
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
