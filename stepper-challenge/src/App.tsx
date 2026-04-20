import { useState } from "react"
import "./app.css"
function App() {
  const [step, setStep] = useState(1)
  const [counter, setCounter] = useState(0)
  const date = new Date()
  const counterDate = new Date(date)
  counterDate.setDate(counterDate.getDate() + counter)

  const handleIncreaseCounter = () => {
    setCounter((curStep) => curStep + step)
  }
  const handleReduceCounter = () => {
    setCounter((curStep) => curStep - step)
  }

  const getDayString = () => {
    if (counter > 0) {
      return "days from today is"
    } else {
      return "days ago was"
    }
  }

  const onClickReset = () => {
    setStep(1)
    setCounter(0)
  }
  return (
    <>
      <div className="step">
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>Step: {step}</span>
      </div>
      <div className="counter">
        <button onClick={handleReduceCounter}>-</button>
        <input
          type="number"
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
        <button onClick={handleIncreaseCounter}>+</button>
      </div>
      <div className="date">
        {counter} {getDayString()} {counterDate.toDateString()}
      </div>
      <div>
        <button onClick={onClickReset}>Reset</button>
      </div>
    </>
  )
}

export default App
