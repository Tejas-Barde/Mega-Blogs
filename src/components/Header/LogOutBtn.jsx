import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogOutBtn() {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const logoutHandler = () => {
		authService.logout().then((response)=>{
			dispatch(logout());
			// navigate('/');
		})
	}
	return (
		<button className="inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-b-full text-black"
			onClick={logoutHandler}
		>
			Log Out
		</button>
	)
}

export default LogOutBtn;
