/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import { login, logout } from './authSlice';
import authService from '../appwrite/auth';
import authSlice from './authSlice.js'

const store = configureStore({
    reducer :{
        auth : authSlice,
    }
})

export default store;