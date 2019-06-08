import { put, call, takeLatest } from "redux-saga/effects"
import { delay } from "redux-saga"
import { history } from "../App"
import { serverURL } from "../constants"
import { postJSON } from "../utils/requests"
import { authorizedRequestGet } from "../utils/requests"
import * as LoginActions from "actions/auth"
import * as AuthActions from "actions/auth"
import { toast } from "react-toastify"

export function* getUser() {
	const user = yield call(authorizedRequestGet, `${serverURL}/user`)
	return user
}
// a routine for preparing the token and acquiring user object from the server. As well as redirecting user to his homepage.
function* markLogin(token, redirectPath = null) {
	try {
		yield put({
			type: LoginActions.SET_TOKEN,
			token
		})

		const user = yield call(getUser)
		yield put({
			type: LoginActions.SET_USER,
			user
		})
		yield call(history.push, redirectPath || "/home")
		window.location.reload()
	} catch (err) {
		console.log(err)
	}
}

export function* login({ username, password }) {
	const payload = { username, password }
	const response = yield postJSON(`${serverURL}/auth/login`, payload)
	const { error, token } = response
	if (error) {
		yield put({
			type: LoginActions.SET_AUTH_ERROR,
			error
		})
	} else {
		yield call(markLogin, token)
	}
}
/**
 */
export function* register({ username, password, email, isPolitician }) {
	const payload = { username, password, email, isPolitician }
	const response = yield postJSON(`${serverURL}/auth/register`, payload)
	const { error, status } = response
	if (error) {
		yield put({
			type: LoginActions.SET_AUTH_ERROR,
			error
		})
		toast.error(error.message)
	} else {
		// load to the home page of the newly-registered user
		yield put({
			type: LoginActions.TO_EMAIL_VERIFICATION_MODE
		})
	}
}
/**
  Given a token and email provided by user, submit to the server and await for validation.
  if the validation succeeds, a token will return and the user will be logged in.
  Otherwise error message should occur.

*/
export function* verifyEmail({ email, token }) {
	const { token: loginToken } = yield postJSON(
		`${serverURL}/auth/verifyEmail`,
		{
			email,
			token
		}
	)
	// if there are tokens returned, that means the verification process is completed.
	if (loginToken) {
		toast.success(
			"You have completed the registration, you will be redirected to the home page...",
			{
				autoClose: 2000
			}
		)
		yield call(delay, 2000)
		yield call(markLogin, loginToken, "/editInfo") // force the user to go editInfo page right after register
	} else {
		yield put({
			type: LoginActions.SET_AUTH_ERROR,
			error: "Failed to verify email"
		})
	}
}

export function* refreshUserInfo() {
	const user = yield call(getUser)
	yield put({
		type: LoginActions.SET_USER,
		user
	})
}
// watchers
export function* watchLogin() {
	yield takeLatest(LoginActions.LOGIN, login)
}

export function* watchRegister() {
	yield takeLatest(LoginActions.REGISTER, register)
}

export function* watchVerifyEmail() {
	yield takeLatest(AuthActions.VERIFY_EMAIL, verifyEmail)
}

export function* watchRefreshUserInfo() {
	yield takeLatest(LoginActions.REFRESH_USER_INFO, refreshUserInfo)
}
