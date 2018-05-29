import { combineReducers } from 'redux'
import pageTitle from './pageTitle'
import userInfo from './userInfo'
import selectAddressInfo from './selectAddress';
import payModelInfo from './payModel';

export default combineReducers({
	pageTitle,
	userInfo,
	selectAddressInfo,
	payModelInfo
})