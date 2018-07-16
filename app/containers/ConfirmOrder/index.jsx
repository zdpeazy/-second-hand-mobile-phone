import React from 'react';
import { hashHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import GoodInfo from './GoodInfo';
import PayMode from './PayMode';
import Address from './Address';
import Price from './Price';
import Rule from './Rule';
import Submit from './Submit';


import * as api from '../../fetch/api';
import * as util from '../../util';

let timer = null, jumpTimer = null;

class ConfirmOrder extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '确认订单',
      confirmGoodInfo: null,
      addressInfo: [],
      userAddressId: 0, // 用户选择当前地址的id
      selectId: 0, // 用户选择当前地址列表的下表
      payChannel: this.props.payModelInfo.payModel ? this.props.payModelInfo.payModel : 0,
      commitInfo: null
		}
	}
  // 获取当前确认订单的信息
  getOrderDetail(){
    const orderDetailApi = api.orderDetail(this.props.userInfo.token, this.props.params.orderId);
    orderDetailApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        if(timer){clearTimeout(timer);clearTimeout(jumpTimer);}
        util.toast(json.msg);
        return;
      }
      console.log(json.data)
      if(json.data.orderInfo.payStatus * 1 == 2){
        util.toast('支付成功');
        jumpTimer = setTimeout(() => {
          hashHistory.replace('/SellOrder');
        }, 1000)
      }
      this.setState({
        confirmGoodInfo: json.data
      })
    })
    this.intervalOrderStatus();
  }
  intervalOrderStatus(){
    timer = setTimeout(() => {
      this.getOrderDetail();
    }, 3000)
  }
  // 获取自提-提货地址信息
  /*getAdressList(cb){
    const adressListApi = api.adressList(this.props.userInfo.token);
    adressListApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        util.toast(json.msg)
        return;
      }
      this.setState({
        addressInfo: json.data
      })
      return cb(json.data)
    })
  }*/
  // 获取用户地址
  getUserAddress(cb){
    const userAddressApi = api.userAddress(this.props.userInfo.token);
    userAddressApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        util.toast(json.msg)
        return;
      }
      this.setState({
        addressInfo: json.data
      })
      return cb(json.data);
    })
  }
  setPayChannel(value){
    let actions = this.props.actionsActive;
    this.setState({
      payChannel: value,
      commitInfo: {
        payWay: parseInt(value) + 1,
        userAddressId: this.state.commitInfo.userAddressId
      }
    })
  }
  componentWillMount(){
    let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
    this.getOrderDetail();
  }
  componentWillUnmount(){
    if(timer){clearTimeout(timer);clearTimeout(jumpTimer);}
  }
  // 将页面标题文案 存储到Redux中
  componentDidMount() {
    let _this = this, userAddressId = '';
    let userSelectId = this.props.selectAddressInfo.selectId ? this.props.selectAddressInfo.selectId : 0;
    this.getUserAddress(function(data){
      if(data.length > 0){
        userAddressId = data[userSelectId].id;
      }
      _this.setState({
        commitInfo: {
          payWay: parseInt(_this.state.payChannel) + 1,
          userAddressId: userAddressId
        },
        selectId: userSelectId
      })
    })
  }
	render() {
    let orderInfo = this.state.confirmGoodInfo;
    let userAddressInfo = this.state.addressInfo[this.state.selectId];
    {/*let selectId = this.props.selectAddressInfo.selectId ? this.props.selectAddressInfo.selectId : this.state.addressId
    let selectAdress = this.state.addressInfo[selectId];*/}
		return (
			<div className="container confirmOrder" style={{background: '#f2f2f2'}}>
          {
            orderInfo && this.state.commitInfo ?
            <div>
              <GoodInfo data={orderInfo}/>
              <PayMode checkPayFn={this.setPayChannel.bind(this)}/>
              <Address data={userAddressInfo}/>
              <Price data={orderInfo}/>
              <Submit
                data={this.state.commitInfo}
                orderId={this.props.params.orderId}
                token={this.props.userInfo.token}
                orderInfo={orderInfo} />
            </div>
            : <Loading/>
          }
      </div>
		);
	}
}

let mapStateToProps = (state)=>{
  return {
  	userInfo: state.userInfo,
    selectAddressInfo: state.selectAddressInfo,
    payModelInfo: state.payModelInfo
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
)(ConfirmOrder)
