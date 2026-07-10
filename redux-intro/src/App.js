import CreateCustomer from "./customers/CreateCustomer"
import Customer from "./customers/Customer"
import AccountOperations from "./accounts/AccountOperations"
import BalanceDisplay from "./accounts/BalanceDisplay"
import { useSelector } from "react-redux"

function App() {
  const fullName = useSelector((state) => state.customers.fullName)
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!fullName ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  )
}

export default App
