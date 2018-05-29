import * as actionTypes from '../constants/constants';

const initialState = {}

export default function selctAddressInfo(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SELECT_ADRESS:
      return action.data
    default:
      return state
  }
}