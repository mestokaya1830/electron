import { legacy_createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Choose your storage engine

//reducer
const initial = {
  users: {}
}

const autReducer = (state = initial, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        users: action.payload
      }
    case 'logout':
      return {
        users: {}
      }
    default:
      return state
  }
}

//persist
const persistConfig = {
  key: 'root',
  storage
  // whitelist: ['user'], // In this example, we persist the 'user' reducer
}

//combine
const persistedReducer = persistReducer(persistConfig, autReducer)

//export all
export const store = legacy_createStore(persistedReducer)
export const persistor = persistStore(store)
