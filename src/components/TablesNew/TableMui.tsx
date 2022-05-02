import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch} from "react-redux";
import button from "../Button/Button";
import {deleteCardTC, InitialStateCardType} from "../../redux/reducers/cardReducer";
import Paginat from "../Pagination/Pagination";
import {useAppSelector} from "../../redux/store/store";
import  './TableMui.scss';

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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name: string, cards: any, lastUpdate: string, created: string, button: any[]
) {
    return {name, cards, lastUpdate, created, button};
}

export default function CustomizedTables() {
    const cards = useAppSelector<InitialStateCardType>(state => state.card)
    const myId = useAppSelector<string>(state => state.auth.myId)
    const dispatch = useDispatch()
    const rows = cards?.cardPacks.map(el =>
        createData(
            el.name,
            el.cardsCount,
            el.updated,
            el.user_name,
            [<button>learn</button>,
                myId === el.user_id ?
                    [<button onClick={() => deleteCard(el._id)}>x</button>,
                        <button>edit</button>] : null]))
    const deleteCard = (id: string) => {
        dispatch(deleteCardTC(id))
    }
    return (
        <div className='table'>

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
        </TableContainer>
        <Paginat count={cards?.cardPacksTotalCount }/>
        </div>
    );
}
