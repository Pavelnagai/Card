import React, {useState} from 'react';
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
                content={<input onChange={onChange} type="text"/>}
                callbackButton={addCard}
                value={value}
            />
        </div>
    );
};

export default PacksList;