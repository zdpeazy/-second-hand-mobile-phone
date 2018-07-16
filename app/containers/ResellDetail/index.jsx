import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import './style.less';

import * as api from '../../fetch/api';
import * as util from '../../util/index';
import * as constants from '../../constants/constants.js';

class ResellDetail extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '订单详情',
			confirmGoodInfo: null
		}
	}
  judgeStatusDesc(status){
		let desc = '', descStatus = 0;
		switch(status){
			case 0:
			desc = '待质检';
			descStatus = 0;
			break;
			case 1:
			desc = '质检完';
			descStatus = 1;
			break;
			case 2:
			desc = '已关闭'
			descStatus = 2;
			break;
			default:
			desc = '已完成';
			descStatus = 3;
			break;
		}
		return desc;
	}
  // 获取当前确认订单的信息
  getOrderDetail(){
    const orderDetailApi = api.orderDetail(this.props.userInfo.token, this.props.params.reSellOrderId);
    orderDetailApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        util.toast(json.msg);
        return;
      }
      this.setState({
        confirmGoodInfo: json.data
      })
    })
  }
  confirmDeal(e){
		let isOk = confirm('是否确认成交');
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
	lookLogistics(e){
		alert('查看物流');
	}
  componentWillMount() {
  	let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
  	this.getOrderDetail();
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
	render() {
		let orderInfo = this.state.confirmGoodInfo;
		return (
			<div className="container resellDetail">
				{
					orderInfo ?
	        <li className="item">
	        	<div className="label nameStatus">
	        		<span className="name">{orderInfo.name + ' ' + orderInfo.subName}</span>
	        		<span className={`status ${orderInfo.orderInfo.resaleStatus == 0 ? 'runing' : ''}`}>{this.judgeStatusDesc(orderInfo.orderInfo.resaleStatus)}</span>
	        	</div>
						<div className="label resellPrice">转售金额：￥{orderInfo.orderInfo.actualPrice}</div>
						<div className="label time">转售时间：{new Date(orderInfo.orderInfo.createTime).format('yyyy-MM-dd hh:mm:ss')}</div>
						<div className="label orderId">转售订单号：{orderInfo.orderInfo.orderNo}</div>
						<div className="label btnBox">
							<span className="empty"></span>
							<a className="btn confirm" href={`tel:+${constants.SERVICE_PHONE}`}>联系客服</a>
							{
								orderInfo.orderInfo.resaleStatus == 1 &&
								<span className="btn confirm" data-orderId={orderInfo.orderInfo.orderNo} onClick={this.confirmDeal.bind(this)}>确认提交</span>
							}
							{
								orderInfo.orderInfo.resaleStatus == 3 &&
								<span className="btn confirm" data-orderId={orderInfo.orderInfo.orderNo} onClick={this.lookLogistics.bind(this)}>查看物流</span>
							}
						</div>
					</li>
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
)(ResellDetail)
