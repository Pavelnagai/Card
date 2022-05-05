import Box from '@mui/material/Box/Box';
import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import Button from "@mui/material/Button/Button";
import style from './Edit.module.scss'
import {Layout} from "../Layout/Layout";
import {useNavigate} from "react-router-dom";

const EditCard = () => {
    const [valueQuestion, setValueQuestion] = React.useState('');
    const [valueAnswer, setValueAnswer] = React.useState('');
    const navigate = useNavigate()

    const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueQuestion(event.target.value);
    };
    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueAnswer(event.target.value);
    };

    return (
        <>
            <Box
                id={style.box}
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <div className={style.boxContainer}>

                    <h2>Card info</h2>
                    <div className={style.textField}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Question"
                            multiline
                            maxRows={4}
                            value={valueQuestion}
                            onChange={handleChangeQuestion}
                            variant="standard"
                        />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Answer"
                            multiline
                            maxRows={4}
                            value={valueAnswer}
                            onChange={handleChangeAnswer}
                            variant="standard"
                        />
                    </div>
                    <div className={style.button}>
                        <Button variant={'contained'} sx={{backgroundColor: "#888", margin: "10px"}}
                                onClick={() => navigate('/main')}>Cancel</Button>
                        <Button variant={'contained'} sx={{backgroundColor: "#1b13b9", margin: "10px"}}>Save</Button>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default EditCard;