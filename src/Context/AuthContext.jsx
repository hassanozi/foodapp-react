import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import { set } from 'react-hook-form';

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {

    const [loginData, setLoginData] = useState(null);

    const saveLoginData = () => {
      let encodedToken = localStorage.getItem('token');
      if (encodedToken) {
        const decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken);
        console.log(decodedToken);
      }
    }

    let logOut = () => {
      localStorage.removeItem('token');
      setLoginData(null);
    }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveLoginData();
    }

    }, [])
    return <AuthContext.Provider value={{loginData,saveLoginData,logOut}}>
            {props.children}
        </AuthContext.Provider>
}