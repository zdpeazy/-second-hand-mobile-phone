import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Price extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <ul className="priceBox">
        <li className="price">
          <span className="label">商品金额</span>
          <span className="number">￥{this.props.data.order.totalMoney}</span>
        </li>
        {/*<li className="freight">
          <span className="label">运费</span>
          <span className="number">+￥0.00</span>
        </li>*/}
      </ul>
    )
  }
}

export default Price;