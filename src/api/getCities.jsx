import { baseURL } from "./baseURL";


export async function getCitiesOne() {
    const response = await fetch(`${baseURL}city-one`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}


export async function getCities() {
    const response = await fetch(`${baseURL}city`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json()
}


export async function getCityCategoryPlaces(category_slug, city_slug) {
    const response = await fetch(`${baseURL}city-category-places?category_slug=${category_slug}&city_slug=${city_slug}`, 
                    {cache: 'no-store'});
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

export async function getCityBySlug(slug) {
    const response = await fetch(`${baseURL}city-by-slug?slug=${slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json()
}

export async function getCityPlaces(slug) {
    const response = await fetch(`${baseURL}city-places?slug=${slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
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
