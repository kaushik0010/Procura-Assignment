import { cookies } from 'next/headers';
import { api, setAuthToken } from '@/lib/api';
import { ProductForm } from './product-form';
import Link from 'next/link';

async function getProducts(token: string) {
  try {
    setAuthToken(token);
    const res = await api.get('/products');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch products');
    return [];
  }
}

export default async function HomePage() {
  const token = (await cookies()).get('session_token')?.value;

  if (!token) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Welcome</h1>
        <p>Please <Link href="/login">login</Link> to view products.</p>
      </div>
    );
  }

  const products = await getProducts(token);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Products</h1>
      <ProductForm />
      <hr style={{ margin: '20px 0' }} />
      <h2>Existing Products</h2>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            {p.name} - ${p.rate} (Code: {p.code})
          </li>
        ))}
      </ul>
    </div>
  );
}