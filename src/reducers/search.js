import * as SearchActions from '../actions/search'
import { SearchMode } from '../constants'
const initialState = {
  params: null,
  // the current search mode, default to project search
  searchMode: null,
  // define the params for each search mode
  searchParams: {
    [SearchMode.STUDENT]: null,
    [SearchMode.POLITICIAN]: null,
    [SearchMode.PROJECT]: null,
  }
}

export default function searchReducer(state = initialState, action) {
  const { params, mode } = action
  console.log('search reducer', action)
  switch(action.type) {
    case SearchActions.CLOSE_SEARCH:
      return {...state, searchMode: null }
    case SearchActions.CLEAR_SEARCH:
      return {...state, searchParams: {
        ...state.searchParams,
        [state.searchMode]: null
      }}
    case SearchActions.SET_SEARCH_MODE:
      return {...state, searchMode: mode}
    case SearchActions.SET_SEARCH_PARAMS:
      if (!mode) return state // check incoming params
      return {
        ...state,
        searchMode: mode,
        searchParams: {
          ...state.searchParams,
          [mode]: params
        }
      }
    default:
      return state
  }
}
