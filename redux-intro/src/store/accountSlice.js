const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
}

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload }
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload }
    case "account/loan":
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      }
    case "account/payLoan":
      return { ...state, loan: 0, loanPurpose: "" }
    default:
      return state
  }
}

export function amountDeposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    }

  return async function (dispatch) {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
    )
    const data = await res.json()
    const converted = (amount * data.rates["USD"]).toFixed(2)
    console.log(converted)
    dispatch({ type: "account/deposit", payload: converted })
  }
}

export function amountWithdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  }
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/loan",
    payload: {
      amount,
      purpose,
    },
  }
}

export function payLoan() {
  return {
    type: "account/payLoan",
  }
}
