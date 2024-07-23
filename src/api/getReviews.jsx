import { baseURL } from "./baseURL";



export async function getReviewsByPlace(id) {
    const response = await fetch(`${baseURL}review-by-place-id/${id}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}