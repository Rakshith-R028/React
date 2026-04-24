const initialFriends = [
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

export default function App() {
  return (
    <>
      <SelectFriends />
    </>
  )
}

function SelectFriends() {
  return (
    <div className="sidebar">
      {initialFriends.map((friend) => (
        <ul>
          <li>
            <img src={friend.image} alt="Friend Pic" />
            <h2>{friend.name}</h2>
            <p>
              You Owe {friend.name} ${friend.balance}
            </p>
            <button>Select</button>
          </li>
        </ul>
      ))}
    </div>
  )
}
