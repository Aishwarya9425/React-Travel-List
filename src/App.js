const initialItems = [
  { id: 1, description: "Shorts", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 1, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: true },

];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>📝Plan to Travel🧳🏖️🏔️</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip ? 🤔</h3>
    </div>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}
        {item.quantity}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have N items on your list and you have already packed N%</em>
    </footer>
  );
}
