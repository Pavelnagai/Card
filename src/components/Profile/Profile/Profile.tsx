import React, {useState} from 'react'
import "./Profile.scss"
import CustomizedTables from "../../TablesNew/TableMui";
import Search from "../../Search/Search";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import DoubleSlider from "../../Slider/Slider";
import {useAppSelector} from "../../../redux/store/store";
import {useDispatch} from "react-redux";
import {addPacksTC} from "../../../redux/reducers/packsReducer";
import ModalWindow from "../../Modal/Modal";
import {useParams} from "react-router-dom";
import {TextField} from "@mui/material";
import {TextFieldsOutlined} from "@mui/icons-material";

const Profile = () => {
    const name = useAppSelector<string>(state => state.profile.name)
    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const {active} = useParams()
    const [activeDiv, setActiveDiv] = useState(false)
    const onClickMy = () => {
        setActiveDiv(true)
    }
    const onClickAll = () => {
        setActiveDiv(false)
    }
    const onChange = (e: any) => {
        setValue(e.currentTarget.value)
    }
    const addCard = (name: string) => {
        dispatch(addPacksTC({cardsPack: {name}}))
    }
    return (
        <div className="profile">
            <div className='profileData'>
                {!(active?.toLowerCase() === 'true') && <ProfileAvatar/>}
                {(active?.toLowerCase() === 'true') && <>
                    <h3>Shots Pack Cards</h3>
                    <div className={'sliderPack'}>
                        <div className={activeDiv ? "pack active" : 'pack'} onClick={onClickMy}>My</div>
                        <div className={!activeDiv ? "pack active" : 'pack'} onClick={onClickAll}>All</div>
                    </div>
                </>}
                <h3>Number of cards</h3>
                <DoubleSlider/>
            </div>
            <div className="profileTable">
                <h2>Packs List {name}</h2>
                <div style={{display: 'flex'}}>
                    <Search/>
                    <ModalWindow
                        title="Add Card"
                        titleButton={"Save"}
                        content={<div style={{display: "flex", flexDirection: 'column'}}>
                            <span>Name pack</span>
                            <input style={{border: "none", borderBottom: "1px solid #b5b5e1"}} type="text"/>
                        </div>}
                        callbackButton={addCard}
                        value={value}
                    />
                </div>
                <CustomizedTables
                    active={(active?.toLowerCase() === 'true')}
                    activeDiv={activeDiv}
                />
            </div>
        </div>
    )
}

export default Profile