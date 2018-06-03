import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as util from '../../../util';
import * as api from '../../../fetch/api';

import './style.less';

class Submit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  goConfirmOrder(e){
    util.toastModel('请稍等，支付中...');
    if(this.props.data.payWay == 1 || this.props.data.payWay == 3){
      util.toast('暂时未开通此支付方式');
      return;
    }
    let commitParams = Object.assign(this.props.data, {
      token: this.props.token,
      orderNo: this.props.orderId,
      orderType: 0,
      isAgree: 1,
      totalMoney: this.props.orderInfo.order.totalMoney
    })
    let orderPayApi = api.orderPay(commitParams);
    orderPayApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code * 1 != 0){
        util.toast(json.msg);
        return;
      }
      window.location.href = json.data.qrCodeStr;
    })
    //util.toast('支付暂未开通' + ' 支付参数：' + JSON.stringify(commitParams));
  }
  componentDidMount(){
  }
  render() {
    return (
      <div className="submitBox">
        <button onClick={this.goConfirmOrder.bind(this)}>立即购买</button>
      </div>
    )
  }
}

export default Submit;