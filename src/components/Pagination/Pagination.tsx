import Pagination from '@mui/material/Pagination/Pagination';
import React, {ChangeEvent, useState} from 'react';
import './Pagination.scss';
import {useDispatch} from "react-redux";
import {getCards} from "../../redux/reducers/cardReducer";

export type PaginatPropsType = {
    count: number
}
const Paginat = (props: PaginatPropsType) => {
    const [page, setPage] = useState<number>(1)
    const counter = Math.ceil(props.count / 4)
    const dispatch = useDispatch()
    const changeNumberPage = (e: ChangeEvent<any>) => {
        if (e.target.innerText) {
            setPage(JSON.parse(e.target.innerText))
            dispatch(getCards({page: JSON.parse(e.target.innerText)}))
        }
    }
    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCards({pageCount: JSON.parse(e.target.value)}))
    }
    return (
        <div className="pagination">
            <Pagination
                count={counter} page={page}
                onChange={changeNumberPage}
                siblingCount={3}
                boundaryCount={2}
                color="secondary"
            />
            <span>
                Show
            <select name="Cards per page" id="selectCardsPerPage" onChange={onChangeSelect}>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
            </select>
            Cards per page
            </span>
        </div>
    );
};

export default Paginat;