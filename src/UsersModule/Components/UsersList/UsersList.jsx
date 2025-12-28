import React, { useEffect, useState } from 'react'
import headerImg from '../../../assets/images/headerImg2.png';
import Header from '../../../Shared/Components/Header/Header';
import '../../../App.css';
import { useNavigate } from 'react-router-dom';
import UsersTable from './UsersTable';
import axios from 'axios';


export default function UsersList() {

  const IMAGE_BASE_URL = "https://upskilling-egypt.com:3006/";
  const [usersList , setUsersList] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
      try {
        let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=50&pageNumber=1',
          { headers: {Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setUsersList(response.data.data);
        console.log(response.data.data);
  
      } catch (error) {
        console.log(error);
      }
  
    }

    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    };

     useEffect(() => {
          getAllUsers();
        }, []);

  return (
    <>
    <div className="dashboardHero">
      <Header title={'Hello Upskilling'}
            description={'This is a welcoming screen for the entry of the application , you can now see the options'}
            imgUrl={headerImg}
      />
      </div>
      <h3 className='mt-4'>Users Tables Details</h3>

      <div className="table-container p-3">
          <UsersTable usersList={usersList} IMAGE_BASE_URL={IMAGE_BASE_URL} formatDate={formatDate} onDeleteSuccess={getAllUsers} />
      </div>
    </>
  )
}
