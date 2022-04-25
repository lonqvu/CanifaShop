import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CardProduct, Container, TextField, SimpleCard } from '../base'
import {
    Grid,
    Card,
    styled,
    Button,
    InputBase,
    ImageList,
    ImageListItem,
    Box,
    Pagination,
    Radio,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Link,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    Paper,
} from '@mui/material'
import {
    ProductService,
    localStorageService,
    URL_IMG,
    AuthService,
} from 'app/services'
import { textAlign } from '@mui/system'
import { Dialog, Notify } from 'app/views/action'
import { ValidatorForm } from 'react-material-ui-form-validator'

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: '200px',
    color: '#000',
}))

const Detail = () => {
    const navigate = useNavigate()
    const { productSeo } = useParams()
    //Sản phẩm
    const [product, setProduct] = useState([])
    //Màu mặc định
    const [listColors, setListColors] = useState([])
    const [color, setColor] = useState({})
    //Danh sách size liên quan đế màu
    const [listSizes, setListSizes] = useState([])
    //Size mặc định
    const [size, setSize] = useState({})

    const [listImages, setListImages] = useState([])

    const [path, setPath] = useState('')
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState()

    const handleChangePage = (event, value) => {
        setPage(value - 1)
        ProductService.getComment(id, value - 1).then((response) => {
            setComments(response.data.content)
            const data = response.data
            setPage(data.page)
            setTotalPages(data.totalPages)
        })
    }

    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
    })

    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const [comments, setComments] = useState([])

    const [auth, setAuth] = useState({})
    const [id, setId] = useState(0)

    useEffect(() => {
        getProductBySeo(productSeo)
        AuthService.infor()
            .then((response) => {
                const data = response.data.data
                const user = { id: data.id, username: data.username }
                setAuth(user)
            })
            .catch((error) => {
                const response = error.response
                setAuth(null)
                if (
                    response.status === 401 &&
                    response.data.message === 'Access is denied'
                ) {
                    localStorageService.setItem('accessToken', null)
                    navigate('/login')
                }
            })
    }, [])

    const checkCommentNull = (cm) => {
        if (cm.length == 0) {
            return (
                <div>
                    <p>Không có bình luận nào</p>
                </div>
            )
        } else {
            return (
                <div>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                        >
                            {cm.map((e) => (
                                <TableBody key={e.id}>
                                    <TableRow>
                                        <Box>
                                        <p
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {e.userResponse.username}
                                        </p>
                                        <p>{e.content}</p>
                                        <p>{e.createdAt}</p>
                                        </Box>
                                    </TableRow>
                                </TableBody>
                            ))}
                        </Table>
                    </TableContainer>
                </div>
            )
        }
    }
    const getProductBySeo = (productSeo) => {
        ProductService.getProductBySeo(productSeo)
            .then((response) => {
                const product = response.data.data
                setProduct(product)
                setListImages(product.listImages)
                setColor(product.listColors[0])
                setListColors(product.listColors)
                setSize(listSizes)
                setListSizes(product.listColors[0].listSizes)
                setId(response.data.data.id)

                ProductService.getComment(response.data.data.id, page).then(
                    (response) => {
                        setComments(response.data.content)
                        const data = response.data
                        setPage(data.page)
                        setTotalPages(data.totalPages)
                        console.log(response.data.content)
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const controlProps = (item) => ({
        checked: color.id === item.id,
        onChange: handleChangeColor,
        value: item.id,
        name: 'color-radio-button',
        inputProps: { 'aria-label': item.id },
    })

    const handleChangeColor = (event) => {
        const id = event.target.value
        const color = product.listColors.find((c) => c.id == id)
        setListSizes(color.listSizes)
        setSize(color.listSizes)
        setColor(color)
    }
    const [alignment, setAlignment] = useState()

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }

    const handleAddProduct = (event) => {
        let listCart = localStorageService.getItem('listCart')
        let check = true
        if (!listCart) {
            listCart = []
        }
        const cartItem = {
            productId: product.id,
            colorId: color.id,
            sizeId: size.id,
            productName: product.name,
            colorCode: color.code,
            sizeName: size.name,
            avatar: product.avatar,
            seo: product.seo,
            price: product.price,
            quantity: 1,
        }

        listCart.forEach((i) => {
            if (
                i.productId === product.id &&
                i.colorId === color.id &&
                i.sizeId === size.id
            ) {
                i.quantity++
                check = false
            }
        })

        if (check) {
            listCart.push(cartItem)
        }

        localStorageService.setItem('listCart', listCart)
        setNotify({
            isOpen: true,
            message: 'Thêm vào giỏ hàng thành công',
            type: 'success',
        })
    }
    return (
        <Container>
            <Grid
                container
                maxWidth="1600px"
                margin="auto"
                spacing={1}
                paddingBottom={7.5}
                paddingTop={2}
            >
                <Grid item xs={12} sm={12}>
                    <Item sx={{ flexGrow: 1 }}>
                        <Grid
                            container
                            spacing={1.2}
                            columns={{ xs: 12, sm: 0, md: 0 }}
                        >
                            <Grid item xs={8} sm={12} md={8} lg={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={10}>
                                        <img
                                            width="100%"
                                            src={
                                                URL_IMG +
                                                (path || product.avatar)
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <ImageList
                                            sx={{
                                                maxWidth: '100%',
                                                height: 800,
                                                marginTop: 0,
                                            }}
                                            cols={1}
                                        >
                                            {listImages.map((item) => (
                                                <ImageListItem key={item.id}>
                                                    <img
                                                        onClick={() =>
                                                            setPath(item)
                                                        }
                                                        width="100%"
                                                        className="img-fluid border"
                                                        src={URL_IMG + item}
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={4}
                                sm={12}
                                md={4}
                                style={{ padding: '0px 50px', marginTop: 0 }}
                            >
                                <Box>
                                    <Stack
                                        direction="row"
                                        justifyContent="start"
                                    >
                                        <p
                                            style={{
                                                fontSize: 25,
                                                fontWeight: 600,
                                                width: '100%',
                                                textAlign: 'left',
                                            }}
                                        >
                                            {product.name}
                                        </p>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="start"
                                    >
                                        <p
                                            style={{
                                                fontSize: 25,
                                                fontWeight: 300,
                                                width: '100%',
                                                textAlign: 'left',
                                            }}
                                        >
                                            {product.price} đ
                                        </p>
                                    </Stack>
                                    <hr style={{ opacity: 0.5 }} />
                                    <Stack
                                        direction="row"
                                        justifyContent="start"
                                    >
                                        <p>Màu sắc {color.code}</p>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        justifyContent="start"
                                    >
                                        {listColors.map((c) => (
                                            <Radio
                                                key={c.id}
                                                {...controlProps(c)}
                                                sx={{
                                                    color: c.code,
                                                    '&.Mui-checked': {
                                                        color: c.code,
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="start"
                                    >
                                        <p>Kích cỡ: {size.name}</p>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="start"
                                    >
                                        {listSizes.map((s) => (
                                            <ToggleButtonGroup
                                                style={{ marginRight: '5px' }}
                                                color="primary"
                                                value={alignment}
                                                exclusive
                                                onChange={handleChange}
                                                key={s.id}
                                            >
                                                <ToggleButton
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        border: '1px solid black',
                                                        color: 'black',
                                                    }}
                                                    outlined
                                                    value={s.name}
                                                    onClick={() => {
                                                        setSize(s)
                                                    }}
                                                >
                                                    {s.name}
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        ))}
                                    </Stack>
                                    <hr
                                        style={{ opacity: 0.5, marginTop: 30 }}
                                    />
                                    <Stack
                                        direction="row"
                                        justifyContent="start"
                                    >
                                        <p>
                                            <Link
                                                component="button"
                                                variant="body2"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        title: '* Bảng kích thước này chỉ dành cho mục đích tham khảo.',
                                                        subTitle: (
                                                            <img
                                                                width="100%"
                                                                src="https://canifa.com/assets/Unisex-adult-measurement.png"
                                                            ></img>
                                                        ),
                                                        isOpen: true,
                                                    })
                                                }}
                                            >
                                                Hướng dẫn chọn size
                                            </Link>
                                        </p>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                    >
                                        <Button
                                            variant="contained"
                                            color="inherit"
                                            style={{ width: '100%' }}
                                            onClick={handleAddProduct}
                                        >
                                            THÊM VÀO GIỎ HÀNG
                                        </Button>
                                    </Stack>

                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                    >
                                        <Button
                                            variant="contained"
                                            color="inherit"
                                            style={{ width: '100%' }}
                                            onClick={() =>
                                                console.log(product.id)
                                            }
                                        >
                                            Thêm vào sản phẩm yêu thích
                                        </Button>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Item>
                </Grid>
                <Grid
                    container
                    maxWidth="1600px"
                    margin="auto"
                    spacing={1}
                    paddingBottom={7.5}
                    paddingTop={2}
                >
                    <Grid item xs={12}>
                        <SimpleCard height="auto" title="Bình luận">
                            <Stack direction="row" justifyContent="start">
                                <ValidatorForm>
                                    <TextField
                                        sx={{
                                            width: '455px',
                                            float: 'left',
                                        }}
                                        type="text"
                                        name="stateAddress"
                                        // value={stateAddress}
                                        label="Nhập bình luận"
                                    />
                                </ValidatorForm>
                                <Button
                                    color="success"
                                    variant="contained"
                                    type="submit"
                                    style={{
                                        height: 50,

                                        marginLeft: 10,
                                    }}
                                >
                                    Gửi
                                </Button>
                            </Stack>
                            {checkCommentNull(comments)}

                            <Stack spacing={2} paddingTop={3} paddingBottom={1}>
                                <Box
                                    my={2}
                                    display="flex"
                                    justifyContent="center"
                                >
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
                        </SimpleCard>
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
                <>
                    <Dialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    ></Dialog>

                    <Notify notify={notify} setNotify={setNotify}></Notify>
                </>
            </Grid>
        </Container>
    )
}

export default Detail
