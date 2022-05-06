import React, {useEffect, useState} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import './Layout.scss'
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const Layout = () => {
    const [active, setActive] = useState<boolean>(false)
    const navigate = useNavigate()
    const onClickPackList = () => {
        setActive(true)
    }
    const onClickProfile = () => {
        setActive(false)
    }
    useEffect(() => {
            navigate(`/main/${active}`)
        },
        [active])
    return (
        <div className="layout">
            <span>Cards-Packs</span>
            <div className={active ? "pack active" : 'pack'} onClick={onClickPackList}>
                <ListAltIcon/>Pack List
            </div>
            <div className={active ? "pack" : 'pack active'} onClick={onClickProfile}>
                <PersonIcon/>Profile
            </div>
            <Outlet/>
        </div>
    )
}
