import { useState } from "react"

const initialFriends: any = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
]

type Friend = {
  id: string | number
  name: string
  image: string
  balance: number
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null)
  const [showFriendList, setShowFriendList] = useState<Friend[]>(initialFriends)

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show)
  }

  function onHandleNewAddedFriend(friend: any) {
    setShowFriendList((friends: any) => [...friends, friend])
    setShowAddFriend(false)
  }

  function handleSelectedFriend(friend: any) {
    setSelectedFriend((selected: any) =>
      selected?.id === friend?.id ? null : friend,
    )
    setShowAddFriend(false)
  }
  function handleSplit(value: number) {
    if (!selectedFriend) return
    setShowFriendList((friends: any) =>
      friends.map((friend: any) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend,
      ),
    )

    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={showFriendList}
          selectedFriend={selectedFriend}
          handleSelectedFriend={handleSelectedFriend}
        />
        {showAddFriend && (
          <FormAddFriend
            onHandleNewFriend={onHandleNewAddedFriend}
            handleShowAddFriend={handleShowAddFriend}
          />
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleSplit={handleSplit}
        />
      )}
    </div>
  )
}

function Button({ children, onClick }: any) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function FriendsList({ friends, selectedFriend, handleSelectedFriend }: any) {
  return (
    <ul>
      {friends?.map((friend: any) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  )
}

function Friend({ friend, handleSelectedFriend, selectedFriend }: any) {
  const isSelected = selectedFriend?.id === friend.id
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${friend.balance}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => handleSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  )
}

function FormAddFriend({ onHandleNewFriend }: any) {
  const [friendName, setFriendName] = useState("")
  const [friendImg, setFriendImg] = useState("https://i.pravatar.cc/48")

  function handleAddFriend(e: any) {
    e.preventDefault()

    if (!friendImg || !friendName) return

    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name: friendName,
      image: `${friendImg}?u=${id}`,
      balance: 0,
    }
    onHandleNewFriend(newFriend)

    setFriendImg("https://i.pravatar.cc/48")
    setFriendName("")
  }

  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>🌄Image</label>
      <input
        type="text"
        value={friendImg}
        onChange={(e) => setFriendImg(e.target.value)}
      />

      <Button onClick={handleAddFriend}>Add</Button>
    </form>
  )
}

function FormSplitBill({ selectedFriend, handleSplit }: any) {
  const [billValue, setBillValue] = useState(0)
  const [paidByYou, setPaidByYou] = useState(0)
  const paidByFriend = billValue - paidByYou
  const [whoIsPaying, setwhoIsPaying] = useState("you")

  function handleSubmit(e: any) {
    e.preventDefault()

    if (!billValue) return

    handleSplit(whoIsPaying === "you" ? paidByFriend : -paidByYou)
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a Bill with {selectedFriend?.name}</h2>

      <label>💸 Bill Value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />

      <label>🧍‍♂️ Your Expense</label>
      <input
        type="text"
        value={paidByYou}
        onChange={(e) =>
          setPaidByYou(
            Number(e.target.value) > billValue
              ? paidByYou
              : Number(e.target.value),
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend?.name}'s Expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setwhoIsPaying(e.target.value)}
      >
        <option value="you">You</option>
        <option value="friend">{selectedFriend?.name}</option>
      </select>

      <Button>Split</Button>
    </form>
  )
}
