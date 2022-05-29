import React, { useState, useEffect } from 'react'
import {
    Grid,
    styled,
    Card,
    Button,
    Autocomplete,
    IconButton,
    Fab,
    Icon,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
    TextField,
    SimpleCard,
    StyledTableCell,
    StyledTableRow,
    Container,
} from '../base'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {
    localStorageService,
    URL_IMG,
    AuthService,
    OrderService,
    UserAddressService,
    UserService,
} from 'app/services'
import { hasProductInList, createListCart } from 'app/views/action'
import dataVietNam from 'app/db/db.vietnam.json'
import { Notify } from 'app/views/action'
import PromotionService from '../../../services/PromotionService'
import { disConnect } from 'echarts'
// const Item = styled(Card)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     minHeight: '200px',
//     color: '#000',
// }));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    '& span': {
        color: theme.palette.text.primary,
    },
    '& #disable': {
        color: theme.palette.text.disabled,
    },
}))
const ProductBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    transition: 'background 300ms ease',
    '&:hover': {
        background: 'rgba(0,0,0,0.01)',
    },
}))
const IMG = styled('img')(() => ({
    height: 75,
}))
const Color = styled('div')(({ color }) => ({
    width: 14,
    height: 14,
    background: color,
    borderRadius: '50%',
    marginLeft: 5,
    display: 'inline-block',
}))
const Detail = styled('div')(() => ({
    marginBottom: 4,
    display: 'flex',
    alignItems: 'center',
}))
const ProductDetails = styled('div')(() => ({
    marginRight: '8',
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    '& h6': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        width: 120,
        marginBottom: '4px',
    },
}))
const AppUser = () => {
    const [listCart, setListCart] = useState([])
    // const [listPromotion, setListPromotion] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [promotionId, setPromotionId] = useState(0)
    const [userId, setUserId] = useState()
    const [auth, setAuth] = useState({})
    const navigate = useNavigate()

    const listCity = dataVietNam.city
    const [listDistrict, setListDistrict] = useState(dataVietNam.district[0])
    const [listWard, setListWard] = useState([])
    const [city, setCity] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const [detailAddress, setDetailAddress] = useState(null)
    const [stateAddress, setStateAddress] = useState()
    const [openAddress, setOpenAddress] = useState(false)
    const [ship, setShip] = useState(0)
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })
    const [stateOrder, setStateOrder] = useState({})

    const [promotion, setPromition] = useState([])

    const [listAddress, setListAddress] = useState([])

    const [kh, setKh] = useState()

    const handleChangeOrder = ({ target: { name, value } }) => {
        setStateOrder({
            ...stateOrder,
            [name]: value,
        })
    }
    const handleChangeOrder1 = ({ name, value }) => {
        setStateOrder({
            ...stateOrder,
            [name]: value,
        })
    }

    const handleOpenAddress = () => {
        setOpenAddress(true)
    }

    const handleCreateAddress = () => {
        const stateAddress =
            detailAddress +
            ', ' +
            ward.name +
            ', ' +
            district.name +
            ', ' +
            city.name
        setStateAddress(stateAddress)
        setOpenAddress(false)
    }

    useEffect(() => {
        getData()
        PromotionService.getAllPromotions().then((response) => {
            setPromition(response.data.data)
        })
        AuthService.infor()
            .then((response) => {
                const data = response.data.data
                const user = { id: data.id, username: data.username }
                UserService.getUserByUsername(data.username).then((res) => {
                    setKh(res.data.data)
                })

                UserAddressService.getAddressByUsername(data.username).then(
                    (res) => {
                        setListAddress(res.data.data)
                        setStateAddress(
                            res.data.data[0].detail +
                                ', ' +
                                res.data.data[0].ward +
                                ', ' +
                                res.data.data[0].district +
                                ', ' +
                                res.data.data[0].city
                        )
                    }
                )
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
    const title = () => {
        return 'Địa chỉ giao hàng'
    }

    const Show = () => {
        const list = localStorageService.getItem('accessToken')
        if (list == null) {
            return (
                <div>
                    <Grid container xs={12} spacing={1.5}>
                        <Grid item xs={4} sx={{ mt: 2, margin: 0 }}>
                            <TextField
                                type="text"
                                onChange={handleChangeOrder}
                                name="customerName"
                                value={stateOrder.customerName}
                                label="Họ tên"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập họ tên']}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ mt: 2, margin: 0 }}>
                            <TextField
                                type="text"
                                onChange={handleChangeOrder}
                                name="customerPhone"
                                value={stateOrder.customerPhone}
                                label="Số điện thoại"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập số điện thoại']}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ mt: 2, margin: 0 }}>
                            <TextField
                                type="text"
                                onChange={handleChangeOrder}
                                name="customerEmail"
                                value={stateOrder.customerEmail}
                                label="Địa chỉ email"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập email']}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{ mt: 2, margin: 0 }}
                            display="flex"
                            alignItems="center"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: '120px',
                                    marginBottom: '16px',
                                }}
                                onClick={handleOpenAddress}
                            >
                                Nhập địa chỉ
                            </Button>
                            <TextField
                                sx={{
                                    width: '655px',
                                    marginLeft: '16px',
                                }}
                                type="text"
                                name="stateAddress"
                                value={stateAddress}
                                label="Địa chỉ"
                                disabled
                            />
                        </Grid>
                        <Dialog
                            open={openAddress}
                            onClose={handleCreateAddress}
                            sx={{
                                '& .MuiDialog-container': {
                                    '& .MuiPaper-root': {
                                        width: '100%',
                                        maxWidth: '500px',
                                    },
                                },
                            }}
                        >
                            <DialogTitle>Chọn địa chỉ nhận hàng</DialogTitle>
                            <DialogContent>
                                <Autocomplete
                                    disablePortal
                                    options={listCity}
                                    getOptionLabel={(listCity) => listCity.name}
                                    onChange={(event, city) => {
                                        setAddress(city, null, null)
                                    }}
                                    value={city}
                                    sx={{
                                        width: '100%',
                                        marginTop: '16px',
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tỉnh/Thành phố"
                                        />
                                    )}
                                />
                                <Autocomplete
                                    disablePortal
                                    options={listDistrict}
                                    getOptionLabel={(listDistrict) =>
                                        listDistrict.name
                                    }
                                    onChange={(event, district) => {
                                        setAddress(null, district, null)
                                    }}
                                    value={district}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Quận/Huyện"
                                        />
                                    )}
                                />
                                <Autocomplete
                                    disablePortal
                                    options={listWard}
                                    getOptionLabel={(listWard) => listWard.name}
                                    onChange={(event, ward) => {
                                        setAddress(null, null, ward)
                                    }}
                                    value={ward}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Phường/Xã"
                                        />
                                    )}
                                />
                                <TextField
                                    type="text"
                                    value={detailAddress}
                                    onChange={(e) => {
                                        setDetailAddress(e.target.value)
                                    }}
                                    name="detailAddress"
                                    label="Địa chỉ"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleCreateAddress}
                                >
                                    Hoàn tất
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Grid item xs={12} sx={{ mt: 2, margin: 0 }}>
                            <TextField
                                type="text"
                                onChange={handleChangeOrder}
                                name="note"
                                value={stateOrder.note}
                                label="Ghi chú"
                            />
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div>
                    <Grid container xs={12} spacing={1.5}>
                        <Grid item xs={4} sx={{ mt: 2, margin: 0 }}>
                            <TextField
                                type="text"
                                onChange={handleChangeOrder}
                                name="customerName"
                                value={stateOrder.customerName}
                                label="Họ tên"
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ mt: 2, margin: 0 }}>
                            <TextField
                                type="text"
                                onChange={handleChangeOrder}
                                name="customerPhone"
                                value={stateOrder.customerPhone}
                                label="Số điện thoại"
                            />
                        </Grid>
                        <Grid item xs={4} sx={{ mt: 2, margin: 0 }}>
                            <TextField
                                type="text"
                                onChange={handleChangeOrder}
                                name="customerEmail"
                                value={stateOrder.customerEmail}
                                label="Địa chỉ email"
                            />
                        </Grid>
                        <Autocomplete
                            options={listAddress}
                            getOptionLabel={(listAddress) =>
                                listAddress.detail +
                                ', ' +
                                listAddress.ward +
                                ', ' +
                                listAddress.district +
                                ', ' +
                                listAddress.city
                                    ? listAddress.detail +
                                      ', ' +
                                      listAddress.ward +
                                      ', ' +
                                      listAddress.district +
                                      ', ' +
                                      listAddress.city
                                    : ''
                            }
                            onChange={(event, listAddress) => {
                                const x =
                                    listAddress.detail +
                                    ', ' +
                                    listAddress.ward +
                                    ', ' +
                                    listAddress.district +
                                    ', ' +
                                    listAddress.city
                                setStateAddress(x)
                                getShip(listAddress.city)
                            }}
                            sx={{ width: '100%' }}
                            // value={ stateAddress}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Địa chỉ nhận hàng"
                                    // required
                                />
                            )}
                        />
                    </Grid>
                </div>
            )
        }
    }

    const getData = () => {
        const list = localStorageService.getItem('listCart')
        if (list) {
            setListCart(list)
            let total = 0
            list.forEach((p) => {
                total += (p.price - p.price * (p.discount / 100)) * p.quantity
            })
            setTotalCost(total)
            setTotalOrder(list.length)
        }
        AuthService.infor()
            .then((response) => {
                setUserId(response.data.data.id)
            })
            .catch((error) => {
                setUserId(null)
            })
    }

    const updateCartQuantity = (productId, colorId, sizeId, quantity) => {
        listCart.forEach((i) => {
            if (hasProductInList(productId, colorId, sizeId, i)) {
                i.quantity = quantity
            }
        })
        createListCart(listCart)
        getData()
    }

    const deleteProduct = (productId, colorId, sizeId) => {
        listCart.shift(
            (p) =>
                p.productId === productId &&
                p.colorId === colorId &&
                p.sizeId === sizeId
        )
        createListCart(listCart)
        getData()
    }
    const getShip = (city) => {
        dataVietNam.city.map((e) => {
            if (e.name === city) {
                setShip(e.ship)
            }
        })
    }
    const setAddress = (city, district, ward) => {
        if (city) {
            setListDistrict(
                dataVietNam.district.filter((d) => d.idCity === city.idCity)
            )
            setCity(city)
        }
        if (district) {
            setListWard(
                dataVietNam.ward.filter(
                    (w) => w.idDistrict === district.idDistrict
                )
            )
            setDistrict(district)
        }
        if (ward) {
            setWard(ward)
        }
    }
    const createOrder = () => {
        stateOrder.customerAddress = stateAddress
        if (!stateOrder.userId) {
            stateOrder.userId = userId
        }

        stateOrder.total = totalCost - discount - ship
        if (promotionId) {
            stateOrder.promotionId = promotionId
        }

        stateOrder.listOrderDetailsRequest = listCart
        if (localStorageService.getItem('accessToken') == null) {
            stateOrder.userId = null
            OrderService.createOrderGuest(stateOrder)
                .then((response) => {
                    localStorageService.setItem('listCart', null)
                    window.setTimeout(function () {
                        window.location.href = '/'
                    }, 1000)
                    setNotify({
                        isOpen: true,
                        message: 'Tạo đơn hàng thành công!',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    console.log(error)
                    setNotify({
                        isOpen: true,
                        message: 'Tạo đơn hàng thất bại!',
                        type: 'error',
                    })
                })
        } else {
            OrderService.createOrder(stateOrder)
                .then((response) => {
                    localStorageService.setItem('listCart', null)
                    window.setTimeout(function () {
                        window.location.href = '/'
                    }, 1000)
                    setNotify({
                        isOpen: true,
                        message: 'Tạo đơn hàng thành công!',
                        type: 'success',
                    })
                })
                .catch((error) => {
                    console.log(error)
                    setNotify({
                        isOpen: true,
                        message: 'Tạo đơn hàng thất bại!',
                        type: 'error',
                    })
                })
        }
        setNotify({
            ...notify,
            isOpen: false,
        })
    }

    return (
        <Container>
            <Grid
                container
                maxWidth="1300px"
                margin="auto"
                paddingBottom={7.5}
                paddingTop={2}
            >
                <ValidatorForm onSubmit={createOrder} onError={() => null}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <SimpleCard
                                        title={'(' + totalOrder + ') Sản phẩm'}
                                    >
                                        <Box width="100%" overflow="auto">
                                            <TableContainer component={Paper}>
                                                <Table
                                                    sx={{ minWidth: 700 }}
                                                    aria-label="customized table"
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell width="20px"></StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                SẢN PHẨM
                                                            </StyledTableCell>
                                                            <StyledTableCell
                                                                align="center"
                                                                width="100px"
                                                            >
                                                                GIÁ BÁN
                                                            </StyledTableCell>
                                                            <StyledTableCell
                                                                align="center"
                                                                width="120px"
                                                            >
                                                                GIẢM GIÁ
                                                            </StyledTableCell>
                                                            <StyledTableCell
                                                                align="center"
                                                                width="120px"
                                                            >
                                                                SỐ LƯỢNG
                                                            </StyledTableCell>
                                                            <StyledTableCell
                                                                align="right"
                                                                width="120px"
                                                            >
                                                                TỔNG TIỀN
                                                            </StyledTableCell>
                                                            <StyledTableCell width="70px"></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {listCart.map((p) => (
                                                            <StyledTableRow
                                                                key={p.id}
                                                            >
                                                                <StyledTableCell width="20px"></StyledTableCell>
                                                                <StyledTableCell align="left">
                                                                    <ProductBox>
                                                                        <Box
                                                                            mr={
                                                                                1
                                                                            }
                                                                        >
                                                                            <IMG
                                                                                src={
                                                                                    URL_IMG +
                                                                                    p.avatar
                                                                                }
                                                                            />
                                                                        </Box>
                                                                        <ProductDetails>
                                                                            <Link
                                                                                textAlign="left"
                                                                                underline="hover"
                                                                                color="black"
                                                                                href="/admin"
                                                                            >
                                                                                {
                                                                                    p.productName
                                                                                }
                                                                            </Link>
                                                                            <Detail
                                                                                sx={{
                                                                                    display:
                                                                                        'flex',
                                                                                    alignItems:
                                                                                        'center',
                                                                                }}
                                                                            >
                                                                                {p.sizeName +
                                                                                    ' / '}
                                                                                <Color
                                                                                    color={
                                                                                        p.colorCode
                                                                                    }
                                                                                />
                                                                            </Detail>
                                                                        </ProductDetails>
                                                                    </ProductBox>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    {(
                                                                        p.price -
                                                                        p.price *
                                                                            (p.discount /
                                                                                100)
                                                                    ).toLocaleString(
                                                                        'vi-VN',
                                                                        {
                                                                            style: 'currency',
                                                                            currency:
                                                                                'VND',
                                                                        }
                                                                    )}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    {p.discount}{' '}
                                                                    %
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    <Box
                                                                        display="flex"
                                                                        alignItems="center"
                                                                        justifyContent="center"
                                                                    >
                                                                        <StyledIconButton
                                                                            disabled={
                                                                                !(
                                                                                    p.quantity -
                                                                                    1
                                                                                )
                                                                            }
                                                                            size="small"
                                                                            onClick={() =>
                                                                                updateCartQuantity(
                                                                                    p.productId,
                                                                                    p.colorId,
                                                                                    p.sizeId,
                                                                                    p.quantity -
                                                                                        1
                                                                                )
                                                                            }
                                                                        >
                                                                            <Icon
                                                                                id={
                                                                                    !(
                                                                                        p.quantity -
                                                                                        1
                                                                                    ) &&
                                                                                    'disable'
                                                                                }
                                                                            >
                                                                                {' '}
                                                                                keyboard_arrow_down{' '}
                                                                            </Icon>
                                                                        </StyledIconButton>
                                                                        <Box
                                                                            paddingLeft={
                                                                                1
                                                                            }
                                                                            paddingRight={
                                                                                1
                                                                            }
                                                                        >
                                                                            {' '}
                                                                            {
                                                                                p.quantity
                                                                            }{' '}
                                                                        </Box>
                                                                        <StyledIconButton
                                                                            size="small"
                                                                            onClick={() =>
                                                                                updateCartQuantity(
                                                                                    p.productId,
                                                                                    p.colorId,
                                                                                    p.sizeId,
                                                                                    p.quantity +
                                                                                        1
                                                                                )
                                                                            }
                                                                        >
                                                                            <Icon
                                                                                sx={{
                                                                                    cursor: 'pinter',
                                                                                }}
                                                                            >
                                                                                {' '}
                                                                                keyboard_arrow_up{' '}
                                                                            </Icon>
                                                                        </StyledIconButton>
                                                                    </Box>
                                                                </StyledTableCell>
                                                                <StyledTableCell align="right">
                                                                    {(
                                                                        p.quantity *
                                                                        (p.price -
                                                                            p.price *
                                                                                (p.discount /
                                                                                    100))
                                                                    ).toLocaleString(
                                                                        'vi-VN',
                                                                        {
                                                                            style: 'currency',
                                                                            currency:
                                                                                'VND',
                                                                        }
                                                                    )}
                                                                </StyledTableCell>
                                                                <StyledTableCell align="center">
                                                                    <Fab
                                                                        size="small"
                                                                        aria-label="Delete"
                                                                        className="button"
                                                                        onClick={() =>
                                                                            deleteProduct(
                                                                                p.productId,
                                                                                p.colorId,
                                                                                p.sizeId
                                                                            )
                                                                        }
                                                                    >
                                                                        <Icon>
                                                                            delete
                                                                        </Icon>
                                                                    </Fab>
                                                                </StyledTableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </SimpleCard>
                                </Grid>
                                <Grid item xs={12}>
                                    <SimpleCard title={title()}>
                                        <label style={{ fontSize: 15 }}>
                                            {stateAddress}
                                        </label>
                                        <Show />
                                    </SimpleCard>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <SimpleCard height="auto" title="Đơn hàng">
                                <Box width="100%" overflow="auto">
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableBody
                                                sx={{ '& td': { border: 0 } }}
                                            >
                                                <TableRow>
                                                    <TableCell align="left">
                                                        Tổng tiền hàng:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {totalCost.toLocaleString(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        Phí vận chuyển:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {ship.toLocaleString(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        Giảm giá:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {discount.toLocaleString(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        Tổng thanh toán:
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {(
                                                            totalCost -
                                                            discount -
                                                            ship
                                                        ).toLocaleString(
                                                            'vi-VN',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={2}
                                                        align="right"
                                                    >
                                                        <Autocomplete
                                                            disablePortal
                                                            size="small"
                                                            options={promotion}
                                                            getOptionLabel={(
                                                                promotion
                                                            ) => promotion.name}
                                                            onChange={(
                                                                event,
                                                                promotion
                                                            ) => {
                                                                if (
                                                                    totalCost <
                                                                    promotion.discountFrom
                                                                ) {
                                                                    setNotify({
                                                                        isOpen: true,
                                                                        message:
                                                                            'Đơn hàng chưa đạt giá trị tối thiểu',
                                                                        type: 'error',
                                                                    })
                                                                    setDiscount(
                                                                        0
                                                                    )
                                                                } else {
                                                                    if (
                                                                        totalCost *
                                                                            (promotion.discountPercent /
                                                                                100) >
                                                                        promotion.discountMax
                                                                    ) {
                                                                        setDiscount(
                                                                            promotion.discountMax
                                                                        )
                                                                    } else {
                                                                        setDiscount(
                                                                            totalCost *
                                                                                (promotion.discountPercent /
                                                                                    100)
                                                                        )
                                                                    }
                                                                    setPromotionId(
                                                                        promotion.id
                                                                    )
                                                                }
                                                            }}
                                                            sx={{
                                                                width: '100%',
                                                                '& .MuiFormControl-root':
                                                                    {
                                                                        marginBottom: 0,
                                                                    },
                                                            }}
                                                            renderInput={(
                                                                params
                                                            ) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Chọn mã giảm giá"
                                                                />
                                                            )}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={2}
                                                        align="right"
                                                    >
                                                        <Button
                                                            fullWidth
                                                            color="success"
                                                            variant="contained"
                                                            size="large"
                                                            type="submit"
                                                        >
                                                            ĐẶT HÀNG
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </SimpleCard>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </Grid>
            <>
                <Notify notify={notify} setNotify={setNotify}></Notify>
            </>
        </Container>
    )
}

export default AppUser
