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

class ConfirmOrder extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '确认订单',
      confirmGoodInfo: null,
      addressInfo: [],
      addressId: 0,
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
        util.toast(json.msg)
        return;
      }
      this.setState({
        confirmGoodInfo: json.data
      })
    })
  }
  // 获取提货地址信息
  getAdressList(cb){
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
  }
  setPayChannel(value){
    let actions = this.props.actionsActive;
    this.setState({
      payChannel: value,
      commitInfo: {
        payChannelId: value,
        addressId: this.state.commitInfo.addressId
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
  // 将页面标题文案 存储到Redux中
  componentDidMount() {
    let _this = this, addressId = '';
    let addressNo = this.props.selectAddressInfo.selectId ? this.props.selectAddressInfo.selectId : 0;
    this.getAdressList(function(data){
      addressId = data[addressNo].id;
      _this.setState({
        commitInfo: {
          payChannelId: _this.state.payChannel,
          addressId: addressId
        }
      })
    })
  }
	render() {
    let orderInfo = this.state.confirmGoodInfo;
    let selectId = this.props.selectAddressInfo.selectId ? this.props.selectAddressInfo.selectId : this.state.addressId
    let selectAdress = this.state.addressInfo[selectId];
		return (
			<div className="container confirmOrder" style={{background: '#f2f2f2'}}>
          {
            orderInfo && selectAdress && this.state.commitInfo ?
            <div>
              <GoodInfo data={orderInfo}/>
              <PayMode checkPayFn={this.setPayChannel.bind(this)}/>
              <Address data={selectAdress}/>
              <Price data={orderInfo}/>
              <Rule/>
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
