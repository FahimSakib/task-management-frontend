import { Link, useLocation } from "react-router-dom"

const SideNav = () => {
    const { pathname } = useLocation();

    return (
        <div className="w-56 p-3 fixed left-0 top-[50px] hidden md:block">
            <ul className="space-y-6">
                <Link to="/">
                    <li className={`w-full text-center py-4 rounded-[12px] hover:shadow-lg ${pathname === '/' ? 'bg-[#D8D1E1]' : 'hover:bg-indigo-50'}`}>
                        Home | Task List
                    </li>
                </Link>
                <Link to="/create-task">
                    <li className={`w-full text-center py-4 mt-2 rounded-[12px] hover:shadow-lg ${pathname === '/create-task' ? 'bg-[#D8D1E1]' : 'hover:bg-indigo-50'}`}>
                        Create Task
                    </li>
                </Link>
            </ul>
        </div >
    )
}

export default SideNav