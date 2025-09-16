"use server";

import { api, setAuthToken } from '@/lib/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

interface FormState {
  message: string;
  success: boolean;
}

// Action to fetch all products to display in the order form
export async function getProductsForOrder() {
  const token = (await cookies()).get('session_token')?.value;
  if (!token) {
    throw new Error('Not authenticated');
  }
  try {
    setAuthToken(token);
    const res = await api.get('/products');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch products for order form', error);
    return [];
  }
}

// Action to handle the creation of a new order
export async function createOrder(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = (await cookies()).get('session_token')?.value;
  if (!token) {
    return { message: 'Authentication error.', success: false };
  }
  setAuthToken(token);

  try {
    const customerDetails = {
      name: formData.get('customerName'),
      phone: formData.get('customerPhone'),
    };

    // FormData sends multiple values with the same name as an array.
    // We need to collect all product IDs and quantities.
    const productIds = formData.getAll('productId');
    const quantities = formData.getAll('quantity');

    const items = productIds.map((productId, index) => ({
      productId: String(productId),
      quantity: Number(quantities[index]),
    }));

    const orderPayload = {
      customerDetails,
      items,
    };
    
    // Send the data to our NestJS API Gateway
    await api.post('/orders', orderPayload);

    // Refresh the data on the orders page to show the new order
    revalidatePath('/orders'); 
    return { message: 'Order created successfully!', success: true };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to create order.', success: false };
  }
}