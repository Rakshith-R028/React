import { useState } from "react"

export default function App() {
  const [billValue, setBillValue] = useState("")
  const [yourServiceBill, setYourServiceBill] = useState("")
  const [friendServiceBill, setFriendServiceBill] = useState("")

  function HandleReset() {
    setBillValue("")
    setFriendServiceBill("")
    setYourServiceBill("")
  }

  return (
    <>
      <BillAmount billValue={billValue} setBillValue={setBillValue} />
      <ServiceLike
        taxPercent={yourServiceBill}
        setTaxPercent={setYourServiceBill}
      >
        How did you like the service?
      </ServiceLike>
      <ServiceLike
        taxPercent={friendServiceBill}
        setTaxPercent={setFriendServiceBill}
      >
        How did your friend like the service
      </ServiceLike>
      <Output
        billValue={billValue}
        yourServiceBill={yourServiceBill}
        friendServiceBill={friendServiceBill}
      />
      <Reset HandleReset={HandleReset} />
    </>
  )
}

function BillAmount({ billValue, setBillValue }) {
  function handleAmountChange(e) {
    setBillValue(Number(e.target.value))
  }
  return (
    <div>
      <span>How much was the bill?</span>
      <input type="text" value={billValue} onChange={handleAmountChange} />
    </div>
  )
}

function ServiceLike({ children, taxPercent, setTaxPercent }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={taxPercent}
        onChange={(e) => setTaxPercent(Number(e.target.value))}
      >
        <option value={0}>Dissastisfied(0%)</option>
        <option value={5}>It was ok(5%)</option>
        <option value={10}>It was good(10%)</option>
        <option value={20}>It was excellent(20%)</option>
      </select>
    </div>
  )
}

function Output({ billValue, friendServiceBill, yourServiceBill }) {
  return (
    <div>
      <h3>Total Amount is {billValue}</h3>
      <h1>
        Total Payable with Tax is{" "}
        {billValue + (friendServiceBill + yourServiceBill) / 2 / 100}
      </h1>
    </div>
  )
}

function Reset({ HandleReset }) {
  return <button onClick={HandleReset}>Reset</button>
}
