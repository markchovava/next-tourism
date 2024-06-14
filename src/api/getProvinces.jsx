import { baseURL } from "./baseURL";


export async function getProvinces() {
    const response = await fetch(`${baseURL}province`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}


export async function getProvinceCategoryPlaces(category_slug, province_slug) {
    const response = await fetch(`${baseURL}province-category-places?category_slug=${category_slug}&province_slug=${province_slug}`, 
                        { cache: 'no-store'}
                    );
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}


export async function getProvinceBySlug(slug) {
    const response = await fetch(`${baseURL}province-by-slug?slug=${slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}


export async function getProvinceCities(slug) {
    const response = await fetch(`${baseURL}province-cities?slug=${slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}


export async function getProvincesAll() {
    const response = await fetch(`${baseURL}province-all`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}