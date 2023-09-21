import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import Header from "../components/Header";

const Layout = () => {
    const [sideNavShow, setSideNavShow] = useState(true)
    return (
        <>
            <Header sideNavShow={sideNavShow} setSideNavShow={setSideNavShow} />
            {/* {sideNavShow ? 'true' : 'false'} */}
            {sideNavShow && <SideNav />}
            <div className={`bg-[#fafbfc] p-5 mt-[50px] ${sideNavShow ? 'md:ml-[224px] md:rounded-tl-[25px]' : ''}`}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout