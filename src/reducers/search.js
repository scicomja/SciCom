import * as SearchActions from "../actions/search"
import { initialValues } from "../backend/search"
import { SearchMode } from "../constants"
const initialState = {
	isModalOpen: false,
	searchForm: initialValues
}

export default function searchReducer(state = initialState, action) {
	const { form } = action
	console.log("search reducer", action)
	switch (action.type) {
		case SearchActions.OPEN_SEARCH_MODAL:
			return {
				...state,
				isModalOpen: true
			}
		case SearchActions.CLOSE_SEARCH_MODAL:
			return { ...state, isModalOpen: false }
		case SearchActions.CLEAR_SEARCH:
			return {
				...state,
				searchForm: initialValues
			}
		case SearchActions.SET_SEARCH_PARAMS:
			return {
				...state,
				isModalOpen: false,
				searchForm: form
			}
		default:
			return state
	}
}
