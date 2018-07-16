import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import * as api from '../../fetch/api';
import * as util from '../../util/index';

import AddressList from './AddressList';
import EditAddress from './EditAddress';
import noAddressIcon from '../../static/img/noAddress.png';

import * as constants from '../../constants/constants.js';

import './style.less';

class MyAddress extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			title: '我的地址',
			addressInfo: null,
			isEdit: false,
			isShowEditAddress: false
		}
	}
	// 获取用户地址
  getUserAddress(){
    const userAddressApi = api.userAddress(this.props.userInfo.token);
    userAddressApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        util.toast(json.msg)
        return;
      }
      this.setState({
        addressInfo: json.data
      })
    })
  }
	editAddressFn(isEdit){
		this.setState({
			isEdit: true,
			isShowEditAddress: true
		})
	}
	hideEditAddressFn(hideBool){
		this.setState({
			isShowEditAddress: hideBool,
			isEdit: false
		})
	}
	showPickerFn(){
		this.setState({
			isEdit: false,
			isShowEditAddress: true
		})
	}
	componentWillMount(){
		let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
    _this.getUserAddress();
	}
	render() {
		let userAddressInfo = this.state.addressInfo;
		return (
			<div className="container myAddress">
				{
					userAddressInfo ?
					<div>
						{
							userAddressInfo.length > 0 ?
							<AddressList
							editAddressFn={this.editAddressFn.bind(this)}
							addressInfo={userAddressInfo}
							token={this.props.userInfo.token}/> :
							<div className="noMoreBox">
		            <img src={noAddressIcon} />
		            <p className="txt">还没有收货地址</p>
		            <span className="btn" onClick={this.showPickerFn.bind(this)}>去添加</span>
							</div>
						}
						{
							this.state.isShowEditAddress &&
							<EditAddress
								isEdit={this.state.isEdit}
								hideEditAddressFn={this.hideEditAddressFn.bind(this)}
								addressInfo={userAddressInfo}
								token={this.props.userInfo.token}/>
						}
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
)(MyAddress)