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
import button from "../../../Button/Button";
import {deletePackTC, getPacks, InitialStatePackType} from "../../../../redux/reducers/packsReducer";
import Paginat from "../../../Pagination/Pagination";
import {useAppSelector} from "../../../../redux/store/store";
import './TableMui.scss';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import ModalWindow from "../../../Modal/Modal";
import Button from '@mui/material/Button/Button';

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

type TableType = {
    active: boolean | undefined
    activeDiv: boolean
}

export default function CustomizedTables(props: TableType) {
    const cards = useAppSelector<InitialStatePackType>(state => state.pack)
    const myId = useAppSelector<string>(state => state.auth.myId)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteCard = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const cardsTable = () => {
        if (!props.active || props.activeDiv) {
            dispatch(getPacks({user_id: myId}))
        } else {
            dispatch(getPacks({}))
        }
    }
    useEffect(() => {
        cardsTable()
    }, [props.active, props.activeDiv])
    return (
        <div className='table'>
            <TableContainer component={Paper}>
                <Table  aria-label="customized table">
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
                        {cards.cardPacks.map(el => (
                                <StyledTableRow key={el.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {el.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{el.cardsCount}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{new Date(el.updated).toLocaleDateString().replaceAll('/', ".")}</StyledTableCell>
                                    <StyledTableCell align="right">{el.user_name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className={"buttonInTable"}>
                                            {myId === el.user_id &&
                                                <>
                                                <ModalWindow
                                                    title={"Delete"}
                                                    titleButton={'Delete'}
                                                    content={`Do yoy really want to remove Pack Name:${el.name}? All cards will  be excludes from this course. `}
                                                    callbackButton={() => {
                                                        deleteCard(el._id)
                                                    }}/>
                                                <Button sx={{marginLeft: '10px'}} variant={"contained"}
                                                        onClick={() => navigate(`/profile/pack/${el._id}/${el.user_id}`)}>Edit</Button>
                                                </>
                                            }
                                            <Button sx={{marginLeft: '10px'}} variant={"contained"}
                                                    onClick={() => navigate(`/profile/pack/${el._id}/${el.user_id}`)}>Learn</Button>

                                        </div>

                                        {/*<button onClick={() => navigate(`/profile/pack/${el._id}`)}>Learn</button>*/}
                                    </StyledTableCell>
                                </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paginat count={cards?.cardPacksTotalCount}/>
        </div>

    );
}
