import * as SearchActions from '../actions/search'
import { SearchMode } from '../constants'
const initialState = {
  // the current search mode, default to project search
  searchMode: null,
  isModalOpen: false,
  // define the params for each search mode
  searchParams: {
    [SearchMode.STUDENT]: null,
    [SearchMode.POLITICIAN]: null,
    [SearchMode.PROJECT]: null,
  }
}

export default function searchReducer(state = initialState, action) {
  const { params, mode, clear } = action
  const {
    searchMode: prevSearchMode,
    searchParams: prevSearchParams,
  } = state
  console.log('search reducer', action)
  switch(action.type) {
    case SearchActions.OPEN_SEARCH_MODAL:
      return {...state,
        isModalOpen: true,
        searchMode: mode || prevSearchMode,
        searchParams: {
          ...prevSearchParams,
          [mode]: params || prevSearchParams[mode]
        }
      }
    case SearchActions.CLOSE_SEARCH_MODAL:
      return {...state, isModalOpen: false}
    case SearchActions.CLEAR_SEARCH:
      return {...state, searchParams: {
        ...state.searchParams,
        [state.searchMode]: null
      }}
    case SearchActions.SET_SEARCH_MODE:
      return {...state,
        searchMode: mode
      }
    // when you set the params, it should go to another page.
    // so the modal should not be open anymore
    case SearchActions.SET_SEARCH_PARAMS:
      return {
        ...state,
        isModalOpen: false,
        searchParams: {
          ...state.searchParams,
          [state.searchMode]: params
        }
      }
    default:
      return state
  }
}
