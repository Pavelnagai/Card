import React, {useEffect} from 'react';
import {Layout} from "../Layout/Layout";
import './Main.scss'
import Profile from "../../pages/Profile/Profile/Profile";
import {useDispatch} from "react-redux";
import {getCards} from "../../redux/reducers/cardReducer";

const Main = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCards({}))
    }, [])
    return (
        <div className='main'>
            <div className='header'>
                <Layout/>
            </div>
            <div className='main_container'>
                <Profile/>
            </div>
        </div>
    );
};

export default Main;