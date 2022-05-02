import React, {useState} from 'react'
import "./Profile.scss"
import PacksList from "../../../components/PacksList/PacksList";
import CustomizedTables from "../../../components/TablesNew/TableMui";
import Search from "../../../components/Search/Search";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import DoubleSlider from "../../../components/Slider/Slider";
import {useAppSelector} from "../../../redux/store/store";

const Profile = () => {
    const name = useAppSelector<string>(state => state.profile.name)
    return (
        <div className="profile">
            <div className='profileData'>
                <ProfileAvatar/>
                <h3>Number of cards</h3>
                <DoubleSlider/>
            </div>

            <div className="profileTable">
                <h2>Packs List {name}</h2>
                <div style={{display: 'flex'}}>
                    <div>
                        <Search/>
                    </div>
                    <div>
                        <PacksList/>
                    </div>
                </div>
                <CustomizedTables/>


            </div>

        </div>
    )
}

export default Profile