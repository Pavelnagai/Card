import React, {useEffect, useState} from 'react';
import CustomizedInputBase from "../Search/Search";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch, useSelector} from "react-redux";
import {addCard, deleteCardTC, getCard, ResponseCardType} from "../../redux/reducers/cardsReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useParams} from "react-router-dom";
import Paginat from "../Pagination/Pagination";
import style from "./Pack.module.scss";
import {rootReducerType} from "../../redux/store/store";
import ModalWindow from "../Modal/Modal";
import {TextField} from "@mui/material";
import {styled} from "@mui/material/styles";

type QuizParams = {
    id: string;
    userId: string
};
const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#ECECF9",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(2n)': {
        backgroundColor: "#F8F7FD",
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Pack = () => {
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const cards = useSelector<any, ResponseCardType[]>(state => state.card.cards)
    const myId = useSelector<rootReducerType, string>(state => state.auth.myId)
    const dispatch = useDispatch()
    const {id, userId} = useParams<QuizParams>()
    const onChangeQuestion = (e: any) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: any) => {
        setAnswer(e.currentTarget.value)
    }
    const onClickAddCard = (question: string, answer: string) => {
        if (id) {
            dispatch(addCard({card: {cardsPack_id: id, question, answer}}))
            setAnswer('')
            setQuestion('')
        }
    }
    const deleteCard = (id: string) => {
        dispatch(deleteCardTC(id))
    }
    useEffect(() => {
        dispatch(getCard({cardsPack_id: id, max: 7, pageCount: 8}))
    }, [id, userId])
    return (
        <div className={style.container}>
            <h2><ArrowBackIcon/>Pack Name </h2>
            <div className={style.search}>
                <CustomizedInputBase/>
                {myId === userId && <ModalWindow
                    title="Add Card"
                    titleButton={"Save"}
                    content={<div style={{display: "flex", flexDirection: 'column'}}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Question"
                            multiline
                            maxRows={4}
                            value={question}
                            onChange={onChangeQuestion}
                            variant="standard"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Answer"
                            multiline
                            maxRows={4}
                            value={answer}
                            onChange={onChangeAnswer}
                            variant="standard"
                        />
                    </div>}
                    callbackAnswerAndQuestion={onClickAddCard}
                    value={question}
                    value2={answer}
                />
                }
            </div>
            <div className={style.containerContent}>
                {cards.length > 0 && <div className={style.table}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{background: "#ECECF9", }}>
                                    <StyledTableCell>Question</StyledTableCell>
                                    <StyledTableCell align="right">Answer</StyledTableCell>
                                    <StyledTableCell align="right">Last Update</StyledTableCell>
                                    <StyledTableCell align="right">Grade</StyledTableCell>
                                    {myId === userId && <StyledTableCell align="right">Actions</StyledTableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards.map((row) => (
                                    <StyledTableRow
                                        key={row._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">{row.question}</TableCell>
                                        <TableCell align="right">{row.answer}</TableCell>
                                        <TableCell
                                            align="right">{new Date(row.created).toLocaleDateString().replaceAll("/", ".")}</TableCell>
                                        <TableCell align="right">{row.grade}</TableCell>
                                        {myId === userId && <TableCell align="right">
                                            <Button sx={{background: "#F1453D"}} variant={'contained'}
                                                    onClick={() => deleteCard(row._id)}>Delete</Button>
                                            <Button sx={{marginLeft: "10px", background: "#21268F"}} variant={'contained'}>Edit</Button>
                                        </TableCell>}
                                    </StyledTableRow>
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