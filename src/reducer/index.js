import * as Actions from '../action'

const initialState = {
  loggedIn: false,
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case Actions.LOGIN:
      return { ...state, loggedIn: true }
    default:
      return state
  }
}
