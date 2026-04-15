import { ListItemProps } from "../interface/types"

export default function List({
  item,
  handleToggleItem,
  onToggleDelete,
}: ListItemProps) {
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => handleToggleItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onToggleDelete(item.id)}>❌</button>
      </li>
    </>
  )
}
