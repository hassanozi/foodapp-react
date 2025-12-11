import React from 'react'
import { useForm } from 'react-hook-form';

export default function VerifyAccount() {

  let {register,handleSubmit,formState:{errors}} = useForm();
  
  const onFormSubmit = (data) => {
      console.log(data);
  }


  return (
    <div>VerifyAccount</div>
  )
}
