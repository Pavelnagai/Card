import React, {useState} from 'react'
import {NavLink,Outlet} from "react-router-dom";
import './Layout.css'


export const Layout = () => {
    const [active, setActive] = useState<boolean>(false)
    return (
        <div className="Layout">
            <span>Cards-Packs</span>
            <div className={active ? "pack active" : 'pack'} onClick={()=>setActive(true)}>Pack List</div>
            <div className={!active? 'layout_profile active' : "layout_profile"} onClick={()=>setActive(false)}>Profile</div>
            {/*<NavLink style={{marginRight:'30px'}} to={'/sing-up'}>Sing Up</NavLink>*/}
            {/*<NavLink style={{marginRight:'30px'}} to={'/login'}>login</NavLink>*/}
            {/*<NavLink style={{marginRight:'30px'}} to={'/profile'}>profile</NavLink>*/}
            <Outlet/>
        </div>
    )
}
