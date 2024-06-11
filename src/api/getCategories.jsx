import { baseURL } from "./baseURL";


export async function getCategories() {
    const response = await fetch(`${baseURL}category`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}


export async function getCategoriesOne() {
    const response = await fetch(`${baseURL}category-one`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}


export async function getCategoryPlaces(slug) {
    const response = await fetch(`${baseURL}category-places?slug=${slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}

export async function getCategoryBySlug(slug) {
    const response = await fetch(`${baseURL}category-by-slug?slug=${slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }
    return await response.json()
}