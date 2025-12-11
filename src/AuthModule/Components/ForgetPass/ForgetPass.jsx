import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPass() {

  let {register,handleSubmit,formState:{errors}} = useForm();
  let navigate = useNavigate();

  const onFormSubmit = async (data) => {
      try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data);
            console.log(response);
            toast.success('Email sent successfully. Please check your inbox.',{theme:'colored'});
            navigate('/reset-pass');
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message,{theme:'colored'});
        }
  }


  return (
    <>
        <h4 className='title'>Forget Your Password</h4>
        <p>No worries! Please enter your email and we will send a password reset link </p>

        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className='fa fa-envelope'></i></span>
                <input type="text" {...register('email',
                {required:'Email is required', pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message:'Invalid email address'}})} 
                className="form-control" placeholder="Enter your email" aria-label="email" aria-describedby="basic-addon1"/>
            </div>
            {errors.email && <p className='alert alert-danger p-2'>{errors.email.message}</p>}


            <div className='links d-flex justify-content-start my-3'>
                <Link to='/login' className="text-black text-decoration-none">Login</Link>
            </div>
            
            <button className='btn btn-success w-100'>Submit</button>
            
        </form>
    </>
  )
}
