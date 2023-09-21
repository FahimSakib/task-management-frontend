import Bars3CenterLeft from "./icons/Bars3CenterLeft"

const Header = ({ sideNavShow, setSideNavShow }) => {
    return (
        <div className="w-full h-[50px] fixed top-0 left-0 flex px-5 justify-between items-center z-10 bg-white">
            <button onClick={() => setSideNavShow(!sideNavShow)} className="hidden md:block">
                <Bars3CenterLeft />
            </button>
        </div>
    )
}

export default Header