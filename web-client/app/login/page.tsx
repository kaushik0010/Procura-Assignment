"use client"; // This component needs interactivity for the hook

import { useActionState } from 'react';
import { login } from './actions';

const initialState = {
  message: '',
};

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Login</h1>
      <form action={formAction}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          defaultValue="testuser"
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Login</button>
        {state?.message && <p style={{ color: 'red' }}>{state.message}</p>}
      </form>
    </div>
  );
}