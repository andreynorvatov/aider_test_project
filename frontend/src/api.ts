import axios from 'axios';

const API_URL = 'http://localhost:8001/items';

export interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  is_available: boolean;
}

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (id: number, item: Partial<Item>): Promise<Item> => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

export const deleteItem = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
