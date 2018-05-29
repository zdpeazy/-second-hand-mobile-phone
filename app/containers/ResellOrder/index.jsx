import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import OrderList from './OrderList';

import * as api from '../../fetch/api';

class ResellOrder extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '我的订单'
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
			<div className="container">
				<OrderList/>
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
)(ResellOrder)
