import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useNavigate, useParams } from 'react-router-dom'
import { UserService, localStorageService } from 'app/services'
import dataVietNam from 'app/db/db.vietnam.json'
import { styled } from '@mui/system'
import {
    TextField,
    SimpleCard,
    StyledTableCell,
    StyledTableRow,
    Container,
} from '../base'
import {
    Table,
    TableHead,
    TableBody,
    Fab,
    Icon,
    TableRow,
    TableContainer,
    Paper,
    Tab,
    Autocomplete,
    Stack,
    Tabs,
    Typography,
    Button,
    Select,
    InputLabel,
    Box,
    Grid,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormControl,
    Avatar,
    FormLabel,
    MenuItem,
} from '@mui/material'
import { OrderDetail } from 'app/views/user/base'
import Valuate from './ProductComment'
import { UserAddressService, URL_IMG } from 'app/services'
import { Notify, AlertDialog, showError } from 'app/views/action'
import MyValuate from './MyEvaluate'
import { setCanvasCreator } from 'echarts'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const ButtonCustom = styled(Button)(({ theme }) => ({
    textTransform: 'uppercase',
    width: 135,
    marginBottom: 5,
    display: 'flex',
}))

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0)
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })
    const handleChange = (event, newValue) => {
        setValue(newValue)
        switch (newValue) {
            case 3:
                getOrderByUserName(username, stateStatus)
                break
        }
    }

    const navigate = useNavigate()
    const { username } = useParams()
    const [statePassword, setStatePassword] = useState({})
    const [stateInfor, setStateInfor] = useState({})
    const [stateOrder, setStateOrder] = useState([])
    const [stateStatus, setStateStatus] = useState(4)
    const [listAddress, setListAddress] = useState([])
    const [orderStatus, setStatus] = useState(0)
    const [id, setId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [userId, setUserId] = useState(0)
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
    })
    /////////////////////////////////////////// thông tin

    const updateUser = (e) => {
        UserService.updateUser(username, stateInfor)
            .then((response) => {
                createAvatar()
                // navigate('/profile/' + username)
                window.setTimeout(function () {
                    window.location.href = '/profile/'+username
                }, 500)
                setNotify({
                    isOpen: true,
                    message: 'Cập nhật thành công!',
                    type: 'success',
                })
            })
            .catch((error) => {
                console.log(error)
                setNotify({
                    isOpen: true,
                    message: 'Cập nhật thất bại!',
                    type: 'success',
                })
            })
    }

    const inforHandleChange = ({ target: { name, value } }) => {
        setStateInfor({
            ...stateInfor,
            [name]: value,
        })
    }
    const createAvatar = () => {
        UserService.uploadAvatar(userId, avatar).then((response) => {
            
        })
    }

    useEffect(() => {
        UserAddressService.getAddressByUsername(username).then((response) => {
            setListAddress(response.data.data)
        })
        UserService.getUserByUsername(username)
            .then((response) => {
                const user = response.data.data
                setUserId(user.id)
                setAvatar(user.avatar)
                setStateInfor({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    email: user.email,
                    phone: user.phone,
                })
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

    ///////////////////////////////////////////  địa chỉ

    const deleteAddress = (id) => {
        UserAddressService.deleteAddress(id)
            .then((res) => {
                UserAddressService.getAddressByUsername(username).then(
                    (response) => {
                        setListAddress(response.data.data)
                    }
                )
                setNotify({
                    isOpen: true,
                    message: 'Xóa thành công!',
                    type: 'success',
                })
            })
            .catch((error) => {
                console.log(error)
                setNotify({
                    isOpen: true,
                    message: 'Xóa thất bại!',
                    type: 'error',
                })
            })

        setNotify({
            isOpen: false,
        })
    }

    ///////////////////////////////////////////  đổi mật khẩu

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== statePassword.newPassword) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [statePassword.newPassword])

    const formHandleChange = ({ target: { name, value } }) => {
        setStatePassword({
            ...statePassword,
            [name]: value,
        })
    }

    const updatePassword = (e) => {
        UserService.updatePassword(username, statePassword)
            .then((response) => {
                window.setTimeout(function () {
                    window.location.href = '/profile/'+username
                }, 500)
                setNotify({
                    isOpen: true,
                    message: 'Thay đổi mật khẩu thành công!',
                    type: 'success',
                })
            })
            .catch((error) => {
                setNotify({
                    isOpen: true,
                    message: 'Thay đổi mật khẩu thất bại!',
                    type: 'error',
                })
            })
    }

    ///////////////////////////////////////////////////// đơn hàng của tôi

    const statusHandleChange = (event) => {
        setStateStatus(event.target.value)
        const status = event.target.value
        getOrderByUserName(username, status)
    }

    const getOrderByUserName = (username, stateStatus) => {
        UserService.getOrdersByUserName(username, stateStatus)
            .then((response) => {
                setStateOrder(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const ShowButton = ({ e, x }) => {
        if (e.orderStatus === 'Đang vận chuyển') {
            return (
                <div>
                    <ValidatorForm onSubmit={updateStatus}>
                        <ButtonCustom
                            type="submit"
                            variant="contained"
                            color="success"
                            className="butMUI-update"
                            onClick={() => {
                                setStatus(2)
                                setId(x)
                            }}
                        >
                            Hoàn thành
                        </ButtonCustom>
                    </ValidatorForm>
                </div>
            )
        } else if (e.orderStatus == 'Chờ xác nhận') {
            return (
                <div>
                    <ValidatorForm onSubmit={updateStatus}>
                        <ButtonCustom
                            type="submit"
                            variant="contained"
                            color="warning"
                            className="butMUI-update"
                            onClick={(event) => {
                                setStatus(3)
                                setId(x)
                            }}
                        >
                            Hủy
                        </ButtonCustom>
                    </ValidatorForm>
                </div>
            )
        } else if (e.orderStatus !== 'Đã hủy') {
            return (
                <div>
                    <Valuate code={e.code} ></Valuate>
                </div>
            )
        } else {
            return <div></div>
        }
    }
    const updateStatus = (event) => {
        event.preventDefault()
        const sta = { orderStatus }
        const status = ''
        UserService.updateStatus(id, orderStatus)
            .then((response) => {
                setNotify({
                    isOpen: true,
                    message: 'Cập nhật trạng thái thành công!',
                    type: 'success',
                })
                getOrderByUserName(username, 4)
            })
            .catch((error) => {
                console.log(error)
            })
        setNotify({
            ...notify,
            isOpen: false,
        })
    }
    const updateColor = (e) => {
        let color
        switch (e) {
            case (e = 'Chờ xác nhận'):
                color = 'aqua'
                break
            case (e = 'Đang vận chuyển'):
                color = 'black'
                break
            case (e = 'Giao thành công'):
                color = 'green'
                break
            case (e = 'Đã hủy'):
                color = 'red'
                break
            default:
                color = ''
        }
        return color
    }

    return (
        <Container>
            <Grid
                container
                maxWidth="1600px"
                margin="auto"
                spacing={2}
                paddingBottom={7.5}
            >
                <Grid item xs={12}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            bgcolor: 'background.paper',
                            display: 'flex',
                        }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ paddingTop: 10, width: 250 }}
                        >
                            <Tab label="Thông tin" {...a11yProps(0)} />
                            <Tab label="Địa chỉ" {...a11yProps(1)} />
                            <Tab label="Đổi mật khẩu" {...a11yProps(2)} />
                            <Tab label="Đơn hàng của tôi" {...a11yProps(3)} />
                            <Tab label="Đánh giá" {...a11yProps(4)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <SimpleCard title={'Thông tin của tôi'}>
                                <ValidatorForm
                                    onSubmit={updateUser}
                                    onError={() => null}
                                >
                                    <Grid container spacing={6}>
                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <Stack
                                                direction="row"
                                                sx={{ marginBottom: 2 }}
                                            >
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={URL_IMG + avatar}
                                                    sx={{
                                                        width: '75px',
                                                        height: '75px',
                                                    }}
                                                ></Avatar>
                                                <Fab
                                                    size="small"
                                                    sx={{ marginTop: 2, marginLeft:1}}
                                                    color="primary"
                                                    aria-label="Add"
                                                >
                                                    <input
                                                        style={{
                                                            opacity: '0%',
                                                            with: '100px',
                                                            position:
                                                                'absolute',
                                                        }}
                                                        type="file"
                                                        onChange={(e) => {
                                                            setAvatar(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }}
                                                    ></input>
                                                    <Icon>add</Icon>
                                                </Fab>
                                            </Stack>
                                            <TextField
                                                type="text"
                                                name="username"
                                                value={username}
                                                label="Tên tài khoản"
                                                disabled
                                            />

                                            <TextField
                                                name="firstName"
                                                type="text"
                                                onChange={inforHandleChange}
                                                value={stateInfor.firstName}
                                                label="Họ"
                                            />

                                            <TextField
                                                type="text"
                                                name="lastName"
                                                onChange={inforHandleChange}
                                                value={stateInfor.lastName}
                                                label="Tên"
                                            />

                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">
                                                    Giới tính
                                                </FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="gender"
                                                    value={stateInfor.gender}
                                                    onChange={inforHandleChange}
                                                >
                                                    <FormControlLabel
                                                        value="0"
                                                        control={<Radio />}
                                                        label="Nam"
                                                    />
                                                    <FormControlLabel
                                                        value="1"
                                                        control={<Radio />}
                                                        label="Nữ"
                                                    />
                                                </RadioGroup>
                                            </FormControl>

                                            <TextField
                                                type="email"
                                                name="email"
                                                onChange={inforHandleChange}
                                                value={stateInfor.email}
                                                label="Email"
                                            />

                                            <TextField
                                                type="number"
                                                name="phone"
                                                onChange={inforHandleChange}
                                                value={stateInfor.phone}
                                                label="Số điện thoại"
                                            />

                                            <Button
                                                color="success"
                                                variant="contained"
                                                size="large"
                                                type="submit"
                                                startIcon={'Lưu'}
                                                style={{ width: '100%' }}
                                            ></Button>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>
                            </SimpleCard>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SimpleCard title="Địa chỉ của tôi">
                                <ValidatorForm
                                    onSubmit={() => null}
                                    onError={() => null}
                                >
                                    <Grid container spacing={6}>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                            sx={{ mt: 2 }}
                                        >
                                            <SimpleCard title="Danh sách danh mục">
                                                <Box
                                                    width="100%"
                                                    overflow="auto"
                                                >
                                                    <TableContainer
                                                        component={Paper}
                                                    >
                                                        <Table
                                                            sx={{
                                                                minWidth: 700,
                                                            }}
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
                                                                    <StyledTableCell align="center">
                                                                        Tỉnh/Thành
                                                                        phố
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        Quận/
                                                                        Huyện
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        width="175px"
                                                                    >
                                                                        Xã/Phường
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        width="175px"
                                                                    >
                                                                        Địa chỉ
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        width="175px"
                                                                    >
                                                                        Số điện
                                                                        thoại
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        width="175px"
                                                                    >
                                                                        Hành
                                                                        động
                                                                    </StyledTableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {listAddress.map(
                                                                    (
                                                                        address,
                                                                        index
                                                                    ) => (
                                                                        <StyledTableRow
                                                                            key={
                                                                                address.id
                                                                            }
                                                                        >
                                                                            <StyledTableCell align="center">
                                                                                {
                                                                                    index++
                                                                                }
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="center">
                                                                                {
                                                                                    address.city
                                                                                }
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="center">
                                                                                {
                                                                                    address.district
                                                                                }
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="center">
                                                                                {
                                                                                    address.ward
                                                                                }
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="center">
                                                                                {
                                                                                    address.detail
                                                                                }
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="center">
                                                                                {
                                                                                    address.phone
                                                                                }
                                                                            </StyledTableCell>
                                                                            <StyledTableCell align="center">
                                                                                <Fab
                                                                                    size="small"
                                                                                    color="secondary"
                                                                                    aria-label="Edit"
                                                                                    className="button"
                                                                                    onClick={() =>
                                                                                        navigate(
                                                                                            '/user/UpdateAddress/' +
                                                                                                address.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <Icon>
                                                                                        edit
                                                                                    </Icon>
                                                                                </Fab>
                                                                                <Fab
                                                                                    size="small"
                                                                                    color="secondary"
                                                                                    aria-label="Delete"
                                                                                    className="button"
                                                                                    onClick={() => {
                                                                                        setConfirmDialog(
                                                                                            {
                                                                                                isOpen: true,
                                                                                                title: 'Bạn có chắc chắn xóa!',
                                                                                                subTitle:
                                                                                                    'Bạn sẽ không thể hoàn tác lại thao tác này!',
                                                                                                onConfirm:
                                                                                                    () => {
                                                                                                        deleteAddress(
                                                                                                            address.id
                                                                                                        )
                                                                                                        setConfirmDialog(
                                                                                                            {
                                                                                                                isOpen: false,
                                                                                                            }
                                                                                                        )
                                                                                                    },
                                                                                            }
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <Icon>
                                                                                        delete
                                                                                    </Icon>
                                                                                </Fab>
                                                                            </StyledTableCell>
                                                                        </StyledTableRow>
                                                                    )
                                                                )}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Box>
                                            </SimpleCard>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        color="success"
                                        variant="contained"
                                        size="large"
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                '/user/AddAddress/' + username
                                            )
                                        }
                                        startIcon={'Thêm địa chỉ'}
                                        style={{ width: '100%' }}
                                    ></Button>
                                </ValidatorForm>
                            </SimpleCard>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <SimpleCard title="Đổi mật khẩu">
                                <ValidatorForm
                                    onSubmit={updatePassword}
                                    onError={() => null}
                                >
                                    <Grid container spacing={6}>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                            sx={{ mt: 2 }}
                                        >
                                            <TextValidator
                                                sx={{
                                                    mb: '16px',
                                                    width: '100%',
                                                }}
                                                label="Mật khẩu hiện tại"
                                                variant="outlined"
                                                onChange={formHandleChange}
                                                name="password"
                                                type="password"
                                                value={
                                                    statePassword.password || ''
                                                }
                                                validators={['required']}
                                                errorMessages={[
                                                    'Mật khẩu cũ không được để trống',
                                                ]}
                                            />
                                            <TextValidator
                                                sx={{
                                                    mb: '16px',
                                                    width: '100%',
                                                }}
                                                label="Mật khẩu mới"
                                                variant="outlined"
                                                onChange={formHandleChange}
                                                name="newPassword"
                                                type="password"
                                                value={
                                                    statePassword.newPassword ||
                                                    ''
                                                }
                                                validators={['required']}
                                                errorMessages={[
                                                    'Mật khẩu mới không được để trống',
                                                ]}
                                            />
                                            <TextValidator
                                                sx={{
                                                    mb: '16px',
                                                    width: '100%',
                                                }}
                                                label="Xác nhận mật khẩu"
                                                variant="outlined"
                                                onChange={formHandleChange}
                                                name="confirmPassword"
                                                type="password"
                                                value={
                                                    statePassword.confirmPassword ||
                                                    ''
                                                }
                                                validators={[
                                                    'required',
                                                    'isPasswordMatch',
                                                ]}
                                                errorMessages={[
                                                    'Không được để trống',
                                                    'Mật khẩu mới không khớp',
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        color="success"
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        startIcon={'Xác nhận'}
                                        style={{ width: '100%' }}
                                    ></Button>
                                </ValidatorForm>
                            </SimpleCard>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <SimpleCard title={'Đơn hàng của tôi'}>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <Box
                                            width="100%"
                                            overflow="auto"
                                            minHeight="200px"
                                        >
                                            <FormControl
                                                sx={{ m: 1, minWidth: 160 }}
                                                size="small"
                                            >
                                                <InputLabel id="demo-select-small">
                                                    Trạng thái
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={stateStatus}
                                                    label="Trạng thái"
                                                    onChange={
                                                        statusHandleChange
                                                    }
                                                >
                                                    <MenuItem value={4}>
                                                        Tất cả
                                                    </MenuItem>
                                                    <MenuItem value={0}>
                                                        Chờ xác nhận
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        Đang vận chuyển
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Giao thành công
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        Đã hủy
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>

                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 700 }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell align="center">
                                                                Mã đơn hàng
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                Ngày tạo
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                Giá
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                Trạng thái
                                                            </StyledTableCell>
                                                            <StyledTableCell
                                                                align="center"
                                                                width="175px"
                                                            >
                                                                Hành động
                                                            </StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {stateOrder.map(
                                                            (order) => (
                                                                <StyledTableRow
                                                                    key={
                                                                        order.id
                                                                    }
                                                                >
                                                                    <StyledTableCell align="center">
                                                                        {
                                                                            order.code
                                                                        }
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        {
                                                                            order.createdAt
                                                                        }
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        {order.total.toLocaleString(
                                                                            'vi-VN',
                                                                            {
                                                                                style: 'currency',
                                                                                currency:
                                                                                    'VND',
                                                                            }
                                                                        )}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        style={{
                                                                            color: updateColor(
                                                                                order.orderStatus
                                                                            ),
                                                                        }}
                                                                    >
                                                                        {
                                                                            order.orderStatus
                                                                        }
                                                                    </StyledTableCell>

                                                                    <StyledTableCell align="center">
                                                                        <OrderDetail
                                                                            code={
                                                                                order.code
                                                                            }
                                                                        />

                                                                        <ShowButton
                                                                            e={
                                                                                order
                                                                            }
                                                                            x={
                                                                                order.id
                                                                            }
                                                                        />
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </SimpleCard>
                        </TabPanel>
                        {/* Đánh giá của tôi */}
                        <TabPanel value={value} index={4}>
                            <SimpleCard title={'Đánh giá của tôi'}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }}>
                                        <TableBody>
                                            <StyledTableRow>
                                                <MyValuate></MyValuate>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </SimpleCard>
                        </TabPanel>
                    </Box>
                </Grid>
                <>
                    <Notify notify={notify} setNotify={setNotify}></Notify>
                    <AlertDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    ></AlertDialog>
                </>
            </Grid>
        </Container>
    )
}
