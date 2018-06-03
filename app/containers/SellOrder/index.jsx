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

import './style.less';

class SellOrder extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '我的订单',
      emptyOrders: 'orderList',
      showLoading: true,
      sellOrderList: []
		}
	}
  // 获取当前销售订单列表
  getSellOrderList(){
    let orderListApi = api.orderList(this.props.userInfo.token, 0);
    orderListApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        util.toast(json.msg);
        return;
      }
      this.setState({
        showLoading: false,
        sellOrderList: json.data.list
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
  // 将页面标题文案 存储到Redux中
  componentDidMount() {
  }
	render() {
    let orderList = this.state.sellOrderList;
		return (
			<div className="container orderList">
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
)(SellOrder)
