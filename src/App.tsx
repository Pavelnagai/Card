import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import CreateNewPass from "./pages/CreateNewPass";
import Error from "./pages/Error";
import Login from "./components/Login/Login";
import PageTest from "./pages/PageTest";
import Profile from "./pages/Profile/Profile/Profile";
import RecoveryPass from "./pages/RecoveryPass";
import SingUp from "./pages/SingUp";
import ProfileInformation from "./pages/Profile/ProfileInformation/ProfileInformation";
import {CheckMail} from "./pages/CheckMail";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./redux/store/store";
import {fetchUser} from "./redux/reducers/profileReducer";
import {getCards} from "./redux/reducers/cardReducer";
import {isInitializedTC} from "./redux/reducers/authReducer";
import Main from "./components/Main/Main";

function App() {
    const auth = useAppSelector<any>(state => state.auth.isAuth)
    const isInitialized = useAppSelector<any>(state => state.auth.isInitialized)
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
    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])
    if (!isInitialized) {
        return <CircularProgress/>
    }
    return (
        <div className="App">
            <Routes>
                <Route index element={<Login/>}/>
                <Route path={'/main'} element={<Main/>}/>
                <Route path={'/create-pass/:token'} element={<CreateNewPass/>}/>
                <Route path={'/error'} element={<Error/>}/>
                <Route path={'/check-mail'} element={<CheckMail/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/test'} element={<PageTest/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/recovery-pass'} element={<RecoveryPass/>}/>
                <Route path={'/sing-up'} element={<SingUp/>}/>
                <Route path={'/profile/information'} element={<ProfileInformation/>}/>
                <Route path={'/*'} element={<Navigate to={'error'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
