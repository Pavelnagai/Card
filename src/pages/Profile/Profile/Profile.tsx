import React from 'react'
import "./Profile.scss"
import PacksList from "../../../components/PacksList/PacksList";
import CustomizedTables from "../../../components/TablesNew/TableMui";
import Search from "../../../components/Search/Search";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import DoubleSlider from "../../../components/Slider/Slider";

type propsProfileType = {}
const Profile = (props: propsProfileType) => {
    return (
        <div className="profile">
            <div className='profileData'>
                <ProfileAvatar/>
                <DoubleSlider/>
            </div>
            <div className="profileTable">
                <Search/>
                <CustomizedTables/>
                <PacksList/>

            </div>

        </div>
    )
}

export default Profile