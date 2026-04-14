import { useState } from "react"
import "./app.css"
function App() {
  const [step, setStep] = useState<number>(1)
  const [counter, setCounter] = useState<number>(0)
  const date = new Date()
  const counterDate = new Date(date)
  counterDate.setDate(counterDate.getDate() + counter)

  const handleReduceStep = () => {
    setStep((curStep) => curStep - 1)
  }
  const handleIncreaseStep = () => {
    setStep((curStep) => curStep + 1)
  }

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
  return (
    <>
      <div className="step">
        <button onClick={handleReduceStep}>-</button>
        <h4>Step:{step}</h4>
        <button onClick={handleIncreaseStep}>+</button>
      </div>
      <div className="counter">
        <button onClick={handleReduceCounter}>-</button>
        <h4>Counter:{counter}</h4>
        <button onClick={handleIncreaseCounter}>+</button>
      </div>
      <div className="date">
        {counter} {getDayString()} {counterDate.toDateString()}
      </div>
    </>
  )
}

export default App
