import React, { useState, useEffect } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    Fab,
    Icon,
    Grid,
    TableRow,
    TableContainer,
    Paper,
    ToggleButtonGroup,
    Button,
    Pagination,
    Stack,
} from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'
import { styled } from '@mui/system'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Box } from '@mui/system'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { TextField, SimpleCard, StyledTableCell, StyledTableRow } from '../base'
import {
    UserService,
    URL_IMG,
    ProductService,
    localStorageService,
} from 'app/services'
import Notify from 'app/views/action/Notify'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
const IMG = styled('img')(() => ({
    width: 75,
}))
const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
    border: 'none',
    '&.Mui-selected, &.Mui-selected:hover': {
        color: 'red',
        backgroundColor: selectedColor,
    },
})) 
export default function EditEvaluate(props) {
    const commentId = props.id
    const navigate = useNavigate()
    const { username } = useParams()
    const [open, setOpen] = useState(false)
    const [stateOrderDetai, setStateOrderDetail] = useState({})
    const [listProductOrders, setListProductOrders] = useState([])
    const [content, setContent] = useState('')
    const [like, setLike] = useState(false)
    const [userId, setUserId] = useState(0)
    const [productId, setProductId] = useState([])
    const [selected, setSelected] = React.useState(() => [])
    const [colors, setColor] = useState('black')
    const [images, setImages] = useState([])
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const ButtonCustom = styled(Button)(({ theme }) => ({
        textTransform: 'uppercase',
        width: 135,
        marginBottom: 5,
        display: 'flex',
    }))
    const updateComment = (e) => {
        e.preventDefault()
        const comment = { content }
        const favorite = { userId }
        console.log(commentId)
        ProductService.editComment(commentId, comment)
            .then((response) => {
                ProductService.createOrUpdateImageComment(commentId, images)
                    .then((re) => {
                        window.setTimeout(function () {
                            window.location.href = '/profile/'+username
                        }, 500)
                        setNotify({
                            isOpen: true,
                            message: 'C???p nh???t th??nh c??ng!',
                            type: 'success',
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        setNotify({
                            isOpen: true,
                            message: 'T???o th???t b???i!',
                            type: 'error',
                        })
                    })
            })
            .catch((error) => {
                console.log(error)
                setNotify({
                    isOpen: true,
                    message: '????nh gi?? th???t b???i!',
                    type: 'error',
                })
            })
    }
    const handleMutipleAvatar = (e) => {
        setImages(e.target.files)
    }


    const handleSelected = (event, newSelected) => {
        if (newSelected.length) {
            setSelected(newSelected)
            console.log(newSelected)
        }
    }

    //show button
    return (
        <div>
            <ButtonCustom
                onClick={handleClickOpen}
                type="button"
                variant="contained"
                color="success"
                className="butMUI-update"
            >
                S???a
            </ButtonCustom>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-container': {
                        '& .MuiPaper-root': {
                            width: '100%',
                            maxWidth: '1000px',
                        },
                    },
                }}
            >
                <DialogTitle>Chi ti???t ????n h??ng</DialogTitle>
                <Box width="auto" margin="20px" overflow="auto">
                    <div>
                        <ValidatorForm
                            onSubmit={updateComment}
                            onError={() => null}
                        >
                            <Grid container spacing={6}>
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextField
                                        type="text"
                                        name="content"
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        value={content}
                                        label="C???m nh???n"
                                        validators={['required']}
                                        errorMessages={[
                                            'Vui l??ng nh???p ?? ki???n ????ng g??p cho s???n ph???m',
                                        ]}
                                    />
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleMutipleAvatar}
                                    />
                                    {/* <Checkbox
                                                icon={<FavoriteBorder />}
                                                checkedIcon={<Favorite />}
                                                // checked={()=>{
                                                //     ProductService.getCheckFavorite(ex).then((res) => {

                                                //     })
                                                // }}
                                            /> */}
                                </Grid>
                            </Grid>
                            <br></br>
                            <Button
                                color="success"
                                variant="contained"
                                size="large"
                                type="submit"
                            >
                                ????nh gi??
                            </Button>
                        </ValidatorForm>
                    </div>
                </Box>
            </Dialog>
            <>
                <Notify notify={notify} setNotify={setNotify}></Notify>
            </>
        </div>
    )
}
