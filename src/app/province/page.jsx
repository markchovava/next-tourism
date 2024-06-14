import React from 'react'
import ProvinceList from './components/ProvinceList'
import { getProvinces } from '@/api/getProvinces'



export default async function page() {
    const provinces = await getProvinces();
  return (
    <div>
        <ProvinceList provinces={provinces} />
    </div>
  )
}
