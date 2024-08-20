import React from 'react'
import GuidePlaceList from './components/GuidePlaceList'
import { getCityGuidePlaces } from '@/api/getPlaces';
import { getCityBySlug } from '@/api/getCities';



export default async function page({ params: {id, slug} }) {
    const city_slug = id;
    const guide_slug = slug;
    const [placeData, city] = await Promise.all([
        getCityGuidePlaces(city_slug, guide_slug), 
        getCityBySlug(city_slug),
      ]);


  return (
    <>
    <GuidePlaceList 
      dbData={placeData} 
      city={city} 
      city_slug={city_slug} 
      guide_slug={guide_slug} />
    </>
  )
}
