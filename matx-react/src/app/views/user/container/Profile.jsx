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
    TableRow,
    TableContainer,
    Paper,
    Tab,
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
    FormLabel,
    MenuItem,
} from '@mui/material'
import { OrderDetail } from 'app/views/user/base'
import Valuate from './ProductComment'
import { OrderService } from 'app/services'
import { Notify, AlertDialog, showError } from 'app/views/action'

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
    const [listCity, setListCity] = useState(dataVietNam.city)
    const [listDistrict, setListDistrict] = useState(dataVietNam.district[0])
    const [listWard, setListWard] = useState([])
    const [city, setCity] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()

    const { username } = useParams()
    const [statePassword, setStatePassword] = useState({})
    const [stateInfor, setStateInfor] = useState({})
    const [stateOrder, setStateOrder] = useState([])
    const [stateStatus, setStateStatus] = useState(4)
    const [orderStatus, setStatus] = useState(0)
    const [id, setId] = useState('')
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
    })
    /////////////////////////////////////////// thông tin

    const updateUser = (e) => {
        UserService.updateUser(username, stateInfor)
            .then((response) => {
                navigate('/admin/user-profile')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const inforHandleChange = ({ target: { name, value } }) => {
        setStateInfor({
            ...stateInfor,
            [name]: value,
        })
    }

    useEffect(() => {
        UserService.getUserByUsername(username)
            .then((response) => {
                const user = response.data.data

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
                navigate('/admin/user-profile')
            })
            .catch((error) => {
                console.log(error)
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
                           
                        >
                            Hoàn thành
                        </ButtonCustom>
                        <button type="button" className="Button button-create is-red"  onClick={() => {
                                setStatus(2)
                                setId(x)
                            }}>
        CREATE LISTING
      </button>
                    </ValidatorForm>
                    {/* <Valuate code={e.code}></Valuate> */}
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
                    <Valuate code={e.code}></Valuate>
                </div>
            )
        } else {
            return <div></div>
        }
    }
    const updateStatus = (event) => {
        event.preventDefault();
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
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <SimpleCard title={'Thông tin của tôi'}>
                                <ValidatorForm
                                    onSubmit={updateUser}
                                    onError={() => null}
                                >
                                    <Grid container spacing={6}>
                                        <Grid item xs={12} sx={{ mt: 2 }}>
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
                                ></ValidatorForm>
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
                                                    'this field is required',
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
                                                    'this field is required',
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
                                                    'this field is required',
                                                    "password didn't match",
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
                                                                        {/* <ValidatorForm
                                                                            onSubmit={
                                                                                updateStatus
                                                                            }
                                                                            onError={() =>
                                                                                null
                                                                            }
                                                                        > */}
                                                                        <ShowButton
                                                                            e={
                                                                                order
                                                                            }
                                                                            x={
                                                                                order.id
                                                                            }
                                                                        />
                                                                        {/* </ValidatorForm> */}
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
