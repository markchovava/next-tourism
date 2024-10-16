"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";



export async function loginAction(formData) {
  const res = await fetch(`${baseURL}login`, {
    'method': 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    }
  }); 
  revalidatePath('/');
  return await res.json();
}

export async function logoutAction(token) {
  const res = await fetch(`${baseURL}api/logout`, {
    'method': 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  revalidatePath('/login');
  return await res.json();
}

export async function registerAction(formData) {
    const res = await fetch(`${baseURL}register`, {
      'method': 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    revalidatePath('/login');
    return await res.json();
}