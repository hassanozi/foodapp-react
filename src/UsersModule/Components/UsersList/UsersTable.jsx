import React, { useState } from 'react'
import NoData from '../../../Shared/Components/NoData/NoData'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

export default function UsersTable({usersList, 
  IMAGE_BASE_URL, 
  formatDate,onDeleteSuccess}
  ) {

    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);

  const handleShow = (us) => {
    setUserId(us.id);
    setUserName(us.userName);
    setShow(true);
  };

    const deleteUser = async () => {
    try {
      await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Users/${userId}`, {
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


  return (
    <>
        <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Phone Number</th>
                    <th>Image</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.length > 0 ? (
                    usersList.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.country}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          <img
                            src={`${IMAGE_BASE_URL}${user.imagePath}`}
                            alt={user.name}
                            width={50}
                            height={50}
                            style={{ objectFit: 'cover', borderRadius: '5px' }}
                          />
                        </td>
                        <td>{formatDate(user.creationDate)}</td>
                        <td>
                          <div className="dropdown">
                            <i
                              className="fa-solid fa-ellipsis-vertical cursor-pointer"
                              data-bs-toggle="dropdown"
                              style={{ cursor: 'pointer' }}
                            />
                            <ul className="dropdown-menu">
                              <li><button className="dropdown-item"><i className="fa-solid fa-eye"></i> View</button></li>
                              {/* <li><button onClick={() => navigate(`/dashboard/recipe-data/edit/${recipe.id}`)} className="dropdown-item"><i className="fa-solid fa-edit"></i> Edit</button></li> */}
                              <li>
                                <button onClick={() => handleShow(user)} className="dropdown-item text-danger">
                                  <i className="fa-solid fa-trash"></i> Delete
                                </button>
                              </li>
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
                <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <DeleteConfirmation name={userName} deleteItem="User" />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteUser}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
    </>
  )
}
