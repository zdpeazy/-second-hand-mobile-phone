import React from 'react';
import {hashHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../../actions/actions';

import './style.less';

class PayMode extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      channel: this.props.payModelInfo.payModel ? this.props.payModelInfo.payModel : 0
    }
  }
  selectPayMode(e){
    let payValue = e.currentTarget.getAttribute('data-channel'), actions = this.props.actionsActive;
    this.setState({
      channel: payValue
    })
    this.props.checkPayFn(payValue);
    actions.getPayModel({
      payModel: payValue
    })
  }
  componentWillMount(){
    var actions = this.props.actionsActive;
    actions.getPayModel({
      payModel: this.state.channel
    })
  }
  componentDidMount(){
    // var actions = this.props.actionsActive;
    // actions.getPayModel({
    //   payModel: this.state.channel
    // })
  }
  render() {
    return (
      <div className="paymodel">
        <h3>支付方式</h3>
        <ul>
          <li className="item wx" data-channel='0' onClick={this.selectPayMode.bind(this)}>
            <i className="icon"></i>
            <span className="desc">微信</span>
            <span className={`select ${this.state.channel == 0 ? 'selected' : ''}`}></span>
          </li>
          <li className="item ali" data-channel='1' onClick={this.selectPayMode.bind(this)}>
            <i className="icon"></i>
            <span className="desc">支付宝</span>
            <span className={`select ${this.state.channel == 1 ? 'selected' : ''}`}></span>
          </li>
        </ul>
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return {
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
)(PayMode)

/*<li className="item che" data-channel='2' onClick={this.selectPayMode.bind(this)}>
  <i className="icon"></i>
  <span className="desc">橙子分期</span>
  <span className={`select ${this.state.channel == 2 ? 'selected' : ''}`}></span>
</li>*/
