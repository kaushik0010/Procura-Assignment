"use client";

import { useActionState } from 'react';
import { createProduct } from './actions';

const initialState = {
  message: '',
};

export function ProductForm() {
  const [state, formAction] = useActionState(createProduct, initialState);

  return (
    <form action={formAction}>
      <h3>Create New Product</h3>
      <div>
        <input name="code" placeholder="Product Code" required />
        <input name="name" placeholder="Product Name" required />
        <input name="rate" type="number" step="0.01" placeholder="Rate" required />
        <button type="submit">Create Product</button>
      </div>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}