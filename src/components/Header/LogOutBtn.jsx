/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import {logout} from '../../store/AuthSlice'

function LogOutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        authService.logout().then(()=>{
            dispatch(logout());
        }).catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div>
      <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'>
        Log Out
      </button>
    </div>
  )
}

export default LogOutBtn;
