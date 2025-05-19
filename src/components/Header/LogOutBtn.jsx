import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogOutBtn() {
	const dispatch = useDispatch()
	const logoutHandler = () => {
		authService.logout().then((response)=>{
			dispatch(logout);
		})
	}
	return (
		<button className="inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-b-full">
			Log Out
		</button>
	)
}

export default LogOutBtn;
