import React from 'react'

import PlaceList from './components/PlaceList'
import { getPlaces } from '@/api/getPlaces'

export default async function page() {
  const places = await getPlaces()
  return (
    <div>
       
       <PlaceList places={places}/>
       
    </div>
  )
}
