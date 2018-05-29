import LocalStore from './localStore';
import * as constants from '../constants/constants';

export default function judgeAuth(){
	let token = LocalStore.getItem(constants.LOGIN_TOKEN),
	    phone = LocalStore.getItem(constants.LOGIN_PHONE),
	    userInfo = {};
	if(token == null){
		return null;
	} else {
		userInfo = {
			token,
			phone
		}
		return userInfo;
	}
}