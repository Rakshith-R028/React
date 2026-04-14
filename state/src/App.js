import { useState } from "react"

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
]

function App() {
  const btnBgColorActive = { backgroundColor: "#7950f2" }
  const [step, setStep] = useState(0)
  const [isClose, setIsClose] = useState(true)
  const handlePrevious = () => {
    if (step > 0) setStep((curStep) => curStep - 1)
  }

  const handleNext = () => {
    if (step < 2) setStep((curStep) => curStep + 1)
  }

  const handleClose = () => {
    setIsClose((isClose) => !isClose)
  }

  return (
    <>
      <button className="close" onClick={handleClose}>
        &times;
      </button>
      {isClose && (
        <div className="steps">
          <div className="numbers">
            <div className={step === 0 ? "active" : ""}>1</div>
            <div className={step === 1 ? "active" : ""}>2</div>
            <div className={step === 2 ? "active" : ""}>3</div>
          </div>
          <div className="message">{messages[step]}</div>
          <div className="buttons">
            <button
              onClick={handlePrevious}
              style={btnBgColorActive}
              disabled={step === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              style={btnBgColorActive}
              disabled={step === 2}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
