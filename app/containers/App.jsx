import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { initRem, dateFormat } from '../util';
import Loading from '../components/Loading';
import judgeAuth from '../util/auth';
import * as actionsFromOtherFile from '../actions/actions';
import Header from '../components/header';
import TabBar from '../components/TabBar';
import OrderTabBar from '../components/OrderTabBar';

class App extends React.Component {
	constructor(props, context){
		super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
      showTab: false,
      showOrderTab: false,
			initDone: true
		}
	}
  shouldShowTab() {
    // 是否显示底部 tab切换栏
    let showTabPage = ['#/GoodList?', '#/SellOrder?', '#/ResellOrder?']
    let len = showTabPage.length
    let hash = window.location.hash

    this.state.showTab = showTabPage.some((item)=>{
      return hash.indexOf(item) === 0
    })
  }
  shouldShowOrderTab() {
    // 是否显示订单 tab切换栏
    let showTabOderPage = ['#/SellOrder?', '#/ResellOrder?']
    let len = showTabOderPage.length
    let hash = window.location.hash

    this.state.showOrderTab = showTabOderPage.some((item)=>{
      return hash.indexOf(item) === 0
    })
  }
  getUserInfo(userInfo, cb){
    let _this = this, actions = this.props.actionsActive;
    if(userInfo == null){
      // push 或者 replace
      hashHistory.replace('/#/');
    } else {
      actions.getUserInfo({
        token: userInfo.token,
        phone: userInfo.phone
      })
      typeof(cb) == 'function' ? cb() : '';
      // hashHistory.replace('/GoodList');
    }
  }
  // componentDidUpdate (){
  //   let hash = window.location.hash;
  //   let userInfo = judgeAuth();
  //   this.getUserInfo(userInfo, function(){
  //     let hash = window.location.hash;
  //     let isToken = hash.indexOf('#/?') > -1 && userInfo.token != 'undefined',
  //         isPhone = hash.indexOf('#/?') > -1 && userInfo.isPhone != 'undefined';
  //     if(isToken && isPhone){
  //       hashHistory.push('/GoodList');
  //     }
  //   });
  // }
  componentWillReceiveProps(newProps) {
    this.shouldShowTab();
    this.shouldShowOrderTab();
  }
  componentWillMount() {
    initRem();
    dateFormat();
    this.shouldShowTab()
    this.shouldShowOrderTab();
    let userInfo = judgeAuth();
    console.log(userInfo)
    this.getUserInfo(userInfo, function(){
      let hash = window.location.hash;
      let isToken = hash.indexOf('#/?') > -1 && userInfo.token != 'undefined',
          isPhone = hash.indexOf('#/?') > -1 && userInfo.isPhone != 'undefined';
      if(isToken && isPhone){
        hashHistory.push('/GoodList');
      }
    });
  }
  componentDidMount(){
  }
  render() {
    return (
      <div>
        <Header/>
        {
          this.state.showOrderTab && <OrderTabBar/>
        }
      	{
      		this.state.initDone
      		? this.props.children
      		: <Loading/>
      	}
        {
          this.state.showTab && <TabBar/>
        }
        <div className="toast-wrap hide">
          <span className="toast-msg"></span>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state)=>{
  return {
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
)(App)