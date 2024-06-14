import React from 'react'
import CityList from './components/CityList'
import { getCities } from '@/api/getCities';
import { getCategoriesOne } from '@/api/getCategories';
import CarouselCategory from '../components/CarouselCategory';



export default async function page() {
  const [cities, categoriesOne] = await Promise.all([getCities(), getCategoriesOne()]);
  

  return (
    <div>
        <CityList cities={cities} />
        <CarouselCategory title='Top Categories' categoriesOne={categoriesOne} />
    </div>
  )
}
