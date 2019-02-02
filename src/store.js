import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import * as _ from 'lodash'
const sagaMiddleware = createSagaMiddleware()
const searchResultPersistenceTransform = createTransform(
  (inboundState, key) => {
    if(key != 'search') return inboundState
    return _.omit(inboundState, "isModalOpen")
  }
)
const persistConfig = {
  key: 'root',
  blacklist: ['modal', 'search'],
  transforms: [searchResultPersistenceTransform],
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


export default function configureStore() {
  const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
  )
  let persistor = persistStore(store)
  sagaMiddleware.run(rootSaga)

  return {store, persistor}
}
