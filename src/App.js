import { useState } from 'react';
import './App.css';

function App() {

  const [items, setItems] = useState([
    { id: 1, name: 'Apples', category: 'Fruits', quantity: 5 },
    { id: 2, name: 'Bananas', category: 'Fruits', quantity: 12 },
    { id: 3, name: 'Carrots', category: 'Vegetables', quantity: 8 },
  ]);

  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });
  const [filter, setFilter] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  // Define a function to handle adding a new item
  const handleAddItem = () => {
    // Check if any of the required fields (name, category, or quantity) are empty
    if (!newItem.name || !newItem.category || newItem.quantity === '') {
      // Display an alert if any required field is empty
      alert('All fields are required.');
      return;
    }

    const quantity = parseInt(newItem.quantity);
    if (quantity === 0) {
      alert('Quantity must be greater than zero.');
      return;
    } else if(quantity<0){
      alert("Quantity not negative, Please enter Positive number");
      return;
    }
    setItems([
      ...items,
      { ...newItem, id: Date.now(), quantity },
    ]);
    setNewItem({ name: '', category: '', quantity: '' });
  };

  // Define a function named handleEditItem that takes two parameters: id and updatedItem
  const handleEditItem = (id, updatedItem) => {
    // Parse the quantity from the updatedItem to an integer
    const quantity = parseInt(updatedItem.quantity);
    // Check if the quantity is exactly zero
    if (quantity === 0) {
      // Display an alert message indicating that the quantity must be greater than zero
      alert('Quantity must be greater than zero.');
      return;
    } else if(quantity<0){
      alert("Quantity not negative, Please enter Positive number");
      return;
    }
    setItems(items.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Define a function named handleSort to handle the sorting of items
  const handleSort = () => {
    // Toggle the sortAscending state to switch between ascending and descending order
    setSortAscending(!sortAscending);
    setItems([...items].sort((a, b) => (sortAscending ? a.quantity - b.quantity : b.quantity - a.quantity)));
  };

  const filteredItems = (filter) ? items.filter(item => item.category.toLowerCase().includes(filter.toLowerCase())) : items;


  
  return (
    <div className="App">
      <h1>Inventory Management</h1>

      {/* Add New Item */}
      <div className="add-item">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={e => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={handleAddItem} className="button">Add Item</button>
      </div>

      {/* Filter by Category */}
      <div className="filter">
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* Inventory Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th onClick={handleSort} style={{ cursor: 'pointer' }}>
              Quantity {sortAscending ? '↑' : '↓'}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id} className={item.quantity < 10 ? 'low-stock' : ''}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  onClick={() =>
                    handleEditItem(item.id, {
                      ...item,
                      quantity: prompt('Enter new quantity:', item.quantity) || item.quantity,
                    })
                  }
                className='edit'>
                  Edit
                </button>
                <button onClick={() => handleDeleteItem(item.id)} className='delete'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
