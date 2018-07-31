import React from 'react';
import { hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

import noMoreGood from '../../static/img/noMoreGood-bg.png';
import noMoreOrder from '../../static/img/noMoreOrder-bg.png';

class NoMore extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  gotoGoodList(e){
    hashHistory.replace('/GoodList');
  }
  render() {
    return (
      <div className="noMoreBox">
        {
          this.props.resource == 'goodList' &&
          <div>
            <img src={noMoreGood} />
            <p className="txt">当前还没有商品{<br/>}敬请期待</p>
          </div>
        }
        {
          this.props.resource == 'orderList' &&
          <div>
            <img src={noMoreOrder} />
            <p className="txt">当前还没有订单</p>
            {/*
              <span className="btn" onClick={this.gotoGoodList.bind(this)}>去看看</span>
            */}
          </div>
        }
      </div>
    )
  }
}

export default NoMore