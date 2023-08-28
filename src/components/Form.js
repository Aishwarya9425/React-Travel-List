import { useState } from "react";

export default function Form({ onAddItems }) {
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
