import { baseURL } from "./baseURL";


export async function getPlacesOne() {
    const response = await fetch(`${baseURL}place-one`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json();
}


export async function getPlace(id) {
    const response = await fetch(`${baseURL}place/${id}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json();
}

export async function getPlaces() {
    const response = await fetch(`${baseURL}place`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json();
}
