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
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	gotoReSellDetail(e){
		let orderId = e.currentTarget.getAttribute('data-orderId');
		hashHistory.push('/ResellDetail/' + orderId)
	}
	judgeStatusDesc(status){
		let desc = '', descStatus = 0;
		switch(status){
			case 0:
			desc = '待送货上门';
			descStatus = 0;
			break;
			case 1:
			desc = '待质检';
			descStatus = 1;
			break;
			case 2:
			desc = '质检完'
			descStatus = 2;
			break;
			default:
			desc = '交易完成';
			descStatus = 3;
			break;
		}
		return desc;
	}
	confirmDeal(e){
		let isOk = confirm('确认转售');
		if(isOk){
			let orderId = e.currentTarget.getAttribute('data-orderId');
			let confirmDealApi = api.confirmDeal(this.props.userInfo.token, orderId);
	    confirmDealApi.then(res => {
	      return res.json();
	    }).then(json => {
	      if(json.code != 0){
	        util.toast(json.msg);
	        return;
	      }
	      util.toast('确认成交！');
	      setTimeout(function(){
	      	window.location.reload();
	      }, 1000)
	    })
		} else {
			util.toast('已取消');
		}
	}
	componentDidMount() {
	}
	render() {
		console.log(this.props.data)
		let orderList = this.props.data;
		return (
			<ul className="container resellOrderList">
				{
					orderList.map((item, index) => {
						return (
							<li className="item" key={index}>
								<div data-orderId={item.orderInfo.orderNo} onClick={this.gotoReSellDetail.bind(this)}>
									<div className="label resellPrice">
										<span className="price">转售金额：￥{item.orderInfo.actualPrice}</span>
										<span className={`status ${item.orderInfo.resaleStatus == 0 ? 'runing' : ''}`}>{this.judgeStatusDesc(item.orderInfo.resaleStatus)}</span>
									</div>
									<div className="label time">转售时间：{new Date(item.orderInfo.createTime).format('yyyy-MM-dd hh:mm:ss')}</div>
									<div className="label orderId">转售订单号：{item.orderInfo.orderNo}</div>
								</div>
								{
									item.orderInfo.resaleStatus == 2 &&
									<div className="label btnBox">
										<span className="empty"></span>
										<span className="btn confirm" data-orderId={item.orderInfo.orderNo} onClick={this.confirmDeal.bind(this)}>确认成交</span>
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
