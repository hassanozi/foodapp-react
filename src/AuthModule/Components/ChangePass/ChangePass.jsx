import React from 'react'
import { useForm } from 'react-hook-form';

export default function ChangePass() {

  let {register,handleSubmit,formState:{errors}} = useForm();
  
  const onFormSubmit = (data) => {
      console.log(data);
  }

  return (
    <div>ChangePass</div>
  )
}
