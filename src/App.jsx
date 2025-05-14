/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'; 
import authService from './appwrite/auth';
import {login,logout} from './store/AuthSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  
  // useEffect(()=>{
  //   authService.getCurrentUser()
  //     .then((userData)=>{
  //       if(userData){
  //         dispatch(login({userData}));
  //       }
  //       else{
  //         dispatch(logout())
  //       }
  //     })
  //     .finally(()=>{setLoading(false);})
  // },[])
  return !loading ? (
    <div className='min-h-screen'>
        <div className='w-full block'>
          <Header/>
          <main>
          
          </main>
          <Footer/>
        </div>
    </div>
  ) : null
}

export default App;
