import Pagination from '@mui/material/Pagination/Pagination';
import React, {useState} from 'react';
import './Pagination.scss';

export type PaginatPropsType = {
    count: number
}
const Paginat = (props: PaginatPropsType) => {
    const [page, setPage] = useState<number>(1)
    const counter = Math.ceil(props.count / 4)
    const changeNumberPage = (e: any) => {
        if (e.target.innerText) {
            setPage(JSON.parse(e.target.innerText))
        }
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
            <select name="Cards per page" id="selectCardsPerPage">
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