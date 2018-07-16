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

class Logistics extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '物流详情'
		}
	}
  componentWillMount() {
  	let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
	render() {
		return (
			<div className="container logistics">
				<ul className="logisticsList">
					<li className="item">
						<div className="left">
							<span className="circleIcon"></span>
						</div>
						<div className="right">
							<span>已签收，签收人是本人</span>
							<span>2018-04-21  09:14:18</span>
						</div>
					</li>
					<li className="item">
						<div className="left">
							<span className="circleIcon"></span>
						</div>
						<div className="right">
							<span>您的订单已交由【申通快递】承运，物流编号25331458500559</span>
							<span>2018-04-21  09:14:18</span>
						</div>
					</li>
					<li className="item">
						<div className="left">
							<span className="circleIcon"></span>
						</div>
						<div className="right">
							<span>【北京市】【回龙观分公司】您的订单正在派送途中，派件员：周龙，电话：18011112222，感谢您的耐心等待。</span>
							<span>2018-04-21  09:14:18</span>
						</div>
					</li>
					<li className="item">
						<div className="left">
							<span className="circleIcon"></span>
						</div>
						<div className="right">
							<span>您提交了订单，准备出库中</span>
							<span>2018-04-21  09:14:18</span>
						</div>
					</li>
				</ul>
				<a className="serviceIcon" href={`tel:+${constants.SERVICE_PHONE}`}></a>
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
)(Logistics)
