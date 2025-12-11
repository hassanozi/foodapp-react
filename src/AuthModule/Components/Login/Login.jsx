import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Login() {

    let {register,handleSubmit,formState:{errors}} = useForm();
    let navigate = useNavigate();


    const onFormSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data);
            console.log(response);
            toast.success('Login Successful',{theme:'colored'});
            localStorage.setItem('userToken',response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message,{theme:'colored'});
        }
    }

  return (
    <>
        <h4 className='title'>Log In</h4>
        <p>Welcome Back! Please enter your details</p>

        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className='fa fa-envelope'></i></span>
                <input type="text" {...register('email',
                {required:'Email is required', pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message:'Invalid email address'}})} 
                className="form-control" placeholder="Email" aria-label="email" aria-describedby="basic-addon1"/>
            </div>
            {errors.email && <p className='alert alert-danger p-2'>{errors.email.message}</p>}

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className='fa fa-key'></i></span>
                <input type="password" {...register('password', {required:'Password is required'})} 
                className="form-control" placeholder="Password" aria-label="paswword" aria-describedby="basic-addon1"/>
            </div>
            {errors.password && <p className='alert alert-danger p-2'>{errors.password.message}</p>}

            <div className='links d-flex justify-content-between my-3'>
                <Link to='/register' className="text-black text-decoration-none">Register Now ?</Link>
                <Link to='/forget-pass' className="text-success text-decoration-none">Forget Password ?</Link>
            </div>
            <button className='btn btn-success w-100'>Login</button>
        </form>
    </>
  )
}
