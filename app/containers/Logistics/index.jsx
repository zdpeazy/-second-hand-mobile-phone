import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionsFromOtherFile from '../../actions/actions';
import Loading from '../../components/Loading';
import './style.less';

import * as api from '../../fetch/api';
import * as util from '../../util/index';
import * as constants from '../../constants/constants.js';

class Logistics extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			title: '物流详情',
			logisticsData: {}
		}
	}
  componentWillMount() {
  	let _this = this, actions = this.props.actionsActive;
    actions.getPageTitle({
      title: _this.state.title
    })
    this.getLogistics();
  }
  getLogistics(){
  	let _this = this;
		let logisticsQueryApi = api.logisticsQuery(this.props.userInfo.token, this.props.params.orderId);
		logisticsQueryApi.then(res => {
			return res.json();
		}).then(json => {
			if(json.code != 0){
        util.toast(json.msg);
        return;
      }
      let logisticsData = JSON.parse(json.data);
      _this.setState({
      	logisticsData: logisticsData
      })
     	// console.log(logisticsData)
		})
	}
  componentDidMount() {
  }
  componentWillUnmount() {
  }
	render() {
		let logisticsData = this.state.logisticsData;
		let logisticsList = logisticsData && logisticsData.data;
		return (
			<div className="container logistics">
				<ul className="logisticsList">
					{
						(logisticsData.state == '0' || logisticsData.state == '3') &&
						logisticsList.map((item, index) => {
							return (
								<li key={index} className={logisticsData.state == '3' && index == '0' ? 'item successItem' : 'item normalItem'}>
									<div className="left">
										<span className="circleIcon"></span>
									</div>
									<div className="right">
										<span>{item.context}</span>
										<span>{item.ftime}</span>
									</div>
								</li>
							)
						})
					}
					{
						logisticsData.state == '1' &&
						logisticsList.map((item, index) => {
							return (
								<li key={index} className="item normalItem">
									<div className="left">
										<span className="circleIcon"></span>
									</div>
									<div className="right">
										<span>{item.context}</span>
										<span>{item.ftime}</span>
									</div>
								</li>
							)
						})
					}
				</ul>
				<a className="serviceIcon" href={`tel:+${constants.SERVICE_PHONE}`}></a>
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
)(Logistics)
