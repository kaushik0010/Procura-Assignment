"use server";

import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface FormState {
  message: string;
}

export async function login(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const username = formData.get('username');

  try {
    const res = await api.post('/auth/login', { username });
    const { access_token } = res.data;

    if (!access_token) {
      return { message: 'Login failed: No token received.' };
    }

    // Set cookie for session management
    (await cookies()).set('session_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });
  } catch (error) {
    console.error(error);
    return { message: 'Login failed. Please try again.' };
  }

  // Redirect to the home page on success
  redirect('/');
}