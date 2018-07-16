import React from 'react';
import {hashHistory} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../../actions/actions';

import * as util from '../../../util';
import * as api from '../../../fetch/api';

import './style.less';

class AddressList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      selectId: 0
    }
  }
  showEditAddress(){
    this.props.editAddressFn(true);
  }
  selectAddress(e){
    let actions = this.props.actionsActive;
    let nowSelectId = e.currentTarget.getAttribute('data-id');
    actions.getAddressInfo({
      selectId: nowSelectId
    })
    history.back();
  }
  deleteAddress(e){
    let nowCurrentAddressId = e.currentTarget.getAttribute('data-addressId');
    let isOk = confirm('是否删除该地址');
    if(isOk){
      let deleteAddressApi = api.delAddress(this.props.token, nowCurrentAddressId);
      deleteAddressApi.then(res => {
        return res.json();
      }).then(json =>{
        if(json.code * 1 != 0){
          util.toast(json.msg);
          return;
        }
        util.toast('删除成功');
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      })
    } else {
      util.toast('已取消');
    }
  }
  componentDidMount(){
  }
  componentWillReceiveProps(nextProps){
  }
  render() {
    let userAddressInfo = this.props.addressInfo;
    return (
      <ul className="addressList">
        {
          userAddressInfo.map((item, index) =>{
            return (
              <li key={index}>
                <div className="contentBox" onClick={this.selectAddress.bind(this)} data-id={index}>
                  <div className="userInfo">
                    <div className="userName">收货人：{item.receiveName}</div>
                    <div>电话：{item.receivePhone}</div>
                  </div>
                  <div className="addressInfo">{item.receiveAddress + ' ' + item.receiveDetailAddress}</div>
                </div>
                <div className="bottom">
                  <div className="emptyDom"></div>
                  <div className="btnBox">
                    <span className="editBtn" onClick={this.showEditAddress.bind(this)}>编辑</span>
                    <span className="deleteBtn" data-addressId={item.id} onClick={this.deleteAddress.bind(this)}>删除</span>
                  </div>
                </div>
              </li>
            )
          })
          
        }
      </ul>
    )
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
)(AddressList)
