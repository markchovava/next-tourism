import { baseURL } from "./baseURL";



export async function getAdvertbyPriority(num) {
    const response = await fetch(`${baseURL}advert-by-priority?priority=${num}`, 
        { cache: 'no-store'
    });
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}