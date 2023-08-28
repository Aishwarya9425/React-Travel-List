export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>C'mon start packing already 🤨 Add items to the list!!</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percent = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percent === 100
          ? "You have packed everything! Letss goooo!! ✈️"
          : `You have ${numItems} items on your list and you have already packed
          ${numPacked} (${percent}%)`}
      </em>
    </footer>
  );
}
