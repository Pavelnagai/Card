import Pagination from '@mui/material/Pagination/Pagination';
import React from 'react';

export type PaginatPropsType = {
    count: number
}
const Paginat = (props: PaginatPropsType) => {
    const count = Math.ceil(props.count / 4)
    return (
        <div>
            <Pagination count={count} variant="outlined"/>
        </div>
    );
};

export default Paginat;