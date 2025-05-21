import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {Button,Input,Logo} from 'index'
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { login as authLogin } from '../store/authSlice';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit}= useForm()
    const [error, setError] = useState(null);
     
    const login = async(data)=>{
        setError("")
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}
        className='mt-8'>
            <div>
                <Input
                    label = "Email : "
                    type = "email"
                    {...register("email",{
                        required : true,
                        validate :{
                            matchPatern : (value) => 
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                || "Email Address is Not Valid"
                        }
                    })}
                />
                <Input
                    type = "Password"
                    label = "Password"
                    placeholder = "Enter Your Password"
                    {...register("password",{
                        required : true
                    })}
                />
                <Button
                    type = "submit"
                    className = "w-full"
                >Sign In</Button>
            </div>
        </form>
    </div>
    
  )
}

export default Login
