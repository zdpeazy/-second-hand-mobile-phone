import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Address extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  gotoAddressList(){
    hashHistory.push('/addressList');
  }
  componentDidMount(){
  }
  componentWillReceiveProps(nextProps){
  }
  render() {
    let selectAddress = this.props.data;
    return (
      <div className="addressBox" onClick={this.gotoAddressList.bind(this)}>
        <h3>提货地址</h3>
        <div className="selectAddress">
          <i className="address-icon"></i>
          <div className="addressInfo">
            <span className="txt">{selectAddress.receiveAddress}</span>
            <span className="phone">{selectAddress.receivePhone}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Address;