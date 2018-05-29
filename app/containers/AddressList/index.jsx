import React from 'react';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';

import * as api from '../../fetch/api';
import * as util from '../../util';

import './style.less';

class AddressList extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '选择收货地址',
      addressInfo: null,
      selectId: this.props.selectAddressInfo.selectId ? this.props.selectAddressInfo.selectId : 0
		}
	}
  // 获取提货地址信息
  getAdressList(){
    let actions = this.props.actionsActive;
    const adressListApi = api.adressList(this.props.userInfo.token);
    adressListApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        util.toast(json.msg)
        return;
      }
      this.setState({
        addressInfo: json.data
      })
      actions.getAddressInfo({
        selectId: this.state.selectId
      })
    })
  }
  checkSelectAddress(e){
    let dataId = e.currentTarget.getAttribute('data-id'), actions = this.props.actionsActive;
    this.setState({
      selectId: dataId
    })
    actions.getAddressInfo({
      selectId: dataId
    })
    hashHistory.goBack();
  }
  componentWillMount(){
    let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
    this.getAdressList();
  }
  // 将页面标题文案 存储到Redux中
  componentDidMount() {
  }
	render() {
    let addressList = this.state.addressInfo;
		return (
      <div className="container">
        {
          addressList ?
          <ul className="addressList">
            {
              addressList.map((item, index) => {
                return (
                  <li className="item" key={index} data-id={index} onClick={this.checkSelectAddress.bind(this)}>
                    <div className="addressInfo">
                      <span>{item.receiveAddress}</span>
                      <span>{item.receivePhone}</span>
                    </div>
                    <i className={`select ${index == this.state.selectId ? 'selected' : ''}`}></i>
                  </li>
                )
              })
            }
          </ul>
          : <Loading/>
        }
      </div>
	  )
	}
}

let mapStateToProps = (state)=>{
  return {
  	userInfo: state.userInfo,
    selectAddressInfo: state.selectAddressInfo
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
)(AddressList)
