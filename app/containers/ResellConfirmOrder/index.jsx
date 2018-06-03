import React from 'react';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';

import * as api from '../../fetch/api';
import * as util from '../../util';

import './style.less';

class ResellConfirmOrder extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '确认下单',
      confirmGoodInfo: null,
      addressInfo: [],
      addressId: 0
		}
	}
  // 获取当前确认订单的信息
  getOrderDetail(){
    const orderDetailApi = api.orderDetail(this.props.userInfo.token, this.props.params.orderId);
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
  gotoAddressList(){
    hashHistory.push('/addressList');
  }
  handleSubmit(e){
    util.toast('正在转售中...');
    let goodId = e.currentTarget.getAttribute('data-goodId')
    const commitApi = api.commitGoodOrder(this.props.userInfo.token, goodId, 1, 1, this.props.params.orderId, this.state.addressId);
    commitApi.then(res => {
      return res.json();
    })
    .then(json => {
      if(json.code != 0){
        util.toast(json.msg)
        return;
      }
      hashHistory.replace('/ResellDetail/' + json.data.orderNo);
    })
  }
  componentWillMount(){
    let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
    this.getOrderDetail();
  }
  componentDidMount() {
    let _this = this, addressId = '';
    let addressNo = this.props.selectAddressInfo.selectId ? this.props.selectAddressInfo.selectId : 0;
    this.getAdressList(function(data){
      addressId = data[addressNo].id;
      _this.setState({
        addressId: addressId
      })
    })
  }
  componentWillUnmount() {
  }
	render() {
    let orderInfo = this.state.confirmGoodInfo;
    let selectId = this.props.selectAddressInfo.selectId ? this.props.selectAddressInfo.selectId : this.state.addressId;
    let selectAdress = this.state.addressInfo[selectId];
		return (
			<div className="container resellConfirmOrder">
        {
          orderInfo && selectAdress ?
          <div>
            <div className="resell-flow">
              <h4 className="title">回收流程</h4>
              <div className="flow">
                <div className="flow-bg"></div>
              </div>
            </div>
            <div className="goodInfo">
              <h3 className="title">宝贝信息</h3>
              <div className="name">{orderInfo.commodity.name + ' ' + orderInfo.commodity.subName}</div>
              <div className="info">
                <span>{orderInfo.commodity.newLevel}</span>
                <span>{orderInfo.commodity.color}</span>
                <span>存储容量 {orderInfo.commodity.capacity}</span>
                <span>{orderInfo.commodity.channel}</span>
              </div>
            </div>
            <div className="estimatePrice">
              <h3 className="title">宝贝预估价格</h3>
              <div className="info">
                <span className="txt">手机预估价格为</span>
                <span className="price">￥{orderInfo.order.estimatedPrice}</span>
              </div>
            </div>
            <div className="addressBox" onClick={this.gotoAddressList.bind(this)}>
              <h3>送货地址</h3>
              <div className="selectAddress">
                <i className="address-icon"></i>
                <div className="addressInfo">
                  <span className="txt">{selectAdress.receiveAddress}</span>
                  <span className="phone">{selectAdress.receivePhone}</span>
                </div>
              </div>
            </div>
            <div className="submitBox">
              <button data-goodId={orderInfo.order.commodityId} onClick={this.handleSubmit.bind(this)}>确认下单</button>
            </div>
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
    selectAddressInfo: state.selectAddressInfo
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
)(ResellConfirmOrder)
