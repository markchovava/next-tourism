import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import CategoryPlaceList from './components/CategoryPlaceList'
import { getCategoryBySlug, getCategoryPlaces } from '@/api/getCategories'
import { getCitiesAll } from '@/api/getCities'



export default async function page({ params: {slug} }) {
    const [category, places, cities] = await Promise.all([getCategoryBySlug(slug), 
                              getCategoryPlaces(slug), getCitiesAll()
                            ]);

  return (
    <div>
      
      <CategoryPlaceList category={category} places={places} cities={cities} slug={slug} />

    </div>
  )

}
