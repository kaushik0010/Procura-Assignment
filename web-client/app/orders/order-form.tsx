"use client";

import { useActionState, useState } from 'react';
import { createOrder } from './actions';

// Define the type for a product to be passed as a prop
type Product = {
  id: string;
  name: string;
  rate: number;
};

// Define the type for an item in our local state
type OrderItem = {
  productId: string;
  quantity: number;
};

const initialState = {
  message: '',
  success: false,
};

export function OrderForm({ products }: { products: Product[] }) {
  const [state, formAction] = useActionState(createOrder, initialState);
  const [items, setItems] = useState<OrderItem[]>([{ productId: '', quantity: 1 }]);

  // Function to add a new product line to the order
  const addProductLine = () => {
    setItems([...items, { productId: '', quantity: 1 }]);
  };

  return (
    <form action={formAction}>
      <h3>Create New Order</h3>
      <div>
        <input name="customerName" placeholder="Customer Name" required />
        <input name="customerPhone" placeholder="Customer Phone" required />
      </div>
      <hr style={{ margin: '15px 0' }} />
      <h4>Products</h4>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <select name="productId" required>
            <option value="">Select a Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - ${p.rate}
              </option>
            ))}
          </select>
          <input
            name="quantity"
            type="number"
            defaultValue={1}
            min={1}
            style={{ marginLeft: '10px', width: '60px' }}
            required
          />
        </div>
      ))}

      <button type="button" onClick={addProductLine} style={{ marginRight: '10px' }}>
        Add Product
      </button>
      <button type="submit">Place Order</button>

      {state?.message && (
        <p style={{ color: state.success ? 'green' : 'red' }}>
          {state.message}
        </p>
      )}
    </form>
  );
}