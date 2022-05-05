import React, {useEffect} from 'react';
import CustomizedInputBase from "../Search/Search";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch, useSelector} from "react-redux";
import {addCard, getCard, ResponseCardType} from "../../redux/reducers/cardsReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useParams} from "react-router-dom";
import Paginat from "../Pagination/Pagination";
import style from "./Pack.module.scss";

type QuizParams = {
    id: string;
};
const Pack = () => {
    const dispatch = useDispatch()
    const {id} = useParams<QuizParams>()
    const onClickAddCard = () => {
        if (id) {
            dispatch(addCard({card: {cardsPack_id: id}}))
        }
    }
    const cards = useSelector<any, ResponseCardType[]>(state => state.card.cards)
    useEffect(() => {
        dispatch(getCard({cardsPack_id: id, max: 7, pageCount: 8}))
    }, [])
    return (
        <div className={style.container}>
            <h2><ArrowBackIcon/>Pack Name </h2>
            <div className={style.search}>
                <CustomizedInputBase/>
                <Button variant={"contained"} onClick={onClickAddCard}>Add Card</Button>
            </div>
            <div className={style.containerContent}>
                {cards.length > 0 && <div className={style.table}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{background: '#888'}}>
                                    <TableCell>Question</TableCell>
                                    <TableCell align="right">Answer</TableCell>
                                    <TableCell align="right">Last Update</TableCell>
                                    <TableCell align="right">Grade</TableCell>
                                    <TableCell align="right">Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards.map((row) => (
                                    <TableRow
                                        // key={row._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">{row.question}</TableCell>
                                        <TableCell align="right">{row.answer}</TableCell>
                                        <TableCell align="right">{row.created}</TableCell>
                                        <TableCell align="right">{row.grade}</TableCell>
                                        <TableCell align="right">
                                            <button>Delete</button>
                                            <button>Edit</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paginat count={4}/>
                </div>
                }
                {cards.length === 0 && <div className={style.null}>This Pack is empty</div>}
            </div>
        </div>
    );
};

export default Pack;