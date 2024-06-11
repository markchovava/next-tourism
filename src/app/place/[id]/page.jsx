import React from 'react'
import PlaceView from './components/PlaceView'
import { getPlace } from '@/api/getPlaces';

export default async function page({ params: {id} }) {
  const place = await getPlace(id);

  return (
    <div>
        <PlaceView place={place} />
    </div>
  )
}
