import { baseURL } from "./baseURL";


export async function getGuides() {
    const response = await fetch(`${baseURL}guide`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getGuideBySlug(slug) {
    const response = await fetch(`${baseURL}guide-by-slug?slug=${slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}
