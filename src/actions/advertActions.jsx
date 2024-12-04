"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



/* AUTHENTICATED */
export async function advertByPriorityApiAction(num) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/advert-by-priority?priority=${num}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function advertListByUserApiAction() {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/advert-by-user`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function advertListApiAction() {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${baseURL}api/advert`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function advertPaginationApiAction(url) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function advertSearchApiAction(data) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/advert-search?search=${data}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/advert');
    return await res.json();
}

export async function advertViewApiAction(id) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${baseURL}api/advert/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function advertStoreApiAction(data) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }

    const res = await fetch(`${baseURL}api/advert`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/advert');
    return await res.json();
}

export async function advertUpdateApiAction(data, id) {
    const cookieStore = cookies()
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/advert/${id}`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath(`/admin/advert/${id}`);
    return await res.json();
}

export async function advertDeleteApiAction(id) {
    const cookieStore = cookies()
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    
    const res = await fetch(`${baseURL}api/advert/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/advert');
    return await res.json();
}