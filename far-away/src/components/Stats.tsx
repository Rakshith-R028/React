import { StatsProps } from "../interface/types"

export default function Stats({ items }: StatsProps) {
  const numItems = items.length
  const itemsPacked = items.filter((item) => item.packed).length
  const percentage = Math.round((itemsPacked / numItems) * 100)
  return (
    <footer className="stats">
      <em>
        {!numItems
          ? "Start adding some items to your list🚀"
          : percentage !== 100
            ? `You have ${numItems} items on your listenerCount, and you have already
        packed ${itemsPacked} (${percentage}%)`
            : "You got everything! Ready to go!"}
      </em>
    </footer>
  )
}
