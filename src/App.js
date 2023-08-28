import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]); //items is an array

  //we need the items in packing list comp
  //but cant pass it as props since form and packing list are siblings
  //data can flow only down the tree
  //so move the items state to app parent comp
  function handleAddItems(item) {
    //new state depends on the current state
    //cant mutate state so add current item to existing items
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //send the items as prop to packing list and send function to form
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>📝Plan to Travel🧳🏖️🏔️</h1>;
}
function Form({ onAddItems }) {
  //react should control the form elements state not the dom
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //function to submit new item
  function handleSubmit(e) {
    //disable default html way of reloading the page when submitting
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    //reset the fields after adding new item
    onAddItems(newItem);
    setDescription("");
    setQuantity("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ? 🤔</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add your item here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button> Add ➕</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} &nbsp;
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
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
