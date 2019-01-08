import { createStore } from 'redux'
import rootReducer from './reducer'
export default function configureStore() {
  const store = createStore(rootReducer)
  return store
}
