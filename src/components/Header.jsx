import axios from "axios"
import Bars3CenterLeft from "./icons/Bars3CenterLeft"
import { useNavigate } from "react-router-dom"

const Header = ({ sideNavShow, setSideNavShow, setLoggedIn }) => {
    const navigate = useNavigate();

    const logout = () => {
        axios.post('/logout').then(response => {
            if (response.status === 204) {
                setLoggedIn(false);
                sessionStorage.setItem('loggedIn', false);
                navigate('/login')
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <div className="w-full h-[50px] fixed top-0 left-0 flex px-5 justify-between items-center z-10 bg-white">
            <button onClick={() => setSideNavShow(!sideNavShow)} className="hidden md:block">
                <Bars3CenterLeft />
            </button>
            <button className="px-2 py-1 rounded bg-red-400" onClick={logout}>Logout</button>
        </div>
    )
}

export default Header