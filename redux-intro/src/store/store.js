import { configureStore } from "@reduxjs/toolkit"
import accountReducer from "./accountSlice"
import customerReducer from "./customerSlice"
// import { thunk } from "redux-thunk"
// import {
//   applyMiddleware,
//   combineReducers,
//   legacy_createStore as createStore,
// } from "redux"

// const rootReducer = combineReducers({

// })

// const store = createStore(rootReducer, applyMiddleware(thunk))
const store = configureStore({
  reducer: {
    accounts: accountReducer,
    customers: customerReducer,
  },
})
export default store
