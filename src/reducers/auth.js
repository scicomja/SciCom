import * as AuthActions from "../actions/auth"

const initialState = {
	token: null,
	user: null,
	error: null,
	// additional flag indicating that the user is undergoing email verifcation.
	isVerifyingEmail: false
}
export default function authReducer(state = initialState, action) {
	// list of possible attributes from action
	const { token, user, error, info } = action
	switch (action.type) {
		case AuthActions.SET_TOKEN:
			return { ...state, error: null, token }
		case AuthActions.SET_USER:
			return { ...state, error: null, user }
		case AuthActions.SET_AUTH_ERROR:
			return { ...state, error }
		case AuthActions.LOGOUT:
			return { ...initialState }
		case AuthActions.UPDATE_USER_INFO:
			return { ...state, user: { ...state.user, ...info } }
		case AuthActions.TO_EMAIL_VERIFICATION_MODE:
			return { ...state, isVerifyingEmail: true, error: null }
		case AuthActions.LEAVE_EMAIL_VERIFICATION_MODE:
			return { ...state, isVerifyingEmail: false, error: null }
		default:
			return state
	}
}
