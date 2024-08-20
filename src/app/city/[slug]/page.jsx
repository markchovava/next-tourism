import React from 'react'
import CityPlaces from './components/CityPlaces'
import { getCityBySlug, getCityPlaces } from '@/api/getCities';
import CarouselCategory from '../components/CarouselCategory';
import { getCategoriesOne } from '@/api/getCategories';
import { getGuides } from '@/api/getGuides';
import CarouselGuide from './components/CarouselGuide';



export default async function page({ params: {slug} }) {
  const [places, city, categoriesOne, guidesData] = await Promise.all([
        getCityPlaces(slug), 
        getCityBySlug(slug),
        getCategoriesOne(),
        getGuides(),
      ]);

  return (
    <>
        <CityPlaces city={city} places={places} slug={slug} />
        <CarouselCategory 
            slug={slug}
            title={'Top Categories'} 
            categoriesOne={categoriesOne} />
        
        <CarouselGuide
            city_slug={slug} 
            title={'Travel Guides'} 
            dbData={guidesData} />
    </>
  )
}
