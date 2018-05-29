import * as actionTypes from '../constants/constants';

export function getPageTitle(data){
	return {
		type: actionTypes.PAGE_TITLE,
		data
	}
}

export function getUserInfo(data) {
  return {
    type: actionTypes.GET_USERINFO,
    data
  }
}

export function updateUserInfo(data) {
  return {
    type: actionTypes.UPDATE_USERINFO,
    data
  }
}

export function getPlanGoodInfo(data){
  return {
    type: actionTypes.PLAN_GOODINFO,
    data
  }
}

// address
export function getAddressInfo(data){
  return {
    type: actionTypes.SELECT_ADRESS,
    data
  }
}

// payModel
export function getPayModel(data){
  return {
    type: actionTypes.PAY_MODEL,
    data
  }
}


