import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import "./ProfileAvatar.scss"

const ProfileAvatar = () => {
    const profile = useSelector<any, any>(state => state.profile)
    return (
        <div className="container">
            <img src={profile.avatar} alt="avatar"/>
            {profile.name}
            <div>
                <NavLink style={{marginRight: '30px'}} to={`/profile/information/`}>Information</NavLink>
            </div>
        </div>
    );
};

export default ProfileAvatar;