import React from 'react'
import CityView from './components/CityView'

export default async function page({params: {id} }) {
  return (
    <div>
        <CityView id={id}  />
    </div>
  )
}
