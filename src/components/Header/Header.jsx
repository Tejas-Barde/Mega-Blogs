/* eslint-disable no-unused-vars */
import React from "react";
import {Container,Logo,LogOutBtn} from '../index.js';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { list } from "postcss";

function Header(){
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate();
    const navItems = [
        {
            name : 'Home',
            slug : "/",
            active : true
        },
        {
            name : "Login",
            slug : "/login",
            active : !authStatus
        },
        {
            name : "Signup"
            ,slug : "/signup"
            ,active : !authStatus
        },
        {
            name : "All Posts",
            slug : "/all-posts",
            active : authStatus
        },
        {
            name : "Add Posts",
            slug : "/add-posts",
            active : authStatus
        }
    ]
    return (
        <header className='py-3 shadow bg-grey-500'>
            <Container>
                <nav className="flex">
                    <div className = 'mr-4'>
                        <Link>
                            <Logo width="70px"></Logo>
                        </Link>
                    </div>
                    <ul className = 'flex ml-auto'>
                        {navItems.map((item)=>{
                            item.active ? (
                                <li key ={item.name}>
                                    <button onClick={()=> navigate(item.slug)}>{item.name}
                                    </button>
                                </li>
                            ) : (null);
                        })}
                        {authStatus && (
                           <li>
                            <LogOutBtn></LogOutBtn>
                           </li> 
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
export default Header;