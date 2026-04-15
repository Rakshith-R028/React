import { useState } from "react"
import { itemProps, PackingListProps } from "../interface/types"
import List from "./List"

export default function PackingList({
  items,
  handleToggleItem,
  onClear,
  onToggleDelete,
}: PackingListProps) {
  const [sortBy, setSortBy] = useState("input")
  let sortedItems: itemProps[]

  if (sortBy === "input") sortedItems = items

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description))

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed))

  return (
    <div className="list">
      <ul>
        {sortedItems!.map((item: itemProps) => (
          <List
            item={item}
            key={item.id}
            handleToggleItem={handleToggleItem}
            onToggleDelete={onToggleDelete}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  )
}
