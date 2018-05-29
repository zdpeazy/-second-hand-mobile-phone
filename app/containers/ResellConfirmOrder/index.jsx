import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';

import * as api from '../../fetch/api';

import './style.less';

class ResellConfirmOrder extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '确认下单'
		}
	}
  componentWillMount(){
    let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
  }
  // 将页面标题文案 存储到Redux中
  componentDidMount() {
  }
  componentWillUnmount() {
  }
	render() {
		return (
			<div className="container resellConfirmOrder">
				<div className="resell-flow">
          <h4 className="title">回收流程</h4>
          <div className="flow">
            <div className="flow-bg"></div>
          </div>
        </div>
        <div className="goodInfo">
          <h3 className="title">宝贝信息</h3>
          <div className="name">OPPO R11s Plus</div>
          <div className="info">
            <span>9成新</span>
            <span>香槟色</span>
            <span>存储容量 64GB</span>
            <span>三网通</span>
          </div>
        </div>
        <div className="estimatePrice">
          <h3 className="title">宝贝预估价格</h3>
          <div className="info">
            <span className="txt">手机预估价格为</span>
            <span className="price">￥2229</span>
          </div>
        </div>
        <div className="addressBox">
          <h3>送货地址</h3>
          <div className="selectAddress">
            <i className="address-icon"></i>
            <div className="addressInfo">
              <span className="txt">北京市海淀区知春路硬度大厦208</span>
              <span className="phone">13261892441</span>
            </div>
          </div>
        </div>
        <div className="submitBox">
          <button>确认下单</button>
        </div>
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
)(ResellConfirmOrder)
