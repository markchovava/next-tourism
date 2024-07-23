import { baseURL } from "./baseURL";



export async function getAppInfo() {
    const response = await fetch(`${baseURL}app-info`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}