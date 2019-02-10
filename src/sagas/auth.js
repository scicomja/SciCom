import { put, call, takeLatest } from 'redux-saga/effects'
import { history } from '../App'
import { serverURL } from '../constants'
import { postJSON } from '../utils/requests'
import { authorizedRequestGet } from '../utils/requests'
import * as LoginActions from '../actions/auth'
import { toast } from 'react-toastify'
export function* getUser() {
  const user = yield call(authorizedRequestGet, `${serverURL}/user`)
  return user
}

export function* login({ username, password }) {
  const payload = {username, password}
  const response = yield postJSON(`${serverURL}/auth/login`, payload)
  const { error, token } = response
  if(error) {
    yield put({
      type: LoginActions.SET_AUTH_ERROR,
      error
    })
  } else {

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
      yield call(history.push, '/user')
      window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }
}

export function* register({ username, password, email, isPolitician}) {
  const payload = { username, password, email, isPolitician }
  const response = yield postJSON(`${serverURL}/auth/register`, payload)
  const { error, token } = response
  if(error) {
    yield put({
      type: LoginActions.SET_AUTH_ERROR,
      error
    })
    toast.error(error.message)
  } else {
    toast.success("You have registered an account successfully")

    // yield put({
    //   type: LoginActions.SET_TOKEN,
    //   token
    // })
    // const user = yield call(getUser)
    // yield put({
    //   type: LoginActions.SET_USER,
    //   user
    // })
    // finally, redirect to user's home page
    // yield put(push('/user/'))
    // yield call(history.push, '/user')
    // window.location.reload()
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

export function* watchRefreshUserInfo() {
  yield takeLatest(LoginActions.REFRESH_USER_INFO, refreshUserInfo)
}
