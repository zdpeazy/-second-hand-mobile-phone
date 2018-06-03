import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import './style.less';

import * as api from '../../fetch/api';
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
	        		<span className="name">{orderInfo.commodity.name + ' ' + orderInfo.commodity.subName}</span>
	        		<span className="status runing">{this.judgeStatusDesc(orderInfo.order.resaleStatus)}</span>
	        	</div>
						<div className="label resellPrice">转售金额：￥{orderInfo.order.estimatedPrice}</div>
						<div className="label time">转售时间：{orderInfo.order.createTime}</div>
						<div className="label orderId">转售订单号：{orderInfo.order.orderNo}</div>
						<div className="label btnBox">
							<span className="empty"></span>
							<a className="btn confirm" href={`tel:+${constants.SERVICE_PHONE}`}>联系客服</a>
							{
								orderInfo.order.recyclingStatus == 2 &&
								<span className="btn confirm">确认提交</span>
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
