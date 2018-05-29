import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as api from '../../../fetch/api';
import * as util from '../../../util';

import './style.less';

class Submit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  goConfirmOrder(e){
    console.log(this.props.commitParams);
    let currentCommitParams = this.props.commitParams;
    const commitApi = api.commitGoodOrder(currentCommitParams.token, currentCommitParams.goodId, currentCommitParams.number, currentCommitParams.orderType);
      commitApi.then(res => {
        return res.json();
      })
      .then(json => {
        if(json.code != 0){
          util.toast(json.msg)
          return;
        }
        hashHistory.push('/ConfirmOrder/' + json.data.orderId);
      })
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