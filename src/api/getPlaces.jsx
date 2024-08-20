import { baseURL } from "./baseURL";


export async function getCityGuidePlaces(city_slug, guide_slug) {
    const response = await fetch(`${baseURL}place-city-guide?city_slug=${city_slug}&guide_slug=${guide_slug}`, { cache: 'no-store'});
    if(!response.ok) {
       throw new Error('Failed to fetch Data.');
    }
    return await response.json();
}

export async function getProvinceGuidePlaces(province_slug, guide_slug) {
    const response = await fetch(`${baseURL}place-province-guide?province_slug=${province_slug}&guide_slug=${guide_slug}`, { cache: 'no-store'})
    if(!response.ok) {
       throw new Error('Failed to fetch Data.')
    }
    return await response.json();
}

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
