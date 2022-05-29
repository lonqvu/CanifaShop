import React, { useState, useEffect } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    Fab,
    Icon,
    Grid,
    TableRow,
    Badge,
    IconButton,
    Drawer,
    TableContainer,
    Paper,
    ToggleButtonGroup,
    Button,
    Pagination,
    Stack,
} from '@mui/material'
import MuiToggleButton from '@mui/material/ToggleButton'
import { styled } from '@mui/system'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
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
export default function FavoriteProduct(props) {
    const userId = props.userId
    const navigate = useNavigate()
    const { username } = useParams()
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState([])
    const [images, setImages] = useState([])
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const handleClickOpen = () => {
        setOpen(true)
        showData()
    }

    const handleClose = () => {
        setOpen(false)
    }
    const ButtonCustom = styled(Button)(({ theme }) => ({
        display: 'flex',
        background: 'none',
        border: 'none',
        color: 'black',
    }))
    useEffect(() => {}, [])
    const showData = () => {
        ProductService.getFavoriteProductByUserId(userId).then((response) => {
            setContent(response.data.data)
        })
    }

    //show button
    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <Badge color="secondary">
                    <FavoriteBorder
                        sx={{ color: 'black', marginLeft: '10px' }}
                    />
                </Badge>
            </IconButton>

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
                <DialogTitle></DialogTitle>
                <SimpleCard title="Danh sách sản phẩm yêu thích">
                    <Box width="100%" overflow="auto">
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 700 }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell
                                            align="center"
                                            width="50px"
                                        >
                                            STT
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            width="75px"
                                        >
                                            Hình ảnh
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            Tên sản phẩm
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            Giá bán
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {content.map((p, index) => (
                                        <StyledTableRow
                                            key={p.productResponse.id}
                                        >
                                            <StyledTableCell align="center">
                                                {++index}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IMG
                                                    src={
                                                        URL_IMG +
                                                        p.productResponse.avatar
                                                    }
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {p.productResponse.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {p.productResponse.price.toLocaleString(
                                                    'vi-VN',
                                                    {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }
                                                )}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </SimpleCard>
            </Dialog>
            <>
                <Notify notify={notify} setNotify={setNotify}></Notify>
            </>
        </div>
    )
}
