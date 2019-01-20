import * as Actions from '../action'
const initialState = {
  mode: null,
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case Actions.LOGIN:
      return { ...state, mode: action.mode }
    default:
      return state
  }
}
