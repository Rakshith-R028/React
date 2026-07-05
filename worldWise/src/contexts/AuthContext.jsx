import { createContext, useContext, useReducer } from "react"
import { FAKE_USER } from "../components/User"

const AuthContexts = createContext()
const initialState = { user: null, isAuthenticated: false }

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true }
    case "logout":
      return { ...state, user: null, isAuthenticated: false }
    default:
      throw new Error(alert("Unkown Action"))
  }
}
function AuthContext({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER })
  }

  function logout() {
    dispatch({ type: "logout" })
  }

  return (
    <AuthContexts.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContexts.Provider>
  )
}

function useAuthContext() {
  const context = useContext(AuthContexts)
  if (context === undefined)
    throw new Error("Auth Context has been used outside Auth Provider")

  return context
}

export { AuthContext, useAuthContext }
