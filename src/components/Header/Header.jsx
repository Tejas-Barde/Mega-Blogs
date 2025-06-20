/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOutBtn, Container, Logo } from '../index.js'

function header() {
	const authStatus = useSelector((state) => state.auth.status);

	const navigate = useNavigate();
	const navItems = [
		{
			name: 'Home',
			slug: "/",
			active: true
		},
		{
			name: "Login",
			slug: "/login",
			active: authStatus,
		},
		{
			name: "SignUp",
			slug: "/signup",
			active: authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: !authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: !authStatus,
		},
	]

	return (
		<header >
			<Container>
				<nav className="flex w-full p-4 pl-8 ">
					<div className="mr-4 flex">
						<Link to = '/'>
							<Logo width="40px">
							</Logo>
						</Link>
						<span class="pl-4 self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Blogger</span>
					</div>
					<ul className="flex ml-auto">
						{navItems.map((item)=>(
							!item.active && (
								<li key={item.name}>
									<button onClick={()=>navigate(item.slug)}
										className="inline-block px-6 py-2 duration-200 hover:bg-blue-200 roundded-full">
										{item.name}
									</button>
								</li>
							)
						))}
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

export default header
