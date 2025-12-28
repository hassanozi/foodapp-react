import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecipeData() {

  let {register,handleSubmit,formState:{errors},setValue} = useForm();
  let navigate = useNavigate();
  
  const [categoriesList , setCategoriesList] = useState([]);
  const [tagsList , setTagsList] = useState([]);
  const { id } = useParams(); // <-- GET URL PARAM (e.g., /home/user-data/5)
  const isEdit = Boolean(id); // edit mode if param exists
  const recipeId = id; // Use the id from URL parameters

  const getAllCategories = async () => {
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
        { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setCategoriesList(response.data.data);
      console.log(response.data.data);

        } catch (error) {
          console.log(error);
        }

      }

      const getAllTages = async () => {
          try {
            let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/tag/?pageSize=10&pageNumber=1',
              { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setTagsList(response.data);
            console.log(response.data);

              } catch (error) {
                console.log(error);
              }

      }

      const appendToFormData = (data) => {
        const formData = new FormData();
        for (const key in data) {
          if (key === 'recipeImage') {
            formData.append(key, data[key][0]);
          } else {
            formData.append(key, data[key]);
          }
        }
        return formData;
      };

      let onSubmit = async (data) => {
            const formData = appendToFormData(data);

            try {
              if (isEdit) {
                await axios.put(
                  `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
                  formData,
                  { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
              } else {
                await axios.post(
                  'https://upskilling-egypt.com:3006/api/v1/Recipe',
                  formData,
                  { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
              }

              navigate('/dashboard/recipes');
            } catch (error) {
              console.log(error);
            }
          };



     const loadRecipe = async () => {
        try {
          const response = await axios.get(
            `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );

          setValue("name", response.data.name);
          setValue("tagId", response.data.tag.id);
          setValue("price", response.data.price);
          setValue("categoriesIds", response.data.category[0].id);
          setValue("description", response.data.description);

          
        } catch (error) {
          console.log(error);
        }
      };


      useEffect(() => {
        getAllCategories();
        getAllTages();
        if (isEdit) {
          loadRecipe();
        }
      }, [id]);
      


  return (
    <>
      <div className='home-details mx-3 d-flex justify-content-between align-items-center p-4'>
        <div className="caption">
          <h4>Fill the Recipes !</h4>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <button onClick={() => navigate('/dashboard/recipes')} className='btn btn-success'>Fill Recipes ! <i className='fa fa-arrow-right'></i> </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='w-75 p-5 m-auto'>
                    
                    <input
                        type="text"
                        {...register('name', {
                        required: 'Name is required',
                        
                        })}
                        className="form-control my-3"
                        placeholder="Recipe Name"
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}

                    <select {...register('tagId')} className="form-control my-3">
                      <option value="">Select Tag</option>
                      {tagsList?.map(tag => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                      {errors.tagId && <p className="text-danger">{errors.tagId.message}</p>}

                    <input 
                        type="number"
                        {...register('price', {
                        required: 'Price is required',
                        
                        })}
                        className="form-control my-3"
                        placeholder="Recipe Price"
                    />
                    {errors.price && <p className="text-danger">{errors.price.message}</p>}

                    <select
                        {...register('categoriesIds', { required: 'Please select a category' })}
                        className="form-control"
                      >
                        <option value="">Select Category</option>
                        {categoriesList.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.categoriesIds && <p className="text-danger mt-1">{errors.categoriesIds.message}</p>}

                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      className="form-control"
                      rows="4"
                      placeholder="Recipe Description"
                    />
                    {errors.description && <p className="text-danger mt-1">{errors.description.message}</p>}

                    <input 
                        type="file"
                        {...register('recipeImage', {
                        required: 'Image   is required',
                        
                        })}
                        className="form-control my-3"
                        placeholder="Recipe file"
                    />

                <div className='d-flex justify-content-end my-3'>
                  <button type='submit' className='btn btn-outline-success mt-3'>Save</button>
                  <button className='btn btn-success mx-2 mt-3' onClick={() => navigate('/dashboard/recipes')}>Cancel</button>


                </div>
      </form>


    </>
  )
}
