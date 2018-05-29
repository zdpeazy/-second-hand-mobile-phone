import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import { historyBack } from '../../util';

import './index.less';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      showActive: false
    }
  }
  componentWillMount(){
  }
  render() {
    return (
      <div className={`header ${this.props.title == '登录' ? 'active' : ''}`}>
        <div className="goback" onClick={historyBack}>
          <i className="goback-icon"></i>
        </div>
        <div className="title">{this.props.title}</div>
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return {
    title: state.pageTitle.title
  }
}
let mapDispatchToProps = (dispatch)=>{
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
