import React, { useState, useEffect } from 'react';
import './App.css';
import { getItems, createItem, updateItem, deleteItem } from './api';
import { Item } from './types';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (error: any) {
      console.error('Ошибка загрузки:', error.response?.data || error.message);
      alert(`Ошибка загрузки: ${error.response?.data?.detail || 'Сервер недоступен'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (item: Omit<Item, 'id'>) => {
    try {
      await createItem(item);
      await fetchItems();
    } catch (error: any) {
      console.error('Ошибка создания:', error.response?.data || error.message);
      alert(`Ошибка создания: ${error.response?.data?.detail || 'Проверьте введённые данные'}`);
    }
  };

  const handleUpdate = async (id: number, item: Partial<Item>) => {
    await updateItem(id, item);
    await fetchItems();
  };

  const handleDelete = async (id: number) => {
    await deleteItem(id);
    await fetchItems();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Items Management</h1>
        
        <ItemForm onSubmit={handleCreate} />
        
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="items-container">
            {items.map(item => (
              <div key={item.id} className="item-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
