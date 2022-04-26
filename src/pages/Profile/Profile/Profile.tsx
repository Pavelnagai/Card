import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../../redux/reducers/profileReducer";
import {useNavigate} from "react-router-dom";
import {getCards} from "../../../redux/reducers/cardReducer";
import TablePacksList from "../Tables/TablePacksList";
import "./Profile.css"
import Search from "../../../components/Search/Search";
import {rootReducerType} from "../../../redux/store/store";
import DoubleSlider from '../../../components/Slider/Slider';
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";

type propsProfileType = {}
const Profile = (props: propsProfileType) => {

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
                <ProfileAvatar/>
                <DoubleSlider/>
            </div>
            <div className="profileTable">
                <Search/>
                <TablePacksList/>
            </div>
        </div>
    )
}

export default Profile