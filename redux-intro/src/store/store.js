import accountReducer from "./accountSlice"
import customerReducer from "./customerSlice"
import { thunk } from "redux-thunk"
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux"

const rootReducer = combineReducers({
  accounts: accountReducer,
  customers: customerReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
