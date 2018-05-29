import * as actionTypes from '../constants/constants';

const initialState = {}

export default function userInfo (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USERINFO:
      return action.data
    case actionTypes.UPDATE_USERINFO:
      return action.data
    default:
      return state
  }
}