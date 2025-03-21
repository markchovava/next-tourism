"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export async function placeImageDeleteApiAction(id) {
    const cookieStore = cookies()
    const authToken = cookieStore.get('ENJOYZIM_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); } 
    const res = await fetch(`${baseURL}api/place-image/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}