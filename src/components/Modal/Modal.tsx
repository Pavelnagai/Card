import Box from '@mui/material/Box/Box';
import Modal from '@mui/material/Modal/Modal';
import React, {useState} from 'react';
import Button from "@mui/material/Button/Button";
import style from "./Modal.module.scss";
import "../../access/Scss/variable.scss"

type ModalWindowType = {
    title: string
    titleButton: string
    content: any
    callbackButton?: (name: string) => void
    value?: string
    callbackAnswerAndQuestion?: (question: string, answer: string) => void
    value2?: string
}

const ModalWindow = (props: ModalWindowType) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const add = () => {
        if (props.callbackButton&&props.value) {
            props.callbackButton(props.value)
        }else if (props.callbackAnswerAndQuestion){
            if(props.value && props.value2){
                props.callbackAnswerAndQuestion(props.value, props.value2)
            }
        }
        handleClose()
    }

    return (
        <div>
            <Button sx={{background: props.title=== "Delete" ?"#F1453D" : "#21268F"}} className={props.title === "Delete" ? "buttonDelete" : style.buttonSave}
                    variant={'contained'}
                    onClick={handleOpen}>{props.title}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={style.boxStyle}>
                    <div className={style.title}>
                        <h3>{props.title}</h3>
                    </div>
                    <div className={style.content}>
                        {props.content}
                        <div className={style.containerButton}>
                            <Button className={style.button} variant={'contained'} onClick={handleClose}>Cancel</Button>
                            <Button className={props.titleButton === "Delete" ? style.buttonDelete : style.buttonSave}
                                    variant={"contained"} onClick={add}>{props.titleButton}</Button>
                        </div>
                    </div>


                </Box>
            </Modal>
        </div>
    );
};

export default ModalWindow;