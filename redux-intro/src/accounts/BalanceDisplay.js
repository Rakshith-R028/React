import { connect } from "react-redux"

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>
}

function connectToProps(store) {
  return {
    balance: store.accounts.balance,
  }
}

export default connect(connectToProps)(BalanceDisplay)
