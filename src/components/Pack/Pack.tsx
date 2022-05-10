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
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useParams} from "react-router-dom";
import Paginat from "../Pagination/Pagination";
import style from "./Pack.module.scss";
import {rootReducerType} from "../../redux/store/store";
import ModalWindow from "../Modal/Modal";
import {TextField} from "@mui/material";

type QuizParams = {
    id: string;
    userId: string
};

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
                {/*<Button variant={"contained"} onClick={onClickAddCard}>Add Card</Button>*/}
                <ModalWindow
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
                        {/*<input style={{border: "none", borderBottom: "1px solid #b5b5e1"}} type="text"/>*/}
                    </div>}
                    // callbackButton={onClickAddCard}
                    callbackAnswerAndQuestion={onClickAddCard}
                    value={question}
                    value2={answer}
                />
            </div>
            <div className={style.containerContent}>
                {cards.length > 0 && <div className={style.table}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{background: '#888'}}>
                                    <TableCell>Question</TableCell>
                                    <TableCell align="right">Answer</TableCell>
                                    <TableCell align="right">Last Update</TableCell>
                                    <TableCell align="right">Grade</TableCell>
                                    {myId === userId && <TableCell align="right">Grade</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">{row.question}</TableCell>
                                        <TableCell align="right">{row.answer}</TableCell>
                                        <TableCell
                                            align="right">{new Date(row.created).toLocaleDateString().replaceAll("/", ".")}</TableCell>
                                        <TableCell align="right">{row.grade}</TableCell>
                                        {myId === userId && <TableCell align="right">
                                            <button onClick={()=>deleteCard(row._id)}>Delete</button>
                                            <button>Edit</button>
                                        </TableCell>}
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