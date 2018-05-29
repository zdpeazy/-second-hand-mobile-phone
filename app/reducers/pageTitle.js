import * as actionTypes from '../constants/constants';

const initialState = {}

export default function pageTitle(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAGE_TITLE:
      return action.data
    default:
      return state
  }
}