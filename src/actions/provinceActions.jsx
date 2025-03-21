"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function provinceGuidePlacesAction(province_slug, guide_slug) {
    const url = `${baseURL}province-guide-places/${province_slug}/${guide_slug}`;
    const res = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }); 
    return await res.json();
}

export async function provinceListAllApiAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/province-all`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}