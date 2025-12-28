// RecipesTable.js
import React, { useContext, useState } from 'react';
import NoData from '../../../Shared/Components/NoData/NoData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { toast } from 'react-toastify';

export default function RecipesTable({ 
  recipesList, 
  IMAGE_BASE_URL, 
  formatDate,
  onDeleteSuccess  // ← New prop: callback to refresh list
}) {

  let { loginData } = useContext(AuthContext);
  
  const [recipeId, setRecipeId] = useState(0);
  const [recipeName, setRecipeName] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  const handleShow = (rec) => {
    setRecipeId(rec.id);
    setRecipeName(rec.name);
    setShow(true);
  };

  const deleteRecipe = async () => {
    try {
      await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
      });

      // Call the parent's refresh function
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }

      handleClose();
    } catch (error) {
      console.log('Delete error:', error);
      alert('Failed to delete. Make sure you are logged in as Admin.');
    }
  };

  let addToFav = async (id) => {
      try {
        await axios.post(
          "https://upskilling-egypt.com:3006/api/v1/userRecipe",
          {
            recipeId: id    
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          },
          toast.success('Saved successfully',{theme:'colored'}),
        );        

      } catch (error) {
       toast.error('Saved successfully',{theme:'colored'})
      }
    };


  return (
    <>
      <table className="table table-hover">
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
          {recipesList.length > 0 ? (
            recipesList.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>{recipe.name}</td>
                <td>
                  <img
                    src={`${IMAGE_BASE_URL}${recipe.imagePath}`}
                    alt={recipe.name}
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover', borderRadius: '5px' }}
                  />
                </td>
                <td>{recipe.description}</td>
                <td>{recipe.price}</td>
                <td>{recipe.tag?.name || 'N/A'}</td>
                <td>{recipe.category?.[0]?.name || 'N/A'}</td>
                <td>{formatDate(recipe.creationDate)}</td>
                <td>
                  <div className="dropdown">
                    <i
                      className="fa-solid fa-ellipsis-vertical cursor-pointer"
                      data-bs-toggle="dropdown"
                      style={{ cursor: 'pointer' }}
                    />
                    <ul className="dropdown-menu">

                      {loginData?.userGroup == 'SystemUser' ?
                      <li><button onClick={()=>addToFav(recipe.id)}
                         className="dropdown-item"><i className="fa-solid fa-heartbeat"></i> Favorit</button>
                      </li> : 

                      <div>
                          <li><button onClick={() => navigate(`/dashboard/recipe-data/edit/${recipe.id}`)} className="dropdown-item"><i className="fa-solid fa-edit"></i> Edit</button></li>
                          <li>
                            <button onClick={() => handleShow(recipe)} className="dropdown-item text-danger">
                              <i className="fa-solid fa-trash"></i> Delete
                            </button>
                          </li>
                      </div>}

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
      </table>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation name={recipeName} deleteItem="Recipe" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}