import React from 'react'

import PlaceList from './components/PlaceList'
import { getPlaces } from '@/api/getPlaces'
import { getCitiesAll } from '@/api/getCities';




export default async function page() {
  const [places, cities] = await Promise.all([ getPlaces(), getCitiesAll() ]);
  return (
    <div>
       
       <PlaceList places={places} cities={cities} />
       
    </div>
  )
}
