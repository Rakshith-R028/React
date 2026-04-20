import { useState } from "react"

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
]

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  )
}

function Accordion({ data }) {
  const [curOpen, setCurOpen] = useState(null)
  return (
    <div>
      {data.map((faq, i) => (
        <AccordionItem
          num={i}
          curOpen={curOpen}
          setCurOpen={setCurOpen}
          title={faq.title}
          text={faq.text}
          key={i}
        />
      ))}
    </div>
  )
}

function AccordionItem({ num, text, title, curOpen, setCurOpen }) {
  let isOpen = num === curOpen
  return (
    <div className={`item ${isOpen ? "open" : ""}`}>
      <p className="number">{num < 9 ? `0${num + 1}` : `${num + 1}`}</p>
      <p className={"title"}>{title}</p>
      <p className="icon" onClick={() => setCurOpen(num)}>
        {isOpen ? "-" : "+"}
      </p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  )
}
