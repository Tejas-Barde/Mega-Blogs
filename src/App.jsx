/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'; 
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          console.log(`App me hu userdata ke ander`);
          dispatch(login({userData}));
        }
        else{
          console.log(`App me hu userdata ke bahar`);
          dispatch(logout())
        }
      })
      .finally(()=>{setLoading(false)
        console.log(`finally me hu`)
      })
  },[])
  return !loading ? (
    <div className='h-screen w-screen flex-grow'>
        <div className='flex-grow '>
          <Header/>
          <main>
          <Outlet/>
          </main>
          <Footer/>
        </div>
    </div>
  ) : null
}

export default App;
