import { baseURL } from "./baseURL";



export async function getPlacesByGuideSlug(slug) {
    const response = await fetch(`${baseURL}place-guide-by-slug?slug=${slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

