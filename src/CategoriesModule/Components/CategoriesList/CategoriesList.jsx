import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerImg from '../../../assets/images/headerImg2.png';
import axios from 'axios';
import NoData from '../../../Shared/Components/NoData/NoData';

export default function CategoriesList() {

  const [categoriesList , setCategoriesList] = useState([]);

  const getAllCategories = async () => {
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
        { headers: {Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
      );
      setCategoriesList(response.data.data);
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
    getAllCategories();
  }, []);

  return (
    <>
      <Header title={'Categories items'}
            description={'You can now add your items that any user can order it from the Application and you can edit'}
            imgUrl={headerImg}
            />  
      
      <div className="table-container p-3">
          <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Category Creation Date</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.length > 0 ? categoriesList.map(category => 
                  <tr key={category.id}>
                    <th scope="row">{category.id}</th>
                    <th scope="row">{category.name}</th>
                    <th scope="row">{formatDate(category.creationDate)}</th>
                  </tr>
                ) : <NoData />}
                
              </tbody>
          </table>
      </div>
    </>
  )
}
