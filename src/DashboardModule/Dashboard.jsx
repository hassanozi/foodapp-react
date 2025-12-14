import React from 'react'

import headerImg from '../assets/images/headerImg.png';
import Header from '../Shared/Components/Header/Header';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  let navigate = useNavigate();

  return (
    <>
      <Header title={'Hello Upskilling'}
      description={'This is a welcoming screen for the entry of the application , you can now see the options'}
      imgUrl={headerImg}
      />
      
      <div className='home-details m-3 d-flex justify-content-between align-items-center p-4'>
        <div className="caption">
          <h4>Fill the Recipes !</h4>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <button onClick={()=> navigate('/dashboard/recipes')} className='btn btn-success'>Fill Recipes ! <i className='fa fa-arrow-right'></i> </button>
      </div>
    </>
  )
}
