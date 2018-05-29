import React from 'react';

import './style.less';

class OrderDetail extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="container orderDetail">
        <div className="status">
        	交易完成
        </div>
        <div className="addressBox">
	        <h3>提货地址</h3>
	        <div className="selectAddress">
	          <i className="address-icon"></i>
	          <div className="addressInfo">
	            <span className="txt">北京市海淀区知春路硬度大厦208</span>
	            <span className="phone">13261892441</span>
	          </div>
	        </div>
	      </div>
	      <ul className="itemBox">
	      	<li className="item">
	      		<span className="left">提货方式</span>
	      		<span className="right">快递</span>
	      	</li>
	      	<li className="item">
	      		<span className="left">商品名称</span>
	      		<span className="right">OPPO R11S PLUS </span>
	      	</li>
	      	<li className="item">
	      		<span className="left">单价</span>
	      		<span className="right">￥2229.00</span>
	      	</li>
	      </ul>
	      <ul className="itemBox">
	      	<li className="item">
	      		<span className="left">提货方式</span>
	      		<span className="right">快递</span>
	      	</li>
	      	<li className="item">
	      		<span className="left">商品名称</span>
	      		<span className="right">OPPO R11S PLUS </span>
	      	</li>
	      	<li className="item">
	      		<span className="left">单价</span>
	      		<span className="right">￥2229.00</span>
	      	</li>
	      	<li className="item">
	      		<span className="left">提货方式</span>
	      		<span className="right">快递</span>
	      	</li>
	      	<li className="item">
	      		<span className="left">商品名称</span>
	      		<span className="right">OPPO R11S PLUS </span>
	      	</li>
	      	<li className="item">
	      		<span className="left">单价</span>
	      		<span className="right">￥2229.00</span>
	      	</li>
	      	<li className="item">
	      		<span className="left">提货方式</span>
	      		<span className="right">快递</span>
	      	</li>
	      	<li className="item">
	      		<span className="left">商品名称</span>
	      		<span className="right">OPPO R11S PLUS </span>
	      	</li>
	      	<li className="item">
	      		<span className="left">单价</span>
	      		<span className="right">￥2229.00</span>
	      	</li>
	      </ul>
	      <div className="service">
	      	<i className="servicePhone"></i>
	      	<span>联系客服</span>
	      </div>
      </div>
		);
	}
}

export default OrderDetail;