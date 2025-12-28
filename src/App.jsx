import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Shared/Components/AuthLayout/AuthLayout'
import NotFound from './Shared/Components/NotFound/NotFound'
import Login from './AuthModule/Components/Login/Login'
import Register from './AuthModule/Components/Register/Register'
import ForgetPass from './AuthModule/Components/ForgetPass/ForgetPass'
import ResetPass from './AuthModule/Components/ResetPass/ResetPass'
import VerifyAccount from './AuthModule/Components/VerifyAccount/VerifyAccount'
import MasterLayout from './Shared/Components/MasterLayout/MasterLayout'
import Dashboard from './DashboardModule/Dashboard'
import RecipesList from './RecipeModule/Components/RecipesList/RecipesList'
import RecipeData from './RecipeModule/Components/RecipeData/RecipeData'
import CategoriesList from './CategoriesModule/Components/CategoriesList/CategoriesList'
import CategoryData from './CategoriesModule/Components/CategoryData/CategoryData'
import UsersList from './UsersModule/Components/UsersList/UsersList'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './Shared/Components/ProtectedRoute/ProtectedRoute'
import FavList from './Favorites/Components/FavList/FavList'

function App() {
  
  const routes = createBrowserRouter([
    { path: '', element: <AuthLayout /> ,errorElement:<NotFound/>,
      children:[
        {index:true, element:<Login/>},
        {path:'login', element:<Login/>},
        {path:'register', element:<Register/>},
        {path:'forget-pass', element: <ForgetPass/>},
        {path:'reset-pass', element: <ResetPass/>},
        {path:'verify-account', element:<VerifyAccount/>},
      ]
    },
    {
        path:'dashboard',
        element: <ProtectedRoute><MasterLayout/></ProtectedRoute> , errorElement:<NotFound/>,
        children:[
          {index:true, element: <Dashboard/>},
          {path:'recipes', element: <RecipesList/>},
          {path:'recipe-data', element: <RecipeData/>},
          {path:'recipe-data/edit/:id', element: <RecipeData/>},
          {path:'categories', element: <CategoriesList/>},
          {path:'category-data', element: <CategoryData/>},
          {path:'users', element: <UsersList/>},
          {path:'favs', element: <FavList/>},
        ]
    }
  ])

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
