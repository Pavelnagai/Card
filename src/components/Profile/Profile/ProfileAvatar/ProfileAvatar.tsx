import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import "./ProfileAvatar.scss"
import Button from "@mui/material/Button/Button";

const ProfileAvatar = () => {
    const profile = useSelector<any, any>(state => state.profile)
    return (
        <div className="container">
            <img src={profile.avatar} alt="avatar"/>
            {profile.name}
            <div>Front-end developer</div>
            <NavLink style={{textDecoration: 'none'}} to={`/profile/information/`}><Button
                sx={{color: "#21268F", border: "1px solid #21268F"}} variant={'outlined'}>Edit
                profile</Button></NavLink>
        </div>
    );
};

export default ProfileAvatar;