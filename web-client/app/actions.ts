"use server";

import { api, setAuthToken } from '@/lib/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

interface CreateProductState {
  message: string;
}

export async function createProduct(
  prevState: CreateProductState,
  formData: FormData,
): Promise<CreateProductState> {
  const token = (await cookies()).get('session_token')?.value;
  if (!token) {
    return { message: 'Authentication error.' };
  }
  setAuthToken(token); // Set token for the API call

  try {
    const newProduct = {
      code: formData.get('code'),
      name: formData.get('name'),
      rate: Number(formData.get('rate')),
    };
    await api.post('/products', newProduct);
    revalidatePath('/'); // This tells Next.js to refresh the data on the page
    return { message: 'Product created successfully!' };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to create product.' };
  }
}