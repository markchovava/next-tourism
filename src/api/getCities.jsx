import { baseURL } from "./baseURL";


export async function getCitiesOne() {
    const response = await fetch(`${baseURL}city-one`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}



export async function getCity(id) {
    const response = await fetch(`${baseURL}city/${id}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}


export async function getCitiesAll() {
    const response = await fetch(`${baseURL}city-all`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}
