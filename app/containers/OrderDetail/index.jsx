import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import * as api from '../../fetch/api';
import * as util from '../../util/index';

import * as constants from '../../constants/constants.js';

import './style.less';

class OrderDetail extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			title: '订单详情',
			orderInfo: null
		}
	}
	judgeStatus(payStatus, status){
		let statusDesc = '', statusClassName = '', btnStaus = 0;
		console.log(payStatus)
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
				case 4:
				statusDesc = '已完成';
				btnStaus = 4;
				break;
				default:
				statusDesc = '已完成';
				btnStaus = 2;
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
	judgePayChannel(payWay){
		let desc = '', payMethod = '';
		switch(payWay) {
			case 1:
			desc = '微信';
			payMethod = '无';
			break;
			case 2:
			desc = '支付宝';
			payMethod = '无';
			break;
			case 3:
			desc = '橙子分期';
			payMethod = '单期';
			break;
			default:
			desc = '其他方式';
			payMethod = '无';
			break;
		}
		return {
			desc: desc,
			payMethod: payMethod
		};
	}
	getOrderDetail(){
		let orderDetailApi = api.payDetail(this.props.userInfo.token, this.props.params.orderId);
		orderDetailApi.then(res => {
			return res.json();
		}).then(json => {
			if(json.code != 0){
        util.toast(json.msg);
        return;
      }
      this.setState({
      	orderInfo: json.data
      })
		})
	}
	componentWillMount(){
		this.getOrderDetail();
	}
	render() {
		let data = this.state.orderInfo;
		return (
			<div className="container orderDetail">
        {
        	data ?
        	<div>
        		<div className="status">{this.judgeStatus(data.orderInfo.payStatus, data.orderInfo.orderStatus).desc}
		        </div>
		        <div className="addressBox">
			        <h3>提货地址</h3>
			        <div className="selectAddress">
			          <i className="address-icon"></i>
			          <div className="addressInfo">
			            <span className="txt">{data.selfAddressInfo.address}</span>
			            <span className="phone">{data.selfAddressInfo.phone}</span>
			          </div>
			        </div>
			      </div>
			      <ul className="itemBox">
			      	<li className="item">
			      		<span className="left">提货方式</span>
			      		<span className="right">自提</span>
			      	</li>
			      	<li className="item">
			      		<span className="left">商品名称</span>
			      		<span className="right">{data.name + ' ' + data.subName}</span>
			      	</li>
			      	<li className="item">
			      		<span className="left">单价</span>
			      		<span className="right">￥{data.unitPrice}</span>
			      	</li>
			      	<li className="item">
			      		<span className="left">数量</span>
			      		<span className="right">￥{data.needCount}</span>
			      	</li>
			      	<li className="item">
			      		<span className="left">总价</span>
			      		<span className="right">￥{data.orderInfo.totalMoney}</span>
			      	</li>
			      </ul>
			      <ul className="itemBox">
			      	<li className="item">
			      		<span className="left">付款方式</span>
			      		<span className="right">{this.judgePayChannel(data.orderInfo.payWay).desc}</span>
			      	</li>
			      	<li className="item">
			      		<span className="left">分期方式</span>
			      		<span className="right">{this.judgePayChannel(data.orderInfo.payWay).payMethod}</span>
			      	</li>
			      </ul>
			      <ul className="itemBox">
			      	<li className="item">
			      		<span className="left">属性</span>
			      		<span className="right">{data.desc}</span>
			      	</li>
			      </ul>
			      <ul className="itemBox">
			      	<li className="item">
			      		<span className="left">购买时间</span>
			      		<span className="right">{data.orderInfo.createTime}</span>
			      	</li>
			      </ul>
			      <ul className="itemBox">
			      	<li className="item">
			      		<span className="left">订单号</span>
			      		<span className="right">{data.orderInfo.orderNo}</span>
			      	</li>
			      </ul>
			      <a className="service" href={`tel:+${constants.SERVICE_PHONE}`}>
			      	<i className="servicePhone"></i>
			      	<span>联系客服</span>
			      </a>
        	</div>
        	: <Loading/>
        }
      </div>
		);
	}
}

let mapStateToProps = (state)=>{
  return {
  	userInfo: state.userInfo
  }
}
let mapDispatchToProps = (dispatch)=>{
  return {
  	actionsActive: bindActionCreators(actionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetail)