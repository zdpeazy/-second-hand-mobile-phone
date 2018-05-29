import React from 'react';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import Advertising from './Advertising';
import List from './List';
import NoMore from '../../components/NoMore';
import LoadMore from '../../components/LoadMore';

import * as api from '../../fetch/api';
import * as util from '../../util'; //toast

import './style.less';

class GoodList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '二手手机',
      emptyGoods: 'goodList',
      showFooter: false,
			shouldLoad: false,
      showLoading: false,
			goodListData: [],
			hasMore: false,
			isLoadingMore: false,
			page: 1,
      pageSize: 20,
      timeoutId: null //节流
		}
	}
  loadFirstPageData(){
  	const apiResult = api.getGoodList(this.props.userInfo.token, this.state.page, this.state.pageSize);
    this.setState({showLoading: true})
  	this.resultHandle(apiResult);
  }
  resultHandle(result){
  	return result.then((res) => {
  		return res.json();
  	}).then((json) => {
      if(json.code != 0){
        util.toast(json.msg);
        if(json.code == -1){
          hashHistory.replace('/');
        }
        return;
      }
      if(json.data.list.length > 0){
        this.setState({
          goodListData: this.state.goodListData.concat(json.data.list),
          hasMore: true,
          showFooter: true,
          showLoading: false
        })
      } else {
        this.setState({
          hasMore: false,
          showLoading: false
        })
      }
      return true
    }).catch((ex)=>{
      console.error('获取商品列表数据报错, ', ex.message);
      this.setState({
        showFooter: false
      })
      return false
    })
  }
  changeShouldLoadState() {
    this.setState({
      shouldLoad: !this.state.shouldLoad
    })
  }
  loadMoreData() {
    const page = this.state.page + 1
    this.setState({
      isLoadingMore: true
    })
    const apiResult = api.getGoodList(this.props.userInfo.token, page, this.state.pageSize)
    const handleResult = this.resultHandle(apiResult)
    handleResult.then(r=>{
      if(r) {
        this.setState({
          page: page,
          isLoadingMore: false
        })
      }
    })
  }
  componentWillMount(){
    // 将页面标题文案 存储到Redux中
    let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
    this.loadFirstPageData();
  }
  componentDidMount() {
  }
	render() {
		return (
			<div className="container goodsList">
				<Advertising/>
				{
          this.state.goodListData.length>0 && this.state.showFooter
          ? <List data={this.state.goodListData}/>
          : <NoMore resource={this.state.emptyGoods}/>
        }
				{
          this.state.hasMore && this.state.goodListData.length>5 &&
          <LoadMore
            shouldLoad={this.state.shouldLoad}
            changeShouldLoadState={this.changeShouldLoadState.bind(this)}
            isLoadingMore={this.state.isLoadingMore}
            loadMoreFn={this.loadMoreData.bind(this)}
            goodLeg={this.state.goodListData.length}/>
        }
        {
          !this.state.hasMore && this.state.showFooter &&
          <span className="loadDidFooter">已经全部加载</span>
        }
        {
          this.state.showLoading &&
          <Loading/>
        }
      </div>
		);
	}
}

let mapStateToProps = (state)=>{
  return {
  	userInfo: state.userInfo
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
)(GoodList)