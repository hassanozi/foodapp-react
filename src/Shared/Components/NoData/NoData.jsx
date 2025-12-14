import React from 'react'
import nodataimg from '../../../assets/images/nodata.png';

export default function NoData() {
  return (
    <div className='text-center'>
       <img src={nodataimg} alt="" />
    </div>
  )
}
