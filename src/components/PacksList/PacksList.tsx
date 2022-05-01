import React, {useState} from 'react';
import Search from "../Search/Search";
import TablePacksList from "../../pages/Profile/Tables/TablePacksList";
import ModalWindow from "../Modal/Modal";
import {useDispatch} from "react-redux";
import {addCardsTC} from "../../redux/reducers/cardReducer";

const PacksList = () => {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const onChange = (e: any) => {
        setValue(e.currentTarget.value)
    }
    const addCard = (name: string) => {
        dispatch(addCardsTC({cardsPack: {name}}))
    }
    return (
        <div>
            <ModalWindow
                title="Add Card"
                content={
                    <div>
                        <input onChange={onChange} type="text"/>
                        <button onClick={() => addCard(value)}>Save</button>
                    </div>}
                callbackButton={addCard}
            />

        </div>
    );
};

export default PacksList;