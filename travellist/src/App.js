import { useState } from "react";

const optionArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const App = () => {
  const [items, setItems] = useState([]);
  const handleItemArray = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((items) => items.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form handleItemArray={handleItemArray} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
};

const Logo = () => {
  return <h1>🌴 Far Away 💼</h1>;
};

function Form({ handleItemArray }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    handleItemArray(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        console.log(quantity)
        {optionArray.map((option) => (
          <option key={option}>{option}</option>
        ))}
        ;
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

const PackingList = ({ item, items, onDeleteItem, onToggleItem }) => {
  return (
    <div className="list">
      <li>
        <input
          type="checkbox"
          value={items.packed}
          onChange={() => onToggleItem(items.id)}
        />
        <span style={items.packed ? { textDecoration: "line-through" } : {}} />
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </li>
    </div>
  );
};

const Item = ({ item, onDeleteItem }) => {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      💼 You have X items on your list, and you already packed X (X%)
    </footer>
  );
};

export default App;
