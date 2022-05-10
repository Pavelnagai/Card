import Pagination from '@mui/material/Pagination/Pagination';
import React, {ChangeEvent, useState} from 'react';
import './Pagination.scss';
import {useDispatch} from "react-redux";
import {getPacks} from "../../redux/reducers/packsReducer";
import {Box, createMuiTheme, ThemeProvider} from "@mui/material";

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
            dispatch(getPacks({page: JSON.parse(e.target.innerText)}))
        }
    }
    const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getPacks({pageCount: JSON.parse(e.target.value)}))
    }
    return (
        <div className="pagination">
            <Box sx={{colo: "red"}} color={"red"}>
            <Pagination
                count={counter} page={page}
                onChange={changeNumberPage}
                siblingCount={3}
                boundaryCount={2}
                color={"standard"}
            />
            </Box>

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