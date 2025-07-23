export interface Item {
  id: number;
  name: string;
  description?: string;
  price: number;
  is_available: boolean;
}

export interface ItemCreate {
  name: string;
  description?: string;
  price: number;
  is_available: boolean;
}

export interface ItemUpdate {
  name?: string;
  description?: string;
  price?: number;
  is_available?: boolean;
}
