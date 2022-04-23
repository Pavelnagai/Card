import React from 'react';
import {useSelector} from "react-redux";
import './TablePacksList.css'
import Paginat from "../../../components/Pagination/Pagination";

const TablePacksList = () => {
    const cards = useSelector<any, any>(state => state.card.state)
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
                    <td>{<button>x</button>}</td>
                </tr>)}
            </table>
            <Paginat count={cards?.cardPacksTotalCount}/>
        </div>
    );
};

export default TablePacksList;