import React, { useContext } from 'react'

import headerImg from '../assets/images/headerImg.png';
import Header from '../Shared/Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import backgroundImg from '../assets/images/background.png';
import '../App.css';

export default function Dashboard() {

  let navigate = useNavigate();
  let { loginData } = useContext(AuthContext);

  return (
    <>
      <div className="dashboardHero">
      <Header
        title={`Hello ${loginData ? loginData.userName : 'User'} ! Welcome to FoodApp Dashboard`}
        description="This is a welcoming screen for the entry of the application"
        imgUrl={headerImg}
      />
    </div>

      

      <div className='home-details  d-flex justify-content-between align-items-center p-4'>
        <div className="caption">
          <h4>Fill the Recipes !</h4>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <button onClick={() => navigate('/dashboard/recipes')} className='btn btn-success'>Fill Recipes ! <i className='fa fa-arrow-right'></i> </button>
      </div>
    </>
  )
}
