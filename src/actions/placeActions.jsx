"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



/* AUTHENTICATED */
export async function placeByProvinceGuideApiAction(province_slug, guide_slug) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/place-by-province-guide?province_slug=${province_slug}&guide_slug=${guide_slug}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function placeByCityGuideApiAction(city_slug, guide_slug) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/place-by-city-guide?city_slug=${city_slug}&guide_slug=${guide_slug}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function placeSearchListApiAction(input) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/place?search=${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}
export async function placeListApiAction() {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/place`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function placePaginationApiAction(url) {
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

export async function placeViewApiAction(id) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/place/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function placeStoreApiAction(data) {
    const cookieStore = cookies();
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/place`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/place');
    return await res.json();
}

export async function placeUpdateApiAction(data, id) {
    const cookieStore = cookies()
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/place/${id}`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath(`/admin/place/${id}`);
    return await res.json();
}

export async function placeDeleteApiAction(id) {
    const cookieStore = cookies()
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); } 
    const res = await fetch(`${baseURL}api/place/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/place');
    return await res.json();
}