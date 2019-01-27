import * as AuthActions from '../actions/auth'

const initialState = {
  token: null,
  user: null,
  error: null
}
export default function authReducer(state = initialState, action) {
  // list of possible attributes from action
  const { token, user, error } = action
  switch(action.type) {
    case AuthActions.SET_TOKEN:
      return {...state, error: null, token}
    case AuthActions.SET_USER:
      return {...state, error: null, user}
    case AuthActions.SET_AUTH_ERROR:
      return {...state, error}
    case AuthActions.LOGOUT:
      return {...initialState}
    default:
      return state
  }
}