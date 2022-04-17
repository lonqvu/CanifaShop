import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CardProduct, Container } from '../base'
import {
    Grid,
    Card,
    styled,
    Button,
    InputBase,
    ImageList,
    ImageListItem,
    Box,
    ButtonGroup,
    Radio,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Link,
} from '@mui/material'
import { ProductService, localStorageService, URL_IMG } from 'app/services'
import { textAlign } from '@mui/system'
import { Dialog, Notify } from 'app/views/action'

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: '200px',
    color: '#000',
}))

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ccc',
    backgroundColor: 'white',
    marginLeft: 0,
    width: '100%',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
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

    useEffect(() => {
        getProductBySeo(productSeo)
    }, [])

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
                <Grid item xs={12}>
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
                                </Box>
                            </Grid>
                        </Grid>
                    </Item>
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
