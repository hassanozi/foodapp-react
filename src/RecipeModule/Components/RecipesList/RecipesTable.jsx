import React from 'react'
import NoData from '../../../Shared/Components/NoData/NoData'

export default function RecipesTable({recipesList, IMAGE_BASE_URL, formatDate}) {
  return (
    <>
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
    </>
  )
}
