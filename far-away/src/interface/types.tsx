export interface itemProps {
  id: number
  description: string
  quantity: number
  packed: boolean
}

export type FormProps = {
  onAddItems: (item: itemProps) => void
}

export type PackingListProps = {
  items: itemProps[]
  handleToggleItem: (id: number) => void
  onClear: () => void
  onToggleDelete: (id: number) => void
}

export type ListItemProps = {
  item: itemProps
  handleToggleItem: (id: number) => void
  onToggleDelete: (id: number) => void
}

export type StatsProps = {
  items: itemProps[]
}
