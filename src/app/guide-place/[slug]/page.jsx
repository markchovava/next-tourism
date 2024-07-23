
import React from 'react'
import GuidePlaceList from './components/GuidePlaceList'
import { getPlacesByGuideSlug } from '@/api/getPlaceGuides'
import { getGuideBySlug } from '@/api/getGuides';



export default async function page({ params: {slug} }) {
    const [dbData, guideData] = await Promise.all([getPlacesByGuideSlug(slug), getGuideBySlug(slug) ]);



  return (
    <>
    <GuidePlaceList slug={slug} dbData={dbData} guideData={guideData}  />
    </>
  )
}
