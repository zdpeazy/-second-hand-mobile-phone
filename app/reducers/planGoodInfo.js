import * as actionTypes from '../constants/constants';

const initialState = {}

export default function planGoodInfo(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PLAN_GOODINFO:
      return action.data
    default:
      return state
  }
}