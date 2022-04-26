import Box from '@mui/material/Box/Box';
import Modal from '@mui/material/Modal/Modal';
import React from 'react';
import Button from "@mui/material/Button/Button";


type ModalWindowType = {
    title: string
    content: any
}

const ModalWindow = (props: ModalWindowType) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3>{props.title}</h3>
                    <p>{props.content}</p>
                    <button style={{backgroundColor: 'red'}} onClick={handleClose}>Close</button>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/*<Button onClick={props.callback}>Cancel</Button>*/}

                </Box>
            </Modal>
        </div>
    );
};

export default ModalWindow;