import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import button from "../Button/Button";
import {deleteCardTC} from "../../redux/reducers/cardReducer";
import Paginat from "../Pagination/Pagination";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name: string, cards: any, lastUpdate: string, created: string, button: any) {
    return {name, cards, lastUpdate, created, button};
}

export default function CustomizedTables() {
    const cards = useSelector<any, any>(state => state.card.state)
    const dispatch = useDispatch()
    const rows = cards?.cardPacks.map((el: any) => createData(el.name, el.cardsCount, el.updated, el.user_name, <button
        onClick={() => deleteCard(el._id)}>x</button>))
    const deleteCard = (id: any) => {
        dispatch(deleteCardTC(id))
    }
    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Cards</StyledTableCell>
                        <StyledTableCell align="right">Last Update</StyledTableCell>
                        <StyledTableCell align="right">Created</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: any) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.cards}</StyledTableCell>
                            <StyledTableCell align="right">{row.lastUpdate}</StyledTableCell>
                            <StyledTableCell align="right">{row.created}</StyledTableCell>
                            <StyledTableCell align="right">{row.button}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <Paginat count={cards?.cardPacksTotalCount}/>
        </TableContainer>

    );
}
