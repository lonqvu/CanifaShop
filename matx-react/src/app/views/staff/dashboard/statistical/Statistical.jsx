import React, { Fragment, PureComponent, useState, useEffect } from 'react'
import { styled } from '@mui/system'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import PropTypes from 'prop-types'
import {
    Container,
    StyledTableRow,
    StyledTableCell,
    SimpleCard,
} from '../../base'

import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
    Table,
    TableHead,
    TableBody,
    Autocomplete,
    Box,
    TableRow,
    TableContainer,
    Paper,
    Typography,
    Pagination,
    Stack,
    TextField,
    Grid,
    Tab,
    Tabs,
    TableCell,
} from '@mui/material'
import { StatisTicalService, CategoryService } from 'app/services'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PaidIcon from '@mui/icons-material/Paid'
import MoneyOffCsredIcon from '@mui/icons-material/MoneyOffCsred'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))
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
const Analytics = () => {
    const [data, setData] = useState([])
    const [totalRevenue, settotalRevenue] = React.useState([])
    const [parentId, setParentId] = useState(0)
    const [data1, setData1] = useState([])
    const [listRevenueByQuantity, setListRevenueByQuantity] = useState([])
    const [content, setContent] = useState([])
    const [page, setPage] = useState(0)
    const [value, setValue] = useState(0)
    const [size, setSize] = useState()
    const [totalPages, setTotalPages] = useState()
    const [year, setYear] = useState(2018)
    const [month, setMonth] = useState(2)
    const [title, setTitle] = useState()
    const [totalbyYear, setTotalByYear] = useState([])
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(Date.now)
    const [categoryParent, setCategoryParent] = useState([])
    const [top5cate, setTop5Cate] = useState([])
    const [listCate, setListCate] = useState([])
    const [top10User, setTop10User] = useState([])
    const [statusOrder, setStatusOrder] = useState([])
    const [countComplete, setCountComplete] = useState(0)
    const [countShip, setCountShip] = useState(0)
    const [countCancel, setCountCancel] = useState(0)
    const handleChangePage = (event, value) => {
        setPage(value - 1)
        getOrderByMonth(value - 1, year, month)
    }

    const getOrderByMonth = (page, year, month) => {
        StatisTicalService.getOrderByMonthStaff(page, year, month)
            .then((response) => {
                const d = response.data
                setContent(d.content)
                setPage(d.page)
                setSize(d.size)
                setTotalPages(d.totalPages)
                setTitle('Danh sách hóa đơn tháng: ' + month + '/' + year)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getCategoryParent = () => {
        CategoryService.getCategoryParentStaff().then((response) => {
            setCategoryParent(response.data.data)
        })
    }
    const getCategoryByParentId = (startTime, endTime, parentId) => {
        StatisTicalService.getRevenueByCateStaff(startTime, endTime, parentId).then(
            (response) => {
                setListCate(response.data)
            }
        )
    }

    const count = ()=>{
        StatisTicalService.getCountStaff(startTime, endTime, 'COMPLETED').then(res=>{
            setCountComplete(res.data)
        })
        StatisTicalService.getCountStaff(startTime, endTime, 'RESOLVED').then(res=>{
            setCountShip(res.data)
        })
        StatisTicalService.getCountStaff(startTime, endTime, 'CANCELED').then(res=>{
            setCountCancel(res.data)
        })
    }

    useEffect(() => {
        getRevenue(year)
        getRevenueTop3Product()
        getRevenueTop5Cate()
        getRevenueByQuantity()
        getCategoryParent()
        getRevenueTop10User()
        getRevenueByComplete()
        count()
        getCategoryByParentId(startTime, endTime, parentId)
    }, [])
    const status = [
        { label: 'Đã nhận hàng', status: 'COMPLETED' },
        { label: 'Đã hủy', status: 'CANCELED' },
    ]
    const getData = (data) => {
        const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        let listMonth = []
        month.forEach((e) => {
            listMonth.push({ month: e, total: 0 })
        })

        if (data.length != 0) {
            data.forEach((e) => {
                listMonth.find((m) => m.month == e.month).total = e.total
            })
        }
        setData(listMonth)
    }

    const getRevenue = (year) => {
        StatisTicalService.getYearStaff(year).then((response) => {
            getData(response.data)
            setTotalByYear(response.data)
        })
    }

    const getRevenueTop10User = () => {
        StatisTicalService.getRevenueTop10UserStaff(startTime, endTime).then(
            (response) => {
                setTop10User(response.data)
            }
        )
    }

    const getRevenueTop3Product = () => {
        StatisTicalService.getRevenueTop5ProductStaff(startTime, endTime).then(
            (response) => {
                setData1(response.data)
            }
        )
    }

    const getRevenueTop5Cate = () => {
        StatisTicalService.getRevenueTop5CateStaff(startTime, endTime).then(
            (response) => {
                setTop5Cate(response.data)
            }
        )
    }
    const getRevenueByQuantity = () => {
        StatisTicalService.getRevenueByQuantityStaff(startTime, endTime).then(
            (response) => {
                setListRevenueByQuantity(response.data)
            }
        )
    }

    const getRevenueByComplete = () => {
        StatisTicalService.getRevenueByCompleteStaff(startTime, endTime).then(
            (response) => {
                setStatusOrder(response.data)
                settotalRevenue(response.data)
            }
        )
    }

    const getRevenueByCancel = () => {
        StatisTicalService.getRevenueByCancelStaff(startTime, endTime).then(
            (response) => {
                setStatusOrder(response.data)
            }
        )
    }
    const handleChange = (e) => {
        const y = e.target.value
        setYear(y)
        getRevenue(y)
    }
    const handleChanges = (event, newValue) => {
        setValue(newValue)
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
                            onChange={handleChanges}
                            aria-label="Vertical tabs example"
                            sx={{ paddingTop: 10, width: 250 }}
                        >
                            <Tab label="Tổng Thông kê" {...a11yProps(0)} />
                            <Tab label="Theo danh mục" {...a11yProps(1)} />
                            <Tab label="Theo sản phẩm" {...a11yProps(2)} />
                            <Tab label="Theo người dùng" {...a11yProps(3)} />
                        </Tabs>

                        {/* TỔNG DOANH THU */}

                        <TabPanel value={value} index={0}>
                            <SimpleCard title="Thống kê">
                                
                                <FormControl
                                    sx={{ m: 1, minWidth: 160 }}
                                    size="small"
                                    style={{ marginBottom: '20px' }}
                                >
                                    <InputLabel id="demo-select-small">
                                        Năm
                                    </InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={year}
                                        label="Trạng thái"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={2018}>2018</MenuItem>
                                        <MenuItem value={2019}>2019</MenuItem>
                                        <MenuItem value={2020}>2020</MenuItem>
                                        <MenuItem value={2021}>2021</MenuItem>
                                        <MenuItem value={2022}>2022</MenuItem>
                                        <MenuItem value={2023}>2023</MenuItem>
                                    </Select>
                                </FormControl>
                                <ResponsiveContainer width="100%" height={400}>
                                    <AreaChart
                                        width={500}
                                        height={300}
                                        data={data}
                                        onClick={(e) => {
                                            const values = e.activeLabel
                                            setMonth(values)
                                            getOrderByMonth(page, year, values)
                                        }}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="month"
                                            label={'Tháng'}
                                        />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />

                                        <Area
                                            type="monotone"
                                            dataKey="total"
                                            stroke="#8884d8"
                                            fill="#8884d8"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </SimpleCard>
                            <Stack>
                                <h2>
                                    Tổng doanh thu theo năm:{' '}
                                    {totalbyYear
                                        .reduce((a, v) => (a = a + v.total), 0)
                                        .toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                </h2>
                            </Stack>
                            <Stack>
                                <h2>
                                    Tổng doanh thu theo tháng:{' '}
                                    {content
                                        .reduce((a, v) => (a = a + v.total), 0)
                                        .toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                </h2>
                            </Stack>

                            <SimpleCard title={title}>
                                <Box width="100%" overflow="auto">
                                    <TableContainer
                                        component={Paper}
                                        sx={{ minHeight: 230 }}
                                    >
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
                                                    <StyledTableCell align="center">
                                                        Mã đơn hàng
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        Ngày tạo
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        Tên khách hàng
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        Total (VNĐ)
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {content.map((order, index) => (
                                                    <StyledTableRow
                                                        key={order.id}
                                                    >
                                                        <StyledTableCell align="center">
                                                            {++index +
                                                                page * size}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {order.code}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {order.createdAt}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {order.customerName}
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
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Stack
                                        spacing={2}
                                        paddingTop={3}
                                        paddingBottom={1}
                                    >
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
                                </Box>
                            </SimpleCard>
                        </TabPanel>

                        {/* THỐNG KÊ THEO DANH MỤC */}

                        <TabPanel value={value} index={1}>
                            <SimpleCard title="Thống kê theo danh mục">
                            <Stack
                                direction="row"
                                spacing={2}
                                style={{
                                    margin: 'auto',
                                    background: '#E1e1e1',
                                }}
                            >
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <DownloadDoneIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: 'green',
                                                        }}
                                                    ></DownloadDoneIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                        {countComplete}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <LocalShippingIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: '#be4d25',
                                                        }}
                                                    ></LocalShippingIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                        {countShip}
                                                    </span>
                                                </TableCell>
                                                
                                                <TableCell>
                                                    <MoneyOffCsredIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: 'red',
                                                        }}
                                                    >
                                                    
                                                    </MoneyOffCsredIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                       {countCancel}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <PaidIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: '#E0d208',
                                                        }}
                                                    >
                                                        {' '}
                                                    </PaidIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                         {totalRevenue
                                                            .reduce(
                                                                (a, v) =>
                                                                    (a =
                                                                        a +
                                                                        v.total),
                                                                0
                                                            )
                                                            .toLocaleString(
                                                                'vi-VN',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'VND',
                                                                }
                                                            )}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                                <p>
                                    <TextField
                                        id="datetime-local"
                                        label="Từ ngày"
                                        type="datetime-local"
                                        defaultValue="2020-05-24T10:30"
                                        sx={{ width: 250, marginRight: 10 }}
                                        onChange={(e) => {
                                            setStartTime(
                                                Date.parse(e.target.value)
                                            )
                                            getRevenueTop5Cate()
                                            getRevenueByComplete()
                                            count()
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="datetime-local"
                                        label="Đến ngày"
                                        type="datetime-local"
                                        defaultValue="2022-05-24T10:30"
                                        onChange={(e) => {
                                            setEndTime(
                                                Date.parse(e.target.value)
                                            )
                                            getRevenueTop5Cate()
                                            getRevenueByComplete()
                                            count()
                                        }}
                                        sx={{ width: 250 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={categoryParent}
                                        getOptionLabel={(categoriesParent) =>
                                            categoriesParent.name
                                        }
                                        onChange={(event, categoriesParent) => {
                                            getCategoryByParentId(
                                                startTime,
                                                endTime,
                                                categoriesParent.id
                                            )
                                        }}
                                        sx={{ width: 300, marginTop: 5 }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Danh mục lớn"
                                            />
                                        )}
                                    />
                                </p>

                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={top5cate}
                                        margin={{
                                            top: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <Stack>
                                    <span style={{ textAlign: 'center' }}>
                                        Doanh thu theo danh mục
                                    </span>
                                </Stack>
                            </SimpleCard>
                            <SimpleCard title="Doanh số theo danh mục">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">
                                                    STT
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Tên danh mục
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Số lượng bán trong danh mục
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Doanh thu
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listCate.map((order, index) => (
                                                <StyledTableRow key={order.id}>
                                                    <StyledTableCell align="center">
                                                        {++index}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {order.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {order.quantity}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {order.total.toLocaleString(
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
                            </SimpleCard>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <SimpleCard title="Thống kê theo sản phẩm">
                            <Stack
                                direction="row"
                                spacing={2}
                                style={{
                                    margin: 'auto',
                                    background: '#E1e1e1',
                                }}
                            >
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <DownloadDoneIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: 'green',
                                                        }}
                                                    ></DownloadDoneIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                        {countComplete}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <LocalShippingIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: '#be4d25',
                                                        }}
                                                    ></LocalShippingIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                        {countShip}
                                                    </span>
                                                </TableCell>
                                                
                                                <TableCell>
                                                    <MoneyOffCsredIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: 'red',
                                                        }}
                                                    >
                                                    
                                                    </MoneyOffCsredIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                       {countCancel}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <PaidIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: '#E0d208',
                                                        }}
                                                    >
                                                        {' '}
                                                    </PaidIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                         {totalRevenue
                                                            .reduce(
                                                                (a, v) =>
                                                                    (a =
                                                                        a +
                                                                        v.total),
                                                                0
                                                            )
                                                            .toLocaleString(
                                                                'vi-VN',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'VND',
                                                                }
                                                            )}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                                <p>
                                    <TextField
                                        id="datetime-local"
                                        label="Từ ngày"
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        sx={{ width: 250, marginRight: 10 }}
                                        onChange={(e) => {
                                            setStartTime(
                                                Date.parse(e.target.value)
                                            )
                                            getRevenueTop3Product()
                                            getRevenueByComplete()
                                            count()
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="datetime-local"
                                        label="Đến ngày"
                                        type="datetime-local"
                                        defaultValue="2022-05-24T10:30"
                                        onChange={(e) => {
                                            setEndTime(
                                                Date.parse(e.target.value)
                                            )
                                            getRevenueTop3Product()
                                            getRevenueByComplete()
                                            count()
                                        }}
                                        sx={{ width: 250 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </p>

                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={data1}
                                        margin={{
                                            top: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <Stack>
                                    <span style={{ textAlign: 'center' }}>
                                        Top 5 sản phẩm có doanh thu cao nhất
                                    </span>
                                </Stack>
                            </SimpleCard>
                            <SimpleCard title="Doanh số sản phẩm">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">
                                                    STT
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Tên sản phẩm
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Số lượng đã bán
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Doanh thu
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listRevenueByQuantity.map(
                                                (order, index) => (
                                                    <StyledTableRow
                                                        key={order.id}
                                                    >
                                                        <StyledTableCell align="center">
                                                            {++index}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {order.name}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {order.quantity}
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
                                                    </StyledTableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </SimpleCard>
                        </TabPanel>

                        {/* THỐNG KÊ THEO NGƯỜI DÙNG */}

                        <TabPanel value={value} index={3}>
                            <SimpleCard title="Thống kê theo người dùng">
                            <Stack
                                direction="row"
                                spacing={2}
                                style={{
                                    margin: 'auto',
                                    background: '#E1e1e1',
                                }}
                            >
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <DownloadDoneIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: 'green',
                                                        }}
                                                    ></DownloadDoneIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                        {countComplete}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <LocalShippingIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: '#be4d25',
                                                        }}
                                                    ></LocalShippingIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                        {countShip}
                                                    </span>
                                                </TableCell>
                                                
                                                <TableCell>
                                                    <MoneyOffCsredIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: 'red',
                                                        }}
                                                    >
                                                    
                                                    </MoneyOffCsredIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                       {countCancel}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <PaidIcon
                                                        style={{
                                                            fontSize: '70px',
                                                            color: '#E0d208',
                                                        }}
                                                    >
                                                        {' '}
                                                    </PaidIcon>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        style={{
                                                            lineHeight: '70px',
                                                            fontSize: '25px',
                                                        }}
                                                    >
                                                         {totalRevenue
                                                            .reduce(
                                                                (a, v) =>
                                                                    (a =
                                                                        a +
                                                                        v.total),
                                                                0
                                                            )
                                                            .toLocaleString(
                                                                'vi-VN',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'VND',
                                                                }
                                                            )}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                                <p>
                                    <TextField
                                        id="datetime-local"
                                        label="Từ ngày"
                                        type="datetime-local"
                                        defaultValue="2020-05-24T10:30"
                                        sx={{ width: 250, marginRight: 10 }}
                                        onChange={(e) => {
                                            setStartTime(
                                                Date.parse(e.target.value)
                                            )
                                            getRevenueTop10User()
                                            getRevenueByComplete()
                                            count()
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="datetime-local"
                                        label="Đến ngày"
                                        type="datetime-local"
                                        defaultValue="2022-05-24T10:30"
                                        onChange={(e) => {
                                            setEndTime(
                                                Date.parse(e.target.value)
                                            )
                                            getRevenueTop10User()
                                            getRevenueByQuantity()
                                            getRevenueByComplete()
                                            count()
                                        }}
                                        sx={{ width: 250 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </p>

                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={top10User}
                                        margin={{
                                            top: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="total" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <Stack>
                                    <span style={{ textAlign: 'center' }}>
                                        10 khách hàng mua nhiều nhất
                                    </span>
                                </Stack>
                            </SimpleCard>
                            
                            
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={status}
                                defaultValue={ { label: 'Đã nhận hàng', status: 'COMPLETED' }}
                                getOptionLabel={(status) => status.label}
                                onChange={(event, status) => {
                                    if (status.label === 'Đã nhận hàng') {
                                        getRevenueByComplete()
                                    } else {
                                        getRevenueByCancel()
                                    }
                                }}
                                sx={{ width: 300, marginTop: 5 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Trạng thái đơn hàng"
                                    />
                                )}
                            />
                            <SimpleCard title="Doanh số theo trạng thái">
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">
                                                    STT
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Tên tài khoản
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Tên khách hàng
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Đơn đặt hàng
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Trả hàng
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Tổng tiền
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {statusOrder.map((order, index) => (
                                                <StyledTableRow key={order.id}>
                                                    <StyledTableCell align="center">
                                                        {++index}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {order.userName}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {order.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {order.quantity}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {order.cancel}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {order.total.toLocaleString(
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
                            </SimpleCard>
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Analytics
