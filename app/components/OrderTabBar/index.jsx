import React from 'react'
import { Link, hashHistory } from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class orderTabBar extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.changeTab = this.changeTab.bind(this)

    this.state = {
      currentTab: 'orderTab-sellOrder'
    }
  }
  componentWillMount() {
    let hash = window.location.hash
    if(hash.indexOf('#/SellOrder') > -1){
      this.setState({
        currentTab: 'orderTab-sellOrder'
      })
    } else {
       this.setState({
        currentTab: 'orderTab-resellOrder'
      })
    }
  }
  render() {
    return (
      <footer id="orderTabBar-box">
        <div className="tabBar-wrapper">
          <div className="orderTab-sellOrder" onClick={this.changeTab}>
            <span className={this.state.currentTab==='orderTab-sellOrder' ? "active" : ""}>销售订单</span>
          </div>
          <div className="orderTab-resellOrder" onClick={this.changeTab}>
            <span className={this.state.currentTab==='orderTab-resellOrder' ? "active" : ""}>转售订单</span>
          </div>
        </div>
      </footer>
    )
  }

  changeTab(e) {
    this.setState({
      currentTab: e.currentTarget.className
    })
    if(e.currentTarget.className == 'orderTab-sellOrder'){
      hashHistory.replace('/SellOrder');
    } else {
      hashHistory.replace('/ResellOrder');
    }
  }
}

export default orderTabBar