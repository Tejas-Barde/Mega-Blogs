/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import { login, logout } from './AuthSlice';
import authService from '../appwrite/auth';
import authSlice from './AuthSlice.js'

const store = configureStore({
    reducer :{
        auth : authSlice,
    }
})

export default store;