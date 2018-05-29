import React from 'react';
import {  hashHistory, browserHistory, Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class OrderList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	componentDidMount() {
	}
	render() {
		return (
			<ul className="container resellOrderList">
				<li className="item">
					<div className="label resellPrice">
						<span className="price">转售金额：￥500.00</span>
						<span className="status runing">待送货上门</span>
					</div>
					<div className="label time">转售时间：2018-03-07 10:55:33</div>
					<div className="label orderId">转售订单号：d25sfs33sf0sslfk754dsa22slfk75</div>
				</li>
				<li className="item">
					<div className="label resellPrice">
						<span className="price">转售金额：￥500.00</span>
						<span className="status">待送货上门</span>
					</div>
					<div className="label time">转售时间：2018-03-07 10:55:33</div>
					<div className="label orderId">转售订单号：d25sfs33sf0sslfk754dsa22slfk75</div>
					<div className="label btnBox">
						<span className="empty"></span>
						<span className="btn confirm">确认交易</span>
					</div>
				</li>
			</ul>
		);
	}
}

export default OrderList;