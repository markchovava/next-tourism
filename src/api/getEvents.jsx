import { baseURL } from "./baseURL";



export async function getEventsByNumber(num) {
    const response = await fetch(`${baseURL}event-by-number?number=${num}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}


export async function getEvents() {
    const response = await fetch(`${baseURL}event`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getEvent(id) {
    const response = await fetch(`${baseURL}event/${id}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}
