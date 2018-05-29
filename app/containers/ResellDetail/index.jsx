import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import './style.less';

import * as api from '../../fetch/api';

class ResellDetail extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '订单详情'
		}
	}
  componentWillMount(){
    let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
  }
  // 将页面标题文案 存储到Redux中
  componentDidMount() {
  }
  componentWillUnmount() {
  }
	render() {
		return (
			<div className="container resellDetail">
        <li className="item">
        	<div className="label nameStatus">
        		<span className="name">OPPO R11s Plus </span>
        		<span className="status runing">待送货上门</span>
        	</div>
					<div className="label resellPrice">转售金额：￥500.00</div>
					<div className="label time">转售时间：2018-03-07 10:55:33</div>
					<div className="label orderId">转售订单号：d25sfs33sf0sslfk754dsa22slfk75</div>
					<div className="label btnBox">
						<span className="empty"></span>
						<span className="btn confirm">联系客服</span>
					</div>
				</li>
				<li className="item">
        	<div className="label nameStatus">
        		<span className="name">OPPO R11s Plus </span>
        		<span className="status">质检完</span>
        	</div>
					<div className="label resellPrice">转售金额：￥500.00</div>
					<div className="label time">转售时间：2018-03-07 10:55:33</div>
					<div className="label orderId">转售订单号：d25sfs33sf0sslfk754dsa22slfk75</div>
					<div className="label btnBox">
						<span className="empty"></span>
						<span className="btn">联系客服</span>
						<span className="btn confirm">确认提交</span>
					</div>
				</li>
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
