import React, { useState } from 'react';
import { Item } from '../types';

interface ItemFormProps {
  onSubmit: (data: Omit<Item, 'id'>) => void;
  initialData?: Partial<Item>;
  buttonText?: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ 
  onSubmit, 
  initialData = {}, 
  buttonText = 'Create' 
}) => {
  const [formData, setFormData] = useState<Omit<Item, 'id'>>({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || 0,
    is_available: initialData.is_available ?? true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      const payload = {
        name: formData.name.trim(),
        description: formData.description?.trim() || "",
        price: Number(formData.price) || 0,
        is_available: formData.is_available
      };
      console.log('Отправляем данные:', payload);
      onSubmit(payload);
      setFormData({ name: '', description: '', price: 0, is_available: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Item name"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        step="0.01"
        min="0"
        required
      />
      <label>
        <input
          type="checkbox"
          name="is_available"
          checked={formData.is_available}
          onChange={(e) => setFormData(prev => ({ ...prev, is_available: e.target.checked }))}
        />
        Available
      </label>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default ItemForm;
