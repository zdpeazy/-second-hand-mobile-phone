import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Loading from '../../components/Loading';
import GalleryView from './GalleryView';
import GoodInfoDesc from './GoodInfoDesc';
import GoodProperty from './GoodProperty';
import SelectProperty from './SelectProperty';
import DescTabsView from './DescTabsView';
import Submit from './Submit';

import * as actionsFromOtherFile from '../../actions/actions';
import * as api from '../../fetch/api';
import * as util from '../../util';

class GoodsDetail extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			title: '商品详情',
			goodId: null,
			goodDetailData: null,
			goodProperty: null,
			showSlectProperty: false,
			number: 1,
			commitParams: {
				token: this.props.userInfo.token,
				goodId: this.props.params.goodId,
				number: 1,
				orderType: 0
			},
		}
	}
	// 获取商品详情
	getGoodInfo(){
		const goodInfo = api.getGoodDetail(this.props.userInfo.token, this.props.params.goodId);
		goodInfo.then((res) => {
			return res.json();
		}).then((json) => {
			if(json.code != 0){
        util.toast(json.msg)
        return;
      }
			this.setState({
				goodDetailData: json.data
			})
		}).catch((ex)=>{
      console.error('获取商品信息数据报错, ', ex.message);
    })
	}
	// 获取商品属性getGoodDetail
	getProperties(){
		const goodInfo = api.getGoodProperty(this.props.userInfo.token, this.props.params.goodId);
		goodInfo.then((res) => {
			return res.json();
		}).then((json) => {
			if(json.code != 0){
        util.toast(json.msg)
        return;
      }
			this.setState({
				goodProperty: json.data
			})
		}).catch((ex)=>{
      console.error('获取商品属性数据报错, ', ex.message);
    })
	}
	handleShowPropers(status){
		this.setState({
			showSlectProperty: true
		})
	}
	handleHidePropers(status){
		this.setState({
			showSlectProperty: false
		})
	}
	getGoodNumber(num){
		let concatCommitParams = Object.assign({}, this.state.commitParams, { number: num })
		this.setState({
			number: num,
			commitParams: concatCommitParams
		})
	}
	componentWillMount(){
		let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
    _this.setState({
    	goodId: this.props.params.goodId
    })
	}
	componentDidMount(){
		this.getGoodInfo();
		// this.getProperties();
	}
	render() {
		let allGoodData = this.state.goodDetailData;
		let galleryView = allGoodData && allGoodData.phone.plans;
		return (
			<div className="container goodDetail">
				{
					allGoodData ?
					<div style={{background: '#f2f2f2'}}>
		        <GalleryView data={galleryView} goodId={this.props.params.goodId}/>
		        <GoodInfoDesc data={allGoodData.phone}/>
		        <GoodProperty
		        	data={allGoodData.attributes}
		        	showPropersFn={this.handleShowPropers.bind(this)} />
		        {
		        	this.state.showSlectProperty &&
		        	<SelectProperty
		        		data={allGoodData.attributes}
		        		productInfo={allGoodData.phone}
		        		showSelectPropers={this.state.showSlectProperty}
		        		hidePropersFn={this.handleHidePropers.bind(this)}
		        		getGoodNumberFn={this.getGoodNumber.bind(this)}
		        		number={this.state.number} />
		        }
		        {
		        	this.state.showSlectProperty &&
		        	<div className="selectPropsLayer"></div>
		        }
		        <DescTabsView data={allGoodData.phone.productDetails}/>
		        <Submit commitParams={this.state.commitParams}/>
		      </div> :
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
)(GoodsDetail)