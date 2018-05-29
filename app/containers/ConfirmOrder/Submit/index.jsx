import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as util from '../../../util';

import './style.less';

class Submit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  goConfirmOrder(e){
    let commitParams = Object.assign(this.props.data, {
      token: this.props.token,
      orderId: this.props.orderId,
      totalMoney: this.props.orderInfo.order.totalMoney
    })
    util.toast('支付暂未开通' + ' 支付参数：' + JSON.stringify(commitParams));
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