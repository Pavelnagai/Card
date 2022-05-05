import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import './TablePacksList.css'
import Paginat from "../../Pagination/Pagination";
import {deletePackTC} from "../../../redux/reducers/packsReducer";

const TablePacksList = () => {
    const cards = useSelector<any, any>(state => state.card.state)
    const dispatch = useDispatch()
    const deleteCard = (id: any) => {
        dispatch(deletePackTC(id))
    }
    return (
        <div>
            <table className="table">
                <tr className="table_a">
                    <th>Name</th>
                    <th>Cards</th>
                    <th>Last Update</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
                {cards?.cardPacks.map((el: any) => <tr>
                    {el.name}
                    <td>{el.cardsCount}</td>
                    <td>{el.updated}</td>
                    <td>{el.user_name}</td>
                    <td>{<button onClick={()=>{deleteCard(el._id)}}>x</button>}</td>
                </tr>)}
            </table>

        </div>
    );
};

export default TablePacksList;