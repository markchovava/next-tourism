"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function guideViewAction(slug) {
    const res = await fetch(`${baseURL}guide-by-slug?slug=${slug}`, {
        'method': 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    }); 
    return await res.json();
}
