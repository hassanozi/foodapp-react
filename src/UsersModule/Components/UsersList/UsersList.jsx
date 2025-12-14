import React from 'react'
import headerImg from '../../../assets/images/headerImg.png';
import Header from '../../../Shared/Components/Header/Header';

export default function UsersList() {
  return (
    <>
      <Header title={'Hello Upskilling'}
            description={'This is a welcoming screen for the entry of the application , you can now see the options'}
            imgUrl={headerImg}
      />
      <h1>Users List</h1>
    </>
  )
}
