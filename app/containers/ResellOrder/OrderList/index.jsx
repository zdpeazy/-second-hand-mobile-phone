import React from 'react';
import {  hashHistory, browserHistory, Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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
	componentDidMount() {
	}
	render() {
		console.log(this.props.data)
		let orderList = this.props.data;
		// orderList[0].orderInfo.recyclingStatus = 3;
		return (
			<ul className="container resellOrderList">
				{
					orderList.map((item, index) => {
						return (
							<li className="item" key={index} data-orderId={item.orderInfo.orderNo} onClick={this.gotoReSellDetail.bind(this)}>
								<div className="label resellPrice">
									<span className="price">转售金额：￥{item.orderInfo.estimatedPrice}</span>
									<span className={`status ${item.orderInfo.recyclingStatus == 0 ? 'runing' : ''}`}>{this.judgeStatusDesc(item.orderInfo.recyclingStatus)}</span>
								</div>
								<div className="label time">转售时间：{new Date(item.orderInfo.createTime).format('yyyy-MM-dd h:m:s')}</div>
								<div className="label orderId">转售订单号：{item.orderInfo.orderNo}</div>
								{
									item.orderInfo.recyclingStatus == 2 &&
									<div className="label btnBox">
										<span className="empty"></span>
										<span className="btn confirm">确认成交</span>
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

export default OrderList;