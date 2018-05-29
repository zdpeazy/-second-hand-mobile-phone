import * as actionTypes from '../constants/constants';

const initialState = {}

export default function payModelInfo(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAY_MODEL:
      return action.data
    default:
      return state
  }
}