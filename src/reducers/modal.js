import * as ModalActions from '../actions/modal'
import { ModalMode } from '../constants'
const initialState = {
  content: null,
  mode: null,
}

export default function modalReducer(state = initialState, action) {
  const { content, mode } = action
  console.log('modal reducer', action)
  switch(action.type) {
    case ModalActions.SET_MODAL_TYPE:
      return {...state, mode}
    case ModalActions.SET_CONTENT:
      return {...state, content}
    case ModalActions.CREATE_USER:
      return {
        ...state, content,
         mode: ModalMode.USER_DETAILS
      }

    case ModalActions.MODIFY_USER:
      return {
        ...state, content
      }
    case ModalActions.CREATE_PROJECT:
      return {
        ...state,
        content: null,
        mode: ModalMode.PROJECT_DETAILS
      }
    case ModalActions.MODIFY_PROJECT:
      return {
        ...state,
        mode: ModalMode.PROJECT_DETAILS,
        content
      }
    default:
      return state
  }
}
