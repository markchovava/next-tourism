import React from 'react'
import CityPlaces from './components/CityPlaces'
import { getCityBySlug, getCityPlaces } from '@/api/getCities';
import CarouselCategory from '../components/CarouselCategory';
import { getCategoriesOne } from '@/api/getCategories';



export default async function page({ params: {slug} }) {
  const [places, city, categoriesOne] = await Promise.all([
        getCityPlaces(slug), 
        getCityBySlug(slug),
        getCategoriesOne(),
      ]);

  return (
    <div>
        <CityPlaces city={city} places={places} slug={slug} />
        <CarouselCategory 
            slug={slug}
            title={'Top Categories'} 
            categoriesOne={categoriesOne} />
    </div>
  )
}
