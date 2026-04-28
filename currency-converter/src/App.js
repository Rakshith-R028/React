import { useState, useEffect } from "react"

export default function App() {
  const [amount, setAmount] = useState(1)
  const [fromCur, setFromCur] = useState("EUR")
  const [toCur, setToCur] = useState("USD")
  const [converted, setConverted] = useState(1)

  useEffect(
    function () {
      async function converter() {
        const res = await fetch(
          `/latest?amount=${amount}&from=${fromCur}&to=${toCur}`,
        )

        //Added PROXY in package.json (top level), as I was getting CORS error. If that was not done I would have passed the endpoint as below inside "fetch"

        // fetch(
        //   `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`,
        // )
        const data = await res.json()
        setConverted(data.rates[toCur])
      }

      if (fromCur === toCur) return setConverted(amount)
      converter()
    },
    [amount, fromCur, toCur],
  )

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted} {toCur}
      </p>
    </div>
  )
}
