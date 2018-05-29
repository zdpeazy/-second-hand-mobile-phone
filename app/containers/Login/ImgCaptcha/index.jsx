import React from 'react';

import * as util from '../../../util';

import './style.less';

class ImgCaptcha extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			imgCaptcha: '',
			imgCaptchaBtnTxt: '',
			imgCaptcha_tip: '',
			counter: 0
		}
	}

	loginTip(type) {
		switch(type) {
			case 1:
			return '*请输入验证码';
			case 2:
			return '*验证码不正确';
			default:
			return '';
		}
	}
	stateChange(e){
　  const target = e.target;
    this.setState({
      [target.name]: target.value
    })
　}
	handleCreateCode(e){
		util.createCode();
		// console.log(e.target.innerHTML);
		this.setState({
			imgCaptchaBtnTxt: e.target.innerHTML
		})
	}
	updateImgCode(){
		util.createCode();
		let checkCode = document.getElementById('checkCode');
		if(checkCode){
			this.setState({imgCaptchaBtnTxt: checkCode.innerHTML});
		}
	}
	handleCheckCode(e){
		let imgCaptcha = this.state.imgCaptcha, imgCaptchaBtnTxt = this.state.imgCaptchaBtnTxt;
		if(imgCaptcha == ''){
			this.setState({imgCaptcha_tip: this.loginTip(1)});
		} else if(imgCaptcha != imgCaptchaBtnTxt){
			this.setState({imgCaptcha_tip: this.loginTip(2)});
			this.updateImgCode();
		} else {
			this.setState({imgCaptcha_tip: ''});
			this.props.removeImgCaptcha(true);
		}
	}
	handleCloseLayer(e){
		this.setState({imgCaptcha_tip: ''});
		this.props.removeImgCaptcha(true);
	}
	render() {
		return (
  		<div className="imgCaptchaLayer" onChange={(e)=>this.stateChange(e)}>
      	<div className="imgCaptchaBox">
      		<h4 className="title">
      			提示
      			<div className="closedBtn" onClick={this.handleCloseLayer.bind(this)}>
      				<i className="closed-icon"></i>
      			</div>
      		</h4>
      		<div className="formBox">
      			<div className="webBox-flex">
	        		<input type="text" name="imgCaptcha" className="imgCaptcha" placeholder="验证码" value={this.state.imgCaptcha} maxLength="4" />
	        		<span className="imgCaptchaBtn" id="checkCode" onClick={this.handleCreateCode.bind(this)}></span>
	        	</div>
	        	<p className="imgCaptcha_tip">{this.state.imgCaptcha_tip}</p>
	        	<span className="checkCodeBtn" onClick={this.handleCheckCode.bind(this)}>确认</span>
      		</div>
      	</div>
      </div>
		);
	}
	componentDidMount() {
		this.updateImgCode();
	}
}


export default ImgCaptcha;