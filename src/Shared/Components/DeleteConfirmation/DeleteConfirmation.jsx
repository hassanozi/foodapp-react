import React from 'react'
import NoData from '../../../Shared/Components/NoData/NoData';

export default function DeleteConfirmation({deleteItem,name}) {
  return (
    
    <>
      <div className='text-center'>
        <NoData />
        <h4>Delete this {deleteItem} {name}</h4>
      </div>
    </>
  )
}
