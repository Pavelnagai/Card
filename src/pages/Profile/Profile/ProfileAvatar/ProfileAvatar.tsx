import React from 'react';
import {NavLink} from "react-router-dom";
import {authLogOut} from "../../../../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import "./ProfileAvatar.css"

const ProfileAvatar = () => {
    const profile = useSelector<any, any>(state => state.profile)
    const dispatch = useDispatch()
    return (
        <div className="container">
            <img style={{width: '200px', height: '200px'}} src={profile.avatar} alt="avatar"/>
            {profile.name}
            <div>
                <NavLink style={{marginRight: '30px'}} to={`/profile/information/`}>Information</NavLink>
            </div>
            <button onClick={() => dispatch(authLogOut())}>logOut</button>
        </div>
    );
};

export default ProfileAvatar;