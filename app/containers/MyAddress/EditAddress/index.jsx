import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';
import rightArrow from '../../../static/img/right-arrow.png';
import SelectArea from '../../../components/select_area/select_area.jsx';
import * as api from '../../../fetch/api';
import * as util from '../../../util';

const regExp = {
  phone: /^1\d{10}$/
}
class EditAddress extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      showPicker: false,
      areaObj: {province: "请选择", city: "请选择", district: "请选择"},
      userName: '',
      phone: '',
      area: '',
      address: '',
      userAddrId: ''
    }
  }
  showPicker(){
    this.setState({
      showPicker: true
    })
  }
  hidePickerFn(isShow){
    this.setState({
      showPicker: isShow
    })
  }
  hideSelf(){
    this.props.hideEditAddressFn(false);
  }
  stateChange(e){
　  const target = e.target;
    this.setState({
      [target.name]: target.value
    })
　}
  // 获取地区组件的内容
  getAreaFn(areaObj){
    console.log(areaObj)
    this.setState({
      area: areaObj.province + '-' + areaObj.city + '-' + areaObj.district,
      areaObj: areaObj
    })
  }
  saveAddressInfo(){
    let _this = this;
    if(_this.state.userName == ''){util.toast('请输入联系人');return;}
    else if(_this.state.phone == ''){util.toast('请输入手机号');return;}
    else if(!regExp.phone.test(_this.state.phone)){util.toast('请输入正确的手机号');return;}
    else if(_this.state.area == ''){util.toast('请输入所在地区');return;}
    else if(_this.state.address == ''){util.toast('请输入详细地址');return;}
    let commitAddressInfo = {
      token: this.props.token,
      receiveName: _this.state.userName,
      receivePhone: _this.state.phone,
      receiveAddress: _this.state.area,
      receiveDetailAddress: _this.state.address
    }
    if(this.props.isEdit){
      commitAddressInfo = Object.assign({}, commitAddressInfo, {
        userAddrId: _this.state.userAddrId
      })
    }
    let addAddressApi = api.addAddress(commitAddressInfo);
    addAddressApi.then(res => {
      return res.json();
    }).then(json => {
      if(json.code != 0){
        util.toast(json.msg)
        return;
      }
      // this.props.hideEditAddressFn(false);
      util.toast('保存成功');
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    })
  }
  componentDidMount(){
    if(this.props.addressInfo.length < 1) return;
    let userAddressInfo = this.props.addressInfo[0];
    if(userAddressInfo.receiveAddress != ''){
      let areaArr = userAddressInfo.receiveAddress.split('-');
      this.setState({
        areaObj: {province: areaArr[0], city: areaArr[1], district: areaArr[2]}
      })
    }
    this.setState({
      userName: userAddressInfo.receiveName,
      phone: userAddressInfo.receivePhone,
      area: userAddressInfo.receiveAddress,
      address: userAddressInfo.receiveDetailAddress,
      userAddrId: userAddressInfo.id
    })
  }
  componentWillReceiveProps(nextProps){
  }
  render() {
    return (
      <div className="editAddress" onChange={(e)=>this.stateChange(e)}>
        <div className="header">
          <div className="goback" onClick={this.hideSelf.bind(this)}><i className="goback-icon"></i></div>
          <div className="title">我的地址</div>
          <div className="save" onClick={this.saveAddressInfo.bind(this)}>保存</div>
        </div>
        <div className="form">
          <div className="item">
            <label>收货人：</label>
            <input name="userName" type="text" placeholder="请输入姓名" value={this.state.userName}/>
          </div>
          <div className="item">
            <label>联系方式：</label>
            <input name="phone" type="number" placeholder="请输入手机号" value={this.state.phone}/>
          </div>
          <div className="item">
            <label>所在地区：</label>
            <input name="area" type="text" placeholder="省份 城市 区县" readOnly onClick={this.showPicker.bind(this)} value={this.state.area}/>
            <img className="arrow-right" src={rightArrow}/>
          </div>
          <div className="item">
            <label>详细地址：</label>
            <input name="address" type="text" placeholder="街道、楼牌号等" value={this.state.address}/>
          </div>
        </div>
        {
          this.state.showPicker &&
          <SelectArea
            province={this.state.areaObj.province}
            city={this.state.areaObj.city}
            district={this.state.areaObj.district}
            hidePickerFn={this.hidePickerFn.bind(this)}
            getAreaFn={this.getAreaFn.bind(this)}/>
        }
      </div>
    )
  }
}

export default EditAddress;