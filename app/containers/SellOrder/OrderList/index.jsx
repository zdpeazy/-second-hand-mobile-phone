import React from 'react';
import {  hashHistory, browserHistory, Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class OrderList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	orderDetail(){
		hashHistory.push('/OrderDetail/1');
	}
	render() {
		return (
			<ul className="orderListBox">
				<li className="item" onClick={this.orderDetail.bind(this)}>
					<div className="statusInfo">
						<span className="orderId">单号：13214141515141243</span>
						<span className="status">待提货</span>
					</div>
					<div className="goodInfo">
						<div className="imgBox">
							<img src="//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/413931857221134f081b9f26c38fdef6.jpg?thumb=1&w=720&h=792" />
						</div>
						<div className="info">
							<div className="props">OPPO R11s Plus 64GB 香槟色</div>
							<div className="priceInfo">
								<span className="price">￥2399.00</span>
								<span className="number">×1</span>
							</div>
						</div>
					</div>
					<div className="timeInfo">
						<span className="time">2018-10-15 10:15:33</span>
						<span className="totalPrice">合计：￥2229.00</span>
					</div>
					<div className="btnBox">
						<div className="emptyDiv"></div>
						<div className="btnRight">
							<span className="receiving">确认收货</span>
							<span className="resell">卖了赚钱</span>
						</div>
					</div>
				</li>
				<li className="item">
					<div className="statusInfo">
						<span className="orderId">单号：13214141515141243</span>
						<span className="status">待提货</span>
					</div>
					<div className="goodInfo">
						<div className="imgBox">
							<img src="//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/413931857221134f081b9f26c38fdef6.jpg?thumb=1&w=720&h=792" />
						</div>
						<div className="info">
							<div className="props">OPPO R11s Plus 64GB 香槟色</div>
							<div className="priceInfo">
								<span className="price">￥2399.00</span>
								<span className="number">×1</span>
							</div>
						</div>
					</div>
					<div className="timeInfo">
						<span className="time">2018-10-15 10:15:33</span>
						<span className="totalPrice">合计：￥2229.00</span>
					</div>
					<div className="btnBox">
						<div className="emptyDiv"></div>
						<div className="btnRight">
							<span className="resell">卖了赚钱</span>
						</div>
					</div>
				</li>
				<li className="item">
					<div className="statusInfo">
						<span className="orderId">单号：13214141515141243</span>
						<span className="status">待提货</span>
					</div>
					<div className="goodInfo">
						<div className="imgBox">
							<img src="//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/413931857221134f081b9f26c38fdef6.jpg?thumb=1&w=720&h=792" />
						</div>
						<div className="info">
							<div className="props">OPPO R11s Plus 64GB 香槟色</div>
							<div className="priceInfo">
								<span className="price">￥2399.00</span>
								<span className="number">×1</span>
							</div>
						</div>
					</div>
					<div className="timeInfo">
						<span className="time">2018-10-15 10:15:33</span>
						<span className="totalPrice">合计：￥2229.00</span>
					</div>
					<div className="btnBox">
						<div className="emptyDiv"></div>
						<div className="btnRight">
							<span className="resell">卖了赚钱</span>
						</div>
					</div>
				</li>
			</ul>
		);
	}
	componentDidMount() {
	}
}

export default OrderList;