import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsFromOtherFile from '../../actions/actions';

import LoginForm from './LoginForm';

import './style.less';

class Login extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			title: '登录',
			loginWid: '',
			loginHei: '',
			token: '',
			phone: ''
		}
	}
	setHeight(){
		let windowHei = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		let windowWid = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		this.setState({
			loginWid: windowWid + 'px',
			loginHei: windowHei + 'px'
		})
	}
	render() {
		return (
			<div className="container loginBox" ref="loginBox" style={{height: this.state.loginHei}}>
				<div className="login-top"></div>
				<LoginForm/>
      </div>
		);
	}
	componentWillMount(){
		this.setHeight();
	}
	// 将页面标题文案 存储到Redux中
	componentDidMount() {
		let _this = this, actions = this.props.actionsActive;
		actions.getPageTitle({
			title: _this.state.title
		})
		this.setHeight();
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
)(Login)