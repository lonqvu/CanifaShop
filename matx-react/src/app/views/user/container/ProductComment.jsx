// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { SimpleCard } from 'app/components'
// import { ValidatorForm } from 'react-material-ui-form-validator'
// import { CardProduct, Container, TextField, StyledTableCell, StyledTableRow } from '../base'

// import {
//     Grid,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableContainer,
//     Paper,
//     styled,
//     Box,
//     Card,
//     ToggleButton
// } from '@mui/material'
// import { UserService, URL_IMG } from 'app/services'

// const Item = styled(Card)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     minHeight: '200px',
//     color: '#000',
// }));

// const IMG = styled('img')(() => ({
//     width: 75,
// }))

// const AppUser = (props) => {
//     const code = props.code
//     const [listProductOrders, setListProductOrders] = useState([])
//     const [stateOrderDetai, setStateOrderDetail] = useState({})
//     const getOrderByCode = () => {
//         UserService.getOrderDetailsByCode(code)
//             .then((response) => {
//                 const d = response.data.data
//                 setStateOrderDetail(d)
//                 setListProductOrders(d.listProductOrders)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }
//     useEffect(() => {
//         getOrderByCode();
//     }, [])
//     return (
//         <Container>
//             <SimpleCard title="Đánh giá">
//             <Box width="auto" margin="20px" overflow="auto">
//                     {/* {Mot table} */}
//                     <TableContainer component={Paper}>
//                         <Table sx={{ minWidth: 700 }}>
//                             <TableHead>
//                                 <TableRow>
//                                 <StyledTableCell align="center">
//                                         Hình ảnh
//                                     </StyledTableCell>
//                                     <StyledTableCell align="center">
//                                         Sản phẩm
//                                     </StyledTableCell>
//                                     <StyledTableCell align="center">
//                                         Giá bán
//                                     </StyledTableCell>
//                                     <StyledTableCell align="center">
//                                         Số lượng
//                                     </StyledTableCell>
//                                     <StyledTableCell align="center">
//                                         Tổng tiền
//                                     </StyledTableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {listProductOrders.map((order) => (
//                                     <StyledTableRow key={order.id}>
//                                         <StyledTableCell align="center">
//                                             <IMG src={URL_IMG + order.avatar} />
//                                         </StyledTableCell>
//                                         <StyledTableCell align="center">
//                                             {order.name}
//                                         </StyledTableCell>
//                                         <StyledTableCell align="center">
//                                             {order.price.toLocaleString(
//                                                 'vi-VN',
//                                                 {
//                                                     style: 'currency',
//                                                     currency: 'VND',
//                                                 }
//                                             )}
//                                         </StyledTableCell>
//                                         <StyledTableCell align="center">
//                                             {order.quantity}
//                                         </StyledTableCell>
//                                         <StyledTableCell align="center">
//                                             {(
//                                                 order.price * order.quantity
//                                             ).toLocaleString('vi-VN', {
//                                                 style: 'currency',
//                                                 currency: 'VND',
//                                             })}
//                                         </StyledTableCell>
//                                     </StyledTableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Box>
//                 <div>
//                     <ValidatorForm onSubmit={()=>null} onError={() => null}>
//                         <Grid container spacing={6}>
//                             <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
//                                 <TextField
//                                     type="text"
//                                     name="content"
//                                     // onChange={(e) => setName(e.target.value)}
//                                     // value={name}
//                                     label="Cảm nhận"
//                                     validators={['required']}
//                                     errorMessages={['Vui lòng nhập ý kiến đóng góp cho sản phẩm']}
//                                 />
//                             </Grid>
//                         </Grid>
//                         {/* <ButtonForm id={id} /> */}
//                     </ValidatorForm>
//                 </div>
//             </SimpleCard>
//             {/* <>
//                 <Notify
//                     notify={notify}
//                     setNotify={setNotify}
//                 >
//                 </Notify>
//             </> */}
//         </Container>
//     )
// }

// export default AppUser

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
export default function Valuate(props) {
    const code = props.code
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
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const handleClickOpen = () => {
        setOpen(true)
        getOrderByCode()
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
    const CreateComment = (e) => {
        e.preventDefault()
        const comment = { userId, content }
        const favorite = { userId }
        console.log(selected)
        selected.map((x) =>
            ProductService.createFavotite(x, favorite).then((response) => {})
        )
        listProductOrders.map((e) =>
            ProductService.createComment(e.id, comment)
                .then((response) => {
                    setNotify({
                        isOpen: true,
                        message: 'Đánh giá thành công, vui lòng chờ!',
                        type: 'success',
                    })
                    window.setTimeout(function () {
                        setOpen(false)
                    }, 1000)
                })
                .catch((error) => {
                    console.log(error)
                    setNotify({
                        isOpen: true,
                        message: 'Đánh giá thất bại!',
                        type: 'error',
                    })
                })
        )
    }
    const getOrderByCode = () => {
        UserService.getOrderDetailsByCode(code)
            .then((response) => {
                const d = response.data.data
                setStateOrderDetail(d)
                setListProductOrders(d.listProductOrders)
                // setProductId(d.listProductOrders)
                // d.listProductOrders.map((e) => {setProductId(e.id)})
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        UserService.getUserByUsername(username)
            .then((response) => {
                const user = response.data.data
                setUserId(user.id)
            })
            .catch((error) => {
                const response = error.response
                if (
                    response.status === 401 &&
                    response.data.message === 'Access is denied'
                ) {
                    localStorageService.setItem('accessToken', null)
                    navigate('/login')
                }
            })
    }, [])

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
                Đánh giá
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
                <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                <Box width="auto" margin="20px" overflow="auto">
                    {/* {Mot table} */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">
                                        Hình ảnh
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Sản phẩm
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Giá bán
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Số lượng
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Tổng tiền
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        Yêu thích
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listProductOrders.map((order, index) => (
                                    <StyledTableRow key={order.id}>
                                        <StyledTableCell align="center">
                                            <IMG src={URL_IMG + order.avatar} />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {order.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {order.price.toLocaleString(
                                                'vi-VN',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }
                                            )}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {order.quantity}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {(
                                                order.price * order.quantity
                                            ).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <ToggleButtonGroup
                                                value={selected}
                                                onChange={handleSelected}
                                            >
                                                <ToggleButton
                                                    selectedColor="white"
                                                    value={order.id}
                                                    onChange={handleSelected}
                                                >
                                                    <FavoriteIcon />
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <ValidatorForm
                            onSubmit={CreateComment}
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
                                        label="Cảm nhận"
                                        validators={['required']}
                                        errorMessages={[
                                            'Vui lòng nhập ý kiến đóng góp cho sản phẩm',
                                        ]}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                color="success"
                                variant="contained"
                                size="large"
                                type="submit"
                            >
                                Đánh giá
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
