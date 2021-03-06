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
    /////////////////////////////////////////// th??ng tin

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
                    message: 'C???p nh???t th??nh c??ng!',
                    type: 'success',
                })
            })
            .catch((error) => {
                console.log(error)
                setNotify({
                    isOpen: true,
                    message: 'C???p nh???t th???t b???i!',
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

    ///////////////////////////////////////////  ?????a ch???

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
                    message: 'X??a th??nh c??ng!',
                    type: 'success',
                })
            })
            .catch((error) => {
                console.log(error)
                setNotify({
                    isOpen: true,
                    message: 'X??a th???t b???i!',
                    type: 'error',
                })
            })

        setNotify({
            isOpen: false,
        })
    }

    ///////////////////////////////////////////  ?????i m???t kh???u

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
                    message: 'Thay ?????i m???t kh???u th??nh c??ng!',
                    type: 'success',
                })
            })
            .catch((error) => {
                setNotify({
                    isOpen: true,
                    message: 'Thay ?????i m???t kh???u th???t b???i!',
                    type: 'error',
                })
            })
    }

    ///////////////////////////////////////////////////// ????n h??ng c???a t??i

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
        if (e.orderStatus === '??ang v???n chuy???n') {
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
                            Ho??n th??nh
                        </ButtonCustom>
                    </ValidatorForm>
                </div>
            )
        } else if (e.orderStatus == 'Ch??? x??c nh???n') {
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
                            H???y
                        </ButtonCustom>
                    </ValidatorForm>
                </div>
            )
        } else if (e.orderStatus !== '???? h???y') {
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
                    message: 'C???p nh???t tr???ng th??i th??nh c??ng!',
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
            case (e = 'Ch??? x??c nh???n'):
                color = 'aqua'
                break
            case (e = '??ang v???n chuy???n'):
                color = 'black'
                break
            case (e = 'Giao th??nh c??ng'):
                color = 'green'
                break
            case (e = '???? h???y'):
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
                            <Tab label="Th??ng tin" {...a11yProps(0)} />
                            <Tab label="?????a ch???" {...a11yProps(1)} />
                            <Tab label="?????i m???t kh???u" {...a11yProps(2)} />
                            <Tab label="????n h??ng c???a t??i" {...a11yProps(3)} />
                            <Tab label="????nh gi??" {...a11yProps(4)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <SimpleCard title={'Th??ng tin c???a t??i'}>
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
                                                label="T??n t??i kho???n"
                                                disabled
                                            />

                                            <TextField
                                                name="firstName"
                                                type="text"
                                                onChange={inforHandleChange}
                                                value={stateInfor.firstName}
                                                label="H???"
                                            />

                                            <TextField
                                                type="text"
                                                name="lastName"
                                                onChange={inforHandleChange}
                                                value={stateInfor.lastName}
                                                label="T??n"
                                            />

                                            <FormControl>
                                                <FormLabel id="demo-row-radio-buttons-group-label">
                                                    Gi???i t??nh
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
                                                        label="N???"
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
                                                label="S??? ??i???n tho???i"
                                            />

                                            <Button
                                                color="success"
                                                variant="contained"
                                                size="large"
                                                type="submit"
                                                startIcon={'L??u'}
                                                style={{ width: '100%' }}
                                            ></Button>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>
                            </SimpleCard>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SimpleCard title="?????a ch??? c???a t??i">
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
                                            <SimpleCard title="Danh s??ch danh m???c">
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
                                                                        T???nh/Th??nh
                                                                        ph???
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center">
                                                                        Qu???n/
                                                                        Huy???n
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        width="175px"
                                                                    >
                                                                        X??/Ph?????ng
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        width="175px"
                                                                    >
                                                                        ?????a ch???
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        width="175px"
                                                                    >
                                                                        S??? ??i???n
                                                                        tho???i
                                                                    </StyledTableCell>
                                                                    <StyledTableCell
                                                                        align="center"
                                                                        width="175px"
                                                                    >
                                                                        H??nh
                                                                        ?????ng
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
                                                                                                title: 'B???n c?? ch???c ch???n x??a!',
                                                                                                subTitle:
                                                                                                    'B???n s??? kh??ng th??? ho??n t??c l???i thao t??c n??y!',
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
                                        startIcon={'Th??m ?????a ch???'}
                                        style={{ width: '100%' }}
                                    ></Button>
                                </ValidatorForm>
                            </SimpleCard>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <SimpleCard title="?????i m???t kh???u">
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
                                                label="M???t kh???u hi???n t???i"
                                                variant="outlined"
                                                onChange={formHandleChange}
                                                name="password"
                                                type="password"
                                                value={
                                                    statePassword.password || ''
                                                }
                                                validators={['required']}
                                                errorMessages={[
                                                    'M???t kh???u c?? kh??ng ???????c ????? tr???ng',
                                                ]}
                                            />
                                            <TextValidator
                                                sx={{
                                                    mb: '16px',
                                                    width: '100%',
                                                }}
                                                label="M???t kh???u m???i"
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
                                                    'M???t kh???u m???i kh??ng ???????c ????? tr???ng',
                                                ]}
                                            />
                                            <TextValidator
                                                sx={{
                                                    mb: '16px',
                                                    width: '100%',
                                                }}
                                                label="X??c nh???n m???t kh???u"
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
                                                    'Kh??ng ???????c ????? tr???ng',
                                                    'M???t kh???u m???i kh??ng kh???p',
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        color="success"
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        startIcon={'X??c nh???n'}
                                        style={{ width: '100%' }}
                                    ></Button>
                                </ValidatorForm>
                            </SimpleCard>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <SimpleCard title={'????n h??ng c???a t??i'}>
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
                                                    Tr???ng th??i
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={stateStatus}
                                                    label="Tr???ng th??i"
                                                    onChange={
                                                        statusHandleChange
                                                    }
                                                >
                                                    <MenuItem value={4}>
                                                        T???t c???
                                                    </MenuItem>
                                                    <MenuItem value={0}>
                                                        Ch??? x??c nh???n
                                                    </MenuItem>
                                                    <MenuItem value={1}>
                                                        ??ang v???n chuy???n
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Giao th??nh c??ng
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        ???? h???y
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>

                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 700 }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell align="center">
                                                                M?? ????n h??ng
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                Ng??y t???o
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                Gi??
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                Tr???ng th??i
                                                            </StyledTableCell>
                                                            <StyledTableCell
                                                                align="center"
                                                                width="175px"
                                                            >
                                                                H??nh ?????ng
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
                        {/* ????nh gi?? c???a t??i */}
                        <TabPanel value={value} index={4}>
                            <SimpleCard title={'????nh gi?? c???a t??i'}>
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
