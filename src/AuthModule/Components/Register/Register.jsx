import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {

    let {register,handleSubmit,formState:{errors}, watch} = useForm();
    let navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const onFormSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Register',data);
            console.log(response);
            toast.success('Login Successful',{theme:'colored'});

            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message,{theme:'colored'});
        }
    }

  return (
    <>
        <div>Register</div>
        <p>Welcome Back! Please enter your details</p>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className='fa fa-user'></i>
            </span>
            <input 
              type="text" 
              {...register('userName', {required:'User Name is required'})} 
              className="form-control" 
              placeholder="User Name" 
              aria-label="userName " 
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.userName  && <p className='alert alert-danger p-2'>{errors.userName.message}</p>}
        </div>

        <div className="col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">
              <i className='fa fa-envelope'></i>
            </span>
            <input 
              type="text" 
              {...register('email ', {required:'Email  is required'})} 
              className="form-control" 
              placeholder="Enter your Email" 
              aria-label="email " 
              aria-describedby="basic-addon2"
            />
          </div>
          {errors.email  && <p className='alert alert-danger p-2'>{errors.email.message}</p>}
        </div>
          </div>

          <div className="row">
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-envelope'></i>
                  </span>
                  <input 
                    type="text" 
                    {...register('country', {required:'Country is required'})} 
                    className="form-control" 
                    placeholder="Country" 
                    aria-label="country" 
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.country && <p className='alert alert-danger p-2'>{errors.country.message}</p>}
              </div>

              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">
                    <i className='fa fa-mobile'></i>
                  </span>
                  <input 
                    type="text" 
                    {...register('phoneNumber ', {required:'Phone Number  is required'})} 
                    className="form-control" 
                    placeholder="Phone Number " 
                    aria-label="phoneNumber " 
                    aria-describedby="basic-addon2"
                  />
                </div>
                {errors.phoneNumber  && <p className='alert alert-danger p-2'>{errors.phoneNumber.message}</p>}
              </div>
          </div>

          <div className="row">
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-key'></i>
                  </span>
                  <input 
              type={showPass ? "text" : "password"}
              placeholder="New Password"
              className="form-control"
              {...register('password', {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />

          
            <span className="input-group-text" style={{ cursor: "pointer" }}
              onClick={() => setShowPass(!showPass)}>
              <i className={showPass ? "fa fa-eye-slash" : "fa fa-eye"}></i>
            </span>
          </div>
          {errors.password && <p className='alert alert-danger p-2'>{errors.password.message}</p>}
                </div>
                

              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">
                    <i className='fa fa-key'></i>
                  </span>
                  <input 
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm new password"
              className="form-control"
              {...register('confirmPassword', {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match"
              })}
            />
            
            <span className="input-group-text" style={{ cursor: "pointer" }}
              onClick={() => setShowConfirmPass(!showConfirmPass)}>
              <i className={showConfirmPass ? "fa fa-eye-slash" : "fa fa-eye"}></i>
            </span>
          </div>
          {errors.confirmPassword && (
            <p className='alert alert-danger p-2'>{errors.confirmPassword.message}</p>
          )}
                </div>
                
          </div>

          <div className='links d-flex justify-content-end my-3'>
              <Link to='/login' className="text-success text-decoration-none">Login now</Link>
          </div>

          <button className='btn btn-success w-100'>Register</button>
        </form>
    
    </>
  )
}
