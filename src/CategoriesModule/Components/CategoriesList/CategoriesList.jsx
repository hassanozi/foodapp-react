import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../assets/images/headerImg2.png';
import axios from 'axios';
import NoData from '../../../Shared/Components/NoData/NoData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import '../../../App.css';

export default function CategoriesList() {

  const [categoriesList , setCategoriesList] = useState([]);
  const [catId , setCatId] = useState(0);
  const [catName , setCatName] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  // const handleAddClose = () => {
  //   setShowAdd(false);
  //   setNewCategoryName('');
  // };
  const handleAddShow = () => setShowAdd(true);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (cat) => {
    setCatId(cat.id);
    setCatName(cat.name);
    setShow(true);
  } 

  const handleEditShow = (category) => {
    setIsEdit(true);
    setEditCategoryId(category.id);
    setNewCategoryName(category.name);
    setShowAdd(true); 
  };
  const handleAddClose = () => {
  setShowAdd(false);
  setNewCategoryName('');
  setIsEdit(false);
  setEditCategoryId(null);
};


  const addCategory = async () => {
      try {
        await axios.post(
          'https://upskilling-egypt.com:3006/api/v1/Category',
          { name: newCategoryName },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        getAllCategories(); // refresh table
        handleAddClose();
      } catch (error) {
        console.log(error);
      }
    };

    const updateCategory = async () => {
      try {
        await axios.put(
          `https://upskilling-egypt.com:3006/api/v1/Category/${editCategoryId}`,
          { name: newCategoryName },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        getAllCategories();
        handleAddClose();
      } catch (error) {
        console.log(error);
      }
    };


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

      const deleteCategory = async (id) => {
        try {
            let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,
              { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            getAllCategories();
            handleClose();

        } catch (error) {
          console.log(error);
        }
      }

      const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
      };

      useEffect(() => {
        getAllCategories();
      }, []);

  return (
    <>
    <div className="dashboardHero">
      <Header title={'Categories items'}
            description={'You can now add your items that any user can order it from the Application and you can edit'}
            imgUrl={headerImg}
            />  
    </div>
      
      <div className='title d-flex p-3 justify-content-between align-items-center'>
         <h5>Categories Table Details</h5>
         <button className='btn btn-success' onClick={handleAddShow}>
           Add New Category
        </button>
      </div>
      <div className="table-container p-3">
          <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Category Creation Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.length > 0 ? categoriesList.map(category => 
                  <tr key={category.id}>
                    <td scope="row">{category.id}</td>
                    <td scope="row">{category.name}</td>
                    <td scope="row">{formatDate(category.creationDate)}</td>
                    {/* <td>
                      <i className='fa fa-edit text-warning mx-2'></i>
                      <i onClick={()=> handleShow(category)} className='fa fa-trash text-danger'></i>
                    </td> */}
                    <td>
                  <div className="dropdown">
                    <i
                      className="fa-solid fa-ellipsis-vertical cursor-pointer"
                      data-bs-toggle="dropdown"
                      style={{ cursor: 'pointer' }}
                    />
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item"><i className="fa-solid fa-eye"></i> View</button></li>
                                        <button
                      className="dropdown-item"
                      onClick={() => handleEditShow(category)}
                    >
                      <i className="fa-solid fa-edit"></i> Edit
                    </button>
                      <li>
                        <button onClick={() => handleShow(category)} className="dropdown-item text-danger">
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
                  </tr>
                ) : <NoData />}
                
              </tbody>
          </table>
      </div>

      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation name={catName} deleteItem={'Category'} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={deleteCategory}>
            Delete 
          </Button>
          
        </Modal.Footer>
      </Modal>

      <Modal show={showAdd} onHide={handleAddClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEdit ? 'Edit Category' : 'Add New Category'}
            </Modal.Title>

          </Modal.Header>

          <Modal.Body>
            <div className="form-group">
              <label>Category Name</label>
              <input
                type="text"
                className="form-control mt-2"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddClose}>
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={isEdit ? updateCategory : addCategory}
              disabled={!newCategoryName.trim()}
            >
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Modal>

    </>
  )
}
