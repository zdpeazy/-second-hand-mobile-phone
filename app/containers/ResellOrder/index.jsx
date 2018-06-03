import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import OrderList from './OrderList';
import NoMore from '../../components/NoMore';

import * as api from '../../fetch/api';
import * as util from '../../util/index';

class ResellOrder extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '我的订单',
      emptyOrders: 'orderList',
      showLoading: true,
      reSellOrderList: []
		}
	}
  // 获取当前销售订单列表
  getSellOrderList(){
    let orderListApi = api.orderList(this.props.userInfo.token, 1);
    orderListApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        util.toast(json.msg);
        return;
      }
      this.setState({
        showLoading: false,
        reSellOrderList: json.data.list
      })
    })
  }
  componentWillMount(){
    let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
    this.getSellOrderList();
  }
	render() {
    let orderList = this.state.reSellOrderList;
		return (
			<div className="container">
        {
          orderList.length > 0 && !this.state.showLoading ?
          <OrderList data={orderList}/>
          : <NoMore resource={this.state.emptyOrders} />
        }
        {
          this.state.showLoading &&
          <Loading/>
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
)(ResellOrder)
