import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Link from '@mui/material/Link'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
}

export default function BasicModal(props) {
    const { confirmDialog, setConfirmDialog } = props
    const handleClose = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })
    }
    return (
        <div>
            <Modal
                open={confirmDialog.isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {confirmDialog.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {confirmDialog.subTitle}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
