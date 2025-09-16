import { cookies } from 'next/headers';
import { api, setAuthToken } from '@/lib/api';
import { OrderForm } from './order-form';
import { getProductsForOrder } from './actions';
import Link from 'next/link';

// Function to fetch existing orders on the server
async function getOrders(token: string) {
  try {
    setAuthToken(token);
    const res = await api.get('/orders');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch orders');
    return [];
  }
}

export default async function OrdersPage() {
  const token = (await cookies()).get('session_token')?.value;

  if (!token) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Orders</h1>
        <p>Please <Link href="/login">login</Link> to manage orders.</p>
      </div>
    );
  }

  // Fetch data in parallel for better performance
  const [orders, products] = await Promise.all([
    getOrders(token),
    getProductsForOrder(),
  ]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Manage Orders</h1>
      <Link href="/">Back to Products</Link>
      <hr style={{ margin: '20px 0' }} />
      <OrderForm products={products} />
      <hr style={{ margin: '20px 0' }} />

      <h2>Past Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map((order: any) => (
            <li key={order.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Customer:</strong> {order.customerDetails.name} ({order.customerDetails.phone})<br />
              <strong>Total:</strong> ${order.totalAmount}<br />
              <strong>Items:</strong>
              <ul>
                {order.items.map((item: any) => (
                  <li key={item.id}>
                    {item.quantity} x {item.productName} @ ${item.productRate}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}