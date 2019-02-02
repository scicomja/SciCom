import { combineReducers } from 'redux'
import auth from './auth'
import modal from './modal'
import search from './search'

export default combineReducers({
  auth,
  modal,
  search
})
