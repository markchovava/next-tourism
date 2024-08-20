import React from 'react'
import GuidePlaceList from './components/GuidePlaceList'
import { getProvinceGuidePlaces } from '@/api/getPlaces';
import { getProvinceBySlug } from '@/api/getProvinces';





export default async function page({ params: {id, slug} }) {
    const province_slug = id;
    const guide_slug = slug;
    const [placeData, province] = await Promise.all([
        getProvinceGuidePlaces(province_slug, guide_slug), 
        getProvinceBySlug(province_slug),
      ]);


  return (
    <>
    <GuidePlaceList 
      dbData={placeData} 
      province={province} 
      province_slug={province_slug} 
      guide_slug={guide_slug} />
    </>
  )
}
