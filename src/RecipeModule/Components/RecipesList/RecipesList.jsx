import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../assets/images/headerImg2.png';
import NoData from '../../../Shared/Components/NoData/NoData';
import axios from 'axios';
import RecipesTable from './RecipesTable';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';
import { AuthContext } from '../../../Context/AuthContext';

export default function RecipesList() {

  let { loginData } = useContext(AuthContext);
  const IMAGE_BASE_URL = "https://upskilling-egypt.com:3006/";
  const [recipesList , setRecipesList] = useState([]);
  const navigate = useNavigate();
  
    const getAllRecipes = async () => {
      try {
        let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
          { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setRecipesList(response.data.data);
        console.log(response.data.data);
  
      } catch (error) {
        console.log(error);
      }
  
    }
  
    useEffect(() => {
      getAllRecipes();
    }, []);


    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    };


  return (
    <>
    <div className="dashboardHero">
        <Header
          title="Recipes items"
          description="You can now add your items that any user can order it from the Application and you can edit"
          imgUrl={headerImg}
        />
      </div>
      
      
      <div className='d-flex justify-content-between align-items-center'>
          <div className='ms-4 mt-3'>
            <h5>Recipe Table Details</h5>
            <h6 className='text-muted'>You can check all details</h6>
          </div>

          {loginData?.userGroup != 'SystemUser' ? 
          <button className='btn btn-success' onClick={()=>navigate('/dashboard/recipe-data')}>Add new Item
          </button> : ''}
      </div>
      

      <div className="table-container p-3">
              <RecipesTable recipesList={recipesList} IMAGE_BASE_URL={IMAGE_BASE_URL} formatDate={formatDate} onDeleteSuccess={getAllRecipes} />
      </div>
    </>
  )
}
