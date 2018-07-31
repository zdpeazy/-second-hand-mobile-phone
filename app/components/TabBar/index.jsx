import React from 'react'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import './style.less'

class TabBar extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.changeTab = this.changeTab.bind(this)
  }
  componentWillMount() {
  }
  render() {
    return (
      <footer id="tabBar-box" style={{'display': 'none'}}>
        <div className="tabBar-wrapper">
          <div className="tab-goodList" onClick={this.changeTab.bind(this)}>
            <span className={this.props.title==='二手手机' ? "icon active" : "icon"}></span>
            <span className={this.props.title==='二手手机' ? "txtActive" : ""}>商品</span>
          </div>
          <div className="tab-sellOrder" onClick={this.changeTabNext.bind(this)}>
            <span className={this.props.title==='我的订单' ? "icon active" : "icon"}></span>
            <span className={this.props.title==='我的订单' ? "txtActive" : ""}>订单</span>
          </div>
        </div>
      </footer>
    )
  }

  changeTab(e) {
    let hash = window.location.hash
    if(hash.indexOf('#/GoodList') > -1){
      return;
    }
    hashHistory.replace('/GoodList');
  }
  changeTabNext(e){
    let hash = window.location.hash
    if(hash.indexOf('#/SellOrder') > -1 || hash.indexOf('#/ResellOrder') > -1){
      return
    }
    hashHistory.replace('/SellOrder');
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
)(TabBar)
