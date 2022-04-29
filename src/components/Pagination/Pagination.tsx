import Pagination from '@mui/material/Pagination/Pagination';
import React, {useState} from 'react';

export type PaginatPropsType = {
    count: number
}
const Paginat = (props: PaginatPropsType) => {
    const [page, setPage] = useState<number>(1)
    const counter = Math.ceil(props.count / 4)
    const changeNumberPage = (e: any) => {
        console.log(e)
        if (e.target.innerText) {
            setPage(JSON.parse(e.target.innerText))
        }
    }
    return (
        <div>
            <Pagination
                count={counter} page={page}
                onChange={changeNumberPage}
                siblingCount={3}
                boundaryCount={2}
                color="secondary"
                hidePrevButton={page === 1}
                hideNextButton={page === counter}/>
        </div>
    );
};

export default Paginat;