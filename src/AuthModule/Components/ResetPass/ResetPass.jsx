import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPass() {

  let {register,handleSubmit,formState:{errors}, watch} = useForm();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  let navigate = useNavigate();

  const onFormSubmit = async (data) => {
      try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data);
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
        <h4 className='title'>Reset Password</h4>
        <p>Please Enter Your Otp  or Check Your Inbox</p>

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
                  <input type="text" {...register('seed', {required:'OTP is required'})} 
                  className="form-control" placeholder="OTP" aria-label="paswword" aria-describedby="basic-addon1"/>
              </div>
              {errors.seed && <p className='alert alert-danger p-2'>{errors.password.message}</p>}

        
          <div className="input-group mb-3">
            <span className="input-group-text"><i className='fa fa-key'></i></span>

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
          
          <div className="input-group mb-3">
            <span className="input-group-text"><i className='fa fa-key'></i></span>

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

          <button className="btn btn-primary w-100 mt-3" type="submit">
            Reset Password
          </button>
        </form>
    </>
  )
}
