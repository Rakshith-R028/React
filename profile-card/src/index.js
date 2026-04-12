import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillSet />
      </div>
    </div>
  )
}

function Avatar() {
  return <img src="download.jpg" alt="User pic" className="avatar" />
}

function Intro() {
  return (
    <div>
      <h1>Jonas Schmedtmann</h1>
      <p>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, I like to play board games, to cook (and eat), or to
        just enjoy the Portuguese sun at the beach.
      </p>
    </div>
  )
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.colour }}>
      <span>{props.name}</span>
      <span>{props.emoji}</span>
    </div>
  )
}

function SkillSet() {
  return (
    <div className="skill-list">
      <Skill name={"HTML+CSS"} emoji={"💪"} colour={"red"} />
      <Skill name={"Javascript"} emoji={"💪"} colour={"blue"} />
      <Skill name={"Web Design"} emoji={"👍"} colour={"green"} />
      <Skill name={"React"} emoji={"💪"} colour={"orange"} />
      <Skill name={"Svelte"} emoji={"👶"} colour={"grey"} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
