import React from 'react';
import {  hashHistory, browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionsFromOtherFile from '../../../actions/actions';
import ImgCaptcha from '../ImgCaptcha';
import * as api from '../../../fetch/api';
import * as util from '../../../util'; //toast
import LocalStore from '../../../util/localStore';
import * as constants from '../../../constants/constants';

import './style.less';
const rollCaptchaSeconds = 60;
const regExp = {
	phone: /^1\d{10}$/,
	phoneCaptcha: /^\d{6}$/,
	imgCaptcha: /^\d{4}$/
}

let siv = null;
class LoginForm extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			phone: '',
			captcha: '',
			login_tip: '',
			sendingcaptcha: false,
			captchaTxt: '发送验证码',
			captchaDisable: '',
			seconds: rollCaptchaSeconds,
			counter: 0,
			disabled: true
		}
	}

	loginTip(type) {
		switch(type) {
			case 1:
			return '* 请输入手机号';
			case 2:
			return '* 手机号码格式不正确，请确认';
			case 3:
			return '* 请输入手机验证码';
			case 4:
			return '* 验证码不正确，请确认';
			case 5:
			return '* 操作过于频繁，请稍后再试';
			default:
			return '';
		}
	}
	stateChange(e){
　  const target = e.target;
    this.setState({
      [target.name]: target.value
    })
    if(this.refs.phone.value != '' && this.refs.captcha.value != ''){
    	this.setState({
    		disabled: false
    	})
    } else {
    	this.setState({
    		disabled: true
    	})
    }
　}
	handleSendCaptcha(e){
		let phone = this.state.phone, loginTipMsg = '';
		if(phone == ''){
			loginTipMsg = this.loginTip(1);
			this.setState({login_tip: loginTipMsg});
			return;
		} else if(!regExp.phone.test(phone)){
			loginTipMsg = this.loginTip(2);
			this.setState({login_tip: loginTipMsg});
			return;
		}
		loginTipMsg = '';
		this.setState({login_tip: loginTipMsg});
		// 调用发送验证码接口 //包括六次限制
		this.setState({counter: this.state.counter + 1})
		if(this.state.counter + 1 > 3){
			this.setState({showImgCaptcha: true});
			return;
		}

		let getCaptchaApi = api.getCateData(phone);
		getCaptchaApi.then(res => {
			return res.json();
		}).then(json => {
			if(json.code != 0){
				util.toast(json.msg);
				return;
			}
			util.toast('验证码发送成功');
			this.rollCaptcha();
		})
	}
	handleSubmit(e){
		let phone = this.state.phone, captcha = this.state.captcha, loginTipMsg = '', actions = this.props.actionsActive;;
		if(phone == ''){
			loginTipMsg = this.loginTip(1);
			this.setState({login_tip: loginTipMsg});
			return;
		} else if(!regExp.phone.test(phone)){
			loginTipMsg = this.loginTip(2);
			this.setState({login_tip: loginTipMsg});
			return;
		} else if(captcha == ''){
			loginTipMsg = this.loginTip(3);
			this.setState({login_tip: loginTipMsg});
			return;
		} else if(!regExp.phoneCaptcha.test(captcha)){
			loginTipMsg = this.loginTip(4);
			this.setState({login_tip: loginTipMsg});
			return;
		}
		// 调用在登录接口  phone和 token存redux，storage 跳转
		let loginApi = api.login(phone, captcha);
		loginApi.then(res => {
			return res.json();
		}).then(json => {
			if(json.code != 0){
				util.toast(json.msg);
				return;
			}
			util.toast('登录成功');
			LocalStore.setItem(constants.LOGIN_TOKEN, json.data.token);
			LocalStore.setItem(constants.LOGIN_PHONE, phone);
			actions.getUserInfo({
        token: json.data.token,
        phone: json.data.phone
      })
			setTimeout(() => {
				hashHistory.replace('/SellOrder');
			}, 2000)
		})
	}
	rollCaptcha() {
	  siv = setInterval(() => {
	    this.setState((preState) => ({
	      seconds: preState.seconds - 1,
	      captchaTxt: `${preState.seconds - 1}s重新发送`,
	      captchaDisable: 'disabled'
	    }), () => {
	      if (this.state.seconds == 0) {
	      	this.setState({
	        	captchaTxt: '重新发送',
	        	seconds: rollCaptchaSeconds,
	        	captchaDisable: ''
	        })
	        clearInterval(siv);
	      }
	    });
	  }, 1000)
	}
	handleRemoveImgCaptcha(isOk){
		if(isOk){
			this.setState({showImgCaptcha: false});
			this.rollCaptcha();
		}
	}
	render() {
		return (
			<div className="login_box from_box" onChange={(e)=>this.stateChange(e)}>
          <div className="item">
          	<i className="login-icon"></i>
            <label>手机号</label>
            <input type="text" ref="phone" placeholder="请输入手机号" name="phone" className="phone" value={this.state.phone} maxLength="11" />
          </div>
          <div className="item">
          	<i className="captcha-icon"></i>
            <label>验证码</label>
            <input type="text" ref="captcha" placeholder="请输入验证码" name="captcha" className="captcha" value={this.state.captcha} maxLength="6" />
            <div className="Captcha_box">
               <span className={`${this.state.captchaDisable} sendCaptcha`} onClick={this.handleSendCaptcha.bind(this)}>{this.state.captchaTxt}</span>
            </div>
          </div>
          <p className="login_tip">{this.state.login_tip}</p>
          <button className={`submit ${this.state.disabled ? 'disabled' : ''}`} onClick={this.handleSubmit.bind(this)}>登录</button>
          {
          	this.state.showImgCaptcha
          	? <ImgCaptcha verifyImgCaptcha={regExp.imgCaptcha} removeImgCaptcha={this.handleRemoveImgCaptcha.bind(this)}/>
          	: ''
          }
      </div>
		);
	}
	componentDidMount() {
		// this.updateImgCode();
	}
	componentWillUnmount(){
		clearInterval(siv);
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
)(LoginForm)