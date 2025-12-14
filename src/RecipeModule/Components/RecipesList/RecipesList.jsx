import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../assets/images/headerImg2.png';
import NoData from '../../../Shared/Components/NoData/NoData';
import axios from 'axios';

export default function RecipesList() {

  const IMAGE_BASE_URL = "https://upskilling-egypt.com:3006/";
  const [recipesList , setRecipesList] = useState([]);
  
    const getAllRecipes = async () => {
      try {
        let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
          { headers: {Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
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
      <Header title={'Recipes items'}
      description={'You can now add your items that any user can order it from the Application and you can edit'}
      imgUrl={headerImg}
      />  
      
      <div className='d-flex justify-content-between align-items-center'>
          <div className='ms-4 mt-3'>
            <h5>Recipe Table Details</h5>
            <h5>You can check all details</h5>
          </div>
          <button className='btn btn-success'>Add new Item</button>
      </div>
      

      <div className="table-container p-3">
                <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Recipe Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Tag</th>
                        <th scope="col">Category</th>
                        <th scope="col">Creation Date</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipesList.length > 0 ? recipesList.map(recipe => 
                        <tr key={recipe.id}>
                          <th scope="row">{recipe.id}</th>
                          <th scope="row">{recipe.name}</th>
                          <th scope="row"><img src={`${IMAGE_BASE_URL}${recipe.imagePath}`} alt={recipe.name} width={50} height={50} /></th>
                          <th scope="row">{recipe.description}</th>
                          <th scope="row">{recipe.price}</th>
                          <th scope="row">{recipe.tag.name}</th>
                          <th scope="row">{recipe.category?.[0]?.name}</th>
                          <th scope="row">{formatDate(recipe.creationDate)}</th>
                          <th>
                            <div className="dropdown">
                              <i
                                className="fa-solid fa-ellipsis cursor-pointer"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}
                              ></i>

                              <ul className="dropdown-menu">
                                <li>
                                  <button className="dropdown-item"><i class="fa-solid fa-eye"></i>View</button>
                                </li>
                                <li>
                                  <button className="dropdown-item"><i class="fa-solid fa-edit"></i>Edit</button>
                                </li>
                                <li>
                                  <button className="dropdown-item text-danger"><i class="fa-solid fa-trash"></i>Delete</button>
                                </li>
                              </ul>
                            </div>
                          </th>

                        </tr>
                      ) : <NoData />}
                      
                    </tbody>
                </table>
            </div>
    </>
  )
}
