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
    Avatar,
    ToggleButtonGroup,
    Button,
    Pagination,
    Stack,
    TableCell,
    Container,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import MuiToggleButton from '@mui/material/ToggleButton'
import { height, styled } from '@mui/system'
import { Box } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { TextField, SimpleCard, StyledTableCell, StyledTableRow } from '../base'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import EditEvaluate from './EditComment'
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
export default function MyValuate(props) {
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
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [id, setId] = useState(0)
    const [comments, setComments] = useState([])
    const [stateOrder, setStateOrder] = useState([])
    const [checked, setChecked] = useState(false)
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })
    const ButtonCustom = styled(Button)(({ theme }) => ({
        textTransform: 'uppercase',
        width: 135,
        marginBottom: 5,
        display: 'flex',
    }))

    const handleChangePage = (event, value) => {
        setPage(value - 1)
        ProductService.getCommentByUser(userId, value - 1).then((response) => {
            setComments(response.data.content)
            const data = response.data
            setPage(data.page)
            setTotalPages(data.totalPages)
        })
    }

    useEffect(() => {
        UserService.getOrdersByUserName(username, 4)
            .then((response) => {
                const d = response.data.data
                setStateOrder(response.data.data)
                setListProductOrders(d.listProductOrders)
            })
            .catch((error) => {
                console.log(error)
            })
        UserService.getUserByUsername(username)
            .then((response) => {
                const user = response.data.data
                setUserId(response.data.data.id)
                ProductService.getCommentByUser(user.id, page).then(
                    (responses) => {
                        const data = responses.data
                        setComments(responses.data.content)
                        setPage(data.page)
                        setTotalPages(data.totalPages)
                    }
                )
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
        }
    }

    const checkFavorite = (ex) => {
        ProductService.getCheckFavorite(ex).then((res) => {
            console.log(res.data.data)
            // return res.data.data
            // setC
        })
    }

    const checkFomatFile = (e) => {
        if (e.includes('.mp4')) {
            return (
                <div>
                    <video src={URL_IMG + e} width="105px" controls></video>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={URL_IMG + e} alt="" width="105px" />
                </div>
            )
        }
    }

    //show button
    return (
        <Container>
            <Box width="auto" margin="20px" overflow="auto">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }}>
                        <TableBody>
                            {comments.map((e, index) => (
                                <TableRow>
                                    <Box
                                        sx={{
                                            backgroundColor: '',
                                            padding: 2,
                                            border: '1px solid black',
                                            borderRadius: 10,
                                            marginBottom: 2,
                                        }}
                                    >
                                        <Stack direction="row" spacing={2}>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={
                                                    URL_IMG +
                                                    e.userResponse.avatar
                                                }
                                            />
                                            <p
                                                style={{
                                                    marginLeft: 15,
                                                    fontSize: 15,
                                                }}
                                            >
                                                {e.userResponse.username}
                                                <p
                                                    style={{
                                                        fontSize: 12,
                                                        opacity: '50%',
                                                    }}
                                                >
                                                    {e.createdAt}
                                                </p>
                                            </p>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            style={{ marginLeft: 55 }}
                                        >
                                            <p>{e.content}</p>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            style={{
                                                marginLeft: 55,
                                            }}
                                        >
                                            <TableContainer>
                                                <TableBody>
                                                    {e.listImages.map((img) => (
                                                        <TableCell
                                                            style={{
                                                                marginRight: 5,
                                                            }}
                                                        >
                                                            {checkFomatFile(
                                                                img
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableBody>
                                            </TableContainer>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            style={{
                                                marginLeft: 55,
                                                background: '#E1E1E1',
                                            }}
                                        >
                                            <TableContainer>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            <img
                                                                src={
                                                                    URL_IMG +
                                                                    e
                                                                        .productResponse
                                                                        .avatar
                                                                }
                                                                alt=""
                                                                width="45px"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                e
                                                                    .productResponse
                                                                    .name
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </TableContainer>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            style={{
                                                marginLeft: 55,
                                                marginTop: 20,
                                            }}
                                        >
                                            <EditEvaluate
                                                id={e.id}
                                            ></EditEvaluate>
                                        </Stack>
                                    </Box>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <>
                    <Notify notify={notify} setNotify={setNotify}></Notify>
                </>
            </Box>
            <Stack spacing={2} paddingTop={3} paddingBottom={1}>
                <Box my={2} display="flex" justifyContent="center">
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={handleChangePage}
                        variant="outlined"
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            </Stack>
        </Container>
    )
}
