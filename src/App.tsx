import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import CreateNewPass from "./components/CreateNewPassword/CreateNewPass";
import Error from "./components/Error/Error";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile/Profile";
import RecoveryPass from "./components/RecoveryPassword/RecoveryPass";
import SingUp from "./components/SingUp/SingUp";
import ProfileInformation from "./components/Profile/ProfileInformation/ProfileInformation";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./redux/store/store";
import {fetchUser} from "./redux/reducers/profileReducer";
import {getPacks} from "./redux/reducers/packsReducer";
import EditCard from './components/Edit/EditCard';
import Pack from "./components/Pack/Pack";
import {Layout} from "./components/Layout/Layout";
import {isInitializedTC} from "./redux/reducers/authReducer";

function App() {
    const auth = useAppSelector<any>(state => state.auth.isAuth)
    const isInitialized = useAppSelector<any>(state => state.auth.isInitialized)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (auth) {
            dispatch(fetchUser())
            dispatch(getPacks({}))
        } else {
            navigate('/login')
        }
    }, [auth])
    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])
    if (!isInitialized) {
        return <CircularProgress/>
    }
    return (
        <div className="App">
            {auth && <Layout/>}
                <Routes>
                    <Route index element={<Login/>}/>
                    <Route path={'/main/:active'} element={<Profile/>}/>
                    <Route path={'/create-pass/:token'} element={<CreateNewPass/>}/>
                    <Route path={'/error'} element={<Error/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/recovery-pass'} element={<RecoveryPass/>}/>
                    <Route path={'/sing-up'} element={<SingUp/>}/>
                    <Route path={'/profile/information'} element={<ProfileInformation/>}/>
                    <Route path={'/profile/edit'} element={<EditCard/>}/>
                    <Route path={'/profile/pack/:id/:userId'} element={<Pack/>}/>
                    <Route path={'/*'} element={<Navigate to={'error'}/>}/>
                </Routes>
        </div>
    );
}

export default App;
