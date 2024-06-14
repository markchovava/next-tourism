import React from 'react'
import PlaceList from './components/PlaceList'
import { getCityBySlug, getCityCategoryPlaces } from '@/api/getCities';



export default async function page({ params: {slug, id}}) {
  const city_slug = id;
  const category_slug = slug;
  const [city, places] = await Promise.all([
    getCityBySlug(city_slug),
    getCityCategoryPlaces(category_slug, city_slug)
  ]);


  return (
    <div>
        <PlaceList places={places} city={city} city_slug={city_slug} category_slug={category_slug} />
    </div>
  )
}
