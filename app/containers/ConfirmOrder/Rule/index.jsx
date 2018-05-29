import React from 'react';
import {hashHistory, Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class Rule extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      checked: true
    }
  }
  handleCheckBox(e){
    let checked = e.target.checked;
    console.log(checked)
  }
  componentDidMount(){
  }
  componentWillReceiveProps(nextProps){
  }
  render() {
    return (
      <ul className="ruleBox">
        <input checked={this.state.checked}type='checkbox' onChange={this.handleCheckBox}/>
        <span className="txt">我已阅读并同意<Link className="gotoRule" to="">《用户放心服务协议》</Link></span>
      </ul>
    )
  }
}

export default Rule;