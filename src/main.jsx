/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayOut, Login} from './components/index.js'

import AddPost from "./pages/AddPosts.jsx";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPosts";

import Post from "./pages/Posts";

import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayOut authentication={false}>
                    <Login />
                </AuthLayOut>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayOut authentication={false}>
                    <Signup />
                </AuthLayOut>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayOut authentication>
                    {" "}
                    <AllPosts />
                </AuthLayOut>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayOut authentication>
                    {" "}
                    <AddPost />
                </AuthLayOut>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayOut authentication = {true}>
                    <EditPost />
                </AuthLayOut>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
