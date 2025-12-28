import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NoData from '../../../Shared/Components/NoData/NoData';
import { toast } from 'react-toastify';

export default function FavList() {

  const IMAGE_BASE_URL = "https://upskilling-egypt.com:3006/";
  const [favList, setFavList] = useState([]);

   const getAllFavs = async () => {
      try {
        let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/userRecipe/',
          { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setFavList(response.data.data);
        console.log(response.data.data);
  
      } catch (error) {
        console.log(error);
      }
  
    }

    let removeFav = async (id)=>{
        try {
            await axios.delete(`https://upskilling-egypt.com:3006/api/v1/userRecipe/${id}`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
            });
    
            getAllFavs();
            toast.success("Deleted Successfully");
           
          } catch (error) {
            console.log('Delete error:', error);
            toast.error("Failed to delete");
          }
    }

    useEffect(()=>{
        getAllFavs();
    },[])

    // const formatDate = (dateString) => {
    //   const date = new Date(dateString);
    //   return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    // };


  return (
    <>
         {/* <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Recipe Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Tag</th>
                    <th>Category</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {favList.length > 0 ? (
                    favList.map((fav) => (
                      <tr key={fav.id}>
                        <td>{fav.recipe.id}</td>
                        <td>{fav.recipe.name}</td>
                        <td>
                          <img
                            src={`${IMAGE_BASE_URL}${fav.recipe.imagePath}`}
                            alt={fav.recipe.name}
                            width={50}
                            height={50}
                            style={{ objectFit: 'cover', borderRadius: '5px' }}
                          />
                        </td>
                        <td>{fav.recipe.description}</td>
                        <td>{fav.recipe.price}</td>
                        <td>{fav.recipe.tag?.name || 'N/A'}</td>
                        <td>{fav.recipe.category?.[0]?.name || 'N/A'}</td>
                        <td>{formatDate(fav.recipe.creationDate)}</td>
                        <td>
                          <div className="dropdown">
                            <i
                              className="fa-solid fa-ellipsis-vertical cursor-pointer"
                              data-bs-toggle="dropdown"
                              style={{ cursor: 'pointer' }}
                            />
                            <ul className="dropdown-menu">
        
                              
                              <li><button
                                 className="dropdown-item"><i className="fa-solid fa-heartbeat"></i> Favorit</button>
                              </li> : 
        
                            
        
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-5">
                        <NoData />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table> */}

              <div className='p-4'>
                  {favList.length > 0 ? (
                    <div className='container'>
                        <div className='row'>
                            {favList.map(fav=>
                                <div className='col-md-4'>
                                <div className='item'>
                                    {fav.recipe.imagePath ? (
                                      <img className='w-75'
                                      src={`${IMAGE_BASE_URL}/${fav.recipe.imagePath}`}/>
                                    ) : (
                                      <img className='w-25'  src={NoData}/>
                                    )}
                                    <h4>{fav.recipe.name}  
                                      <i className='fa fa-heart mx-3 text-danger' onClick={()=> removeFav(fav.id)}>

                                      </i>
                                    </h4>
                                    <h5>{fav.recipe.category[0]?.name}</h5>
                                    <p>{fav.recipe.description}</p>

                                </div>
                            </div>
                            )}
                            
                        </div>
                    </div>
                  ) : (
                    <NoData/>
                  )} 

              </div>
    </>
  )
}
