import React, {useState} from 'react'
import {Outlet} from "react-router-dom";
import './Layout.scss'
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const Layout = () => {
    const [active, setActive] = useState<boolean>(false)
    return (
        <div className="layout">
            <span>Cards-Packs</span>
            <div className={active ? "pack active" : 'pack'} onClick={() => setActive(true)}>
                <ListAltIcon/>Pack List
            </div>
            <div className={!active ? 'pack active' : "pack"} onClick={() => setActive(false)}>
                <PersonIcon/>Profile
            </div>
            <Outlet/>
        </div>
    )
}
