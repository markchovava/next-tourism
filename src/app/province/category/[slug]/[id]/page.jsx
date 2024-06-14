import React from 'react'
import PlaceList from './components/PlaceList'
import { getProvinceBySlug, getProvinceCategoryPlaces } from '@/api/getProvinces';



export default async function page({ params: {slug, id} }) {
    const category_slug = slug;
    const province_slug = id;
    const [province, places] = await Promise.all([
          getProvinceBySlug(id),
          getProvinceCategoryPlaces(category_slug, province_slug),
        ]);

  return (
    <div>
        <PlaceList category_slug={category_slug} province_slug={province_slug} province={province} places={places} />
    </div>
  )
}
