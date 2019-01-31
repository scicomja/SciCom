import {
  watchLogin,
  watchRegister,
  watchRefreshUserInfo
} from './auth'
import { all } from 'redux-saga/effects'
export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchRefreshUserInfo()
  ])
}
