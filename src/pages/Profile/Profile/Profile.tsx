import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../../redux/reducers/profileReducer";
import {NavLink, useNavigate} from "react-router-dom";
import {authLogOut} from "../../../redux/reducers/authReducer";
import {getCards} from "../../../redux/reducers/cardReducer";
import TablePacksList from "../Tables/TablePacksList";
import "./Profile.css"
import Search from "../../../components/Search/Search";
import {rootReducerType} from "../../../redux/store/store";
import Paginat from "../../../components/Pagination/Pagination";

type propsProfileType = {}
const Profile = (props: propsProfileType) => {
    const profile = useSelector<any, any>(state => state.profile)
    const auth = useSelector<any, rootReducerType>(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (auth) {
            dispatch(fetchUser())
        } else {
            navigate('/login')
        }
    }, [auth])
    useEffect(() => {
        dispatch(getCards())
    }, [])
    return (
        <div className="profile">
            <div className="profileAva">
                <img style={{width: '200px', height: '200px'}} src={profile.avatar} alt="avatar"/>
                {profile.name}
                <div>
                    <NavLink style={{marginRight: '30px'}} to={`/profile/information/`}>Information</NavLink>
                </div>
                <button onClick={() => dispatch(authLogOut())}>logOut</button>
            </div>
            <div className="profileTable">
                <Search/>
                <TablePacksList/>

            </div>
        </div>
    )
}

export default Profile