import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    amountDeposit(state, action) {
      state.balance += action.payload
    },
    amountWithdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        }
      },

      reducer(state, action) {
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance += action.payload.amount
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ""
    },
  },
})

export const { amountWithdraw, requestLoan, payLoan } = accountSlice.actions

export function amountDeposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/amountDeposit",
      payload: amount,
    }

  return async function (dispatch) {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
    )
    const data = await res.json()
    const converted = (amount * data.rates["USD"]).toFixed(2)
    dispatch({
      type: "account/amountDeposit",
      payload: amount + Number(converted),
    })
  }
}

export default accountSlice.reducer
