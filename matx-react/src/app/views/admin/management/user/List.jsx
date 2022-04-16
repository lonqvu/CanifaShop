import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import {
    Table,
    TableHead,
    TableBody,
    Fab,
    Icon,
    TableRow,
    TableContainer,
    Paper,
    Pagination,
    Stack
} from '@mui/material'
import { Container, SearchInput, SearchContainer, StyledTableRow, StyledTableCell, Breadcrumb, SimpleCard } from '../../base'
import { UserService } from 'app/services'
import Notify from 'app/views/action/Notify'
import AlertDialog from 'app/views/action/Confirm'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'


const List = () => {

    const navigate = useNavigate()
    const [content, setContent] = useState([])
    const [page, setPage] = useState(0)
    const [size, setSize] = useState()
    const [totalPages, setTotalPages] = useState()
    const [keyword, setKeyword] = useState('')
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(() => {
        getData(page, keyword)
    }, [])

    const handleChangePage = (event, value) => {
        setPage(value - 1)
        getData(value - 1, keyword)
    };

    const handleChangeSearch = (event) => {
        const keyword = event.target.value
        setKeyword(keyword)
        setPage(0)
        getData(0, keyword)
    }

    const getData = (page, keyword) => {
        UserService.getUsersPagingAdmin(page, keyword).then((response) => {
            const data = response.data
            setContent(data.content)
            setPage(data.page)
            setSize(data.size)
            setTotalPages(data.totalPages)
        }).catch(error => {
            console.log(error)
        })
        setNotify({
            ...notify,
            isOpen: false
        })
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }

    const deleteUser = (id) => {
        UserService.deleteUserAdmin(id).then((reponse) => {
            getData(page, keyword)
            setNotify({
                isOpen: true,
                message: 'Xóa thành công!',
                type: 'success'
            })
        }).catch(error => {
            console.log(error)
            setNotify({
                isOpen: true,
                message: 'Xóa thất bại!',
                type: 'error'
            })
        })

    }

    const lockUser = (id) => {
        UserService.lockUserAdmin(id).then((reponse) => {
            getData(page, keyword)
            setNotify({
                isOpen: true,
                message: 'Khóa thành công!',
                type: 'success'
            })
        }).catch(error => {
            console.log(error)
            setNotify({
                isOpen: true,
                message: 'Khóa thất bại!',
                type: 'error'
            })
        })
    }

    const unlockUser = (id) => {
        UserService.unlockUserAdmin(id).then((reponse) => {
            getData(page, keyword)
            setNotify({
                isOpen: true,
                message: 'Mở khóa thành công!',
                type: 'success'
            })
        }).catch(error => {
            console.log(error)
            setNotify({
                isOpen: true,
                message: 'Mở khóa thất bại!',
                type: 'error'
            })
        })
    }

    const ShowButton = ({ user }) => {
        if (user.locked) {
            return (
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="Lock"
                    className="button"
                    onClick={() => {
                        setConfirmDialog({
                            isOpen: true,
                            title: "Bạn có muốn mở khóa tài khoản này!",
                            subTitle: "Tài khoản này sẽ được mở khóa khóa!",
                            onConfirm: () => { unlockUser(user.id) },
                        })
                    }}
                >
                    <LockOpenIcon/>
                </Fab>
            )
        } else {
            return (
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="Delete"
                    className="button"
                    onClick={() => {
                        setConfirmDialog({
                            isOpen: true,
                            title: "Bạn có muốn khóa tài khoản này!",
                            subTitle: "Tài khoản này sẽ bị khóa!",
                            onConfirm: () => { lockUser(user.id) },
                        })
                    }}
                >
                    <LockIcon/>
                </Fab>
            )
        }
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Tài Khoản' },
                        { name: 'Danh sách' },
                    ]}
                />
            </div>
            <Box width="100%" display="flex" alignItems="center" marginBottom='10px' justifyContent="flex-end">
                <SearchContainer>
                    <SearchInput type="text" placeholder="Nhập từ khóa cần tìm..." autoFocus onChange={handleChangeSearch} />
                    <Icon sx={{ mx: 2, verticalAlign: 'middle', color: 'black' }}>search</Icon>
                </SearchContainer>
            </Box>
            <SimpleCard title="Danh sách tài khoản">
                <Box width="100%" overflow="auto">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" width="50px">STT</StyledTableCell>
                                    <StyledTableCell align="center">Tên tài khoản</StyledTableCell>
                                    <StyledTableCell align="center">Họ Tên</StyledTableCell>
                                    <StyledTableCell align="center">Số Điện Thoại</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center" width="175px">Hành động</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {content.map((user, index) => (
                                    <StyledTableRow key={user.id}>
                                        <StyledTableCell align="center">{++index + ((page) * size)}</StyledTableCell>
                                        <StyledTableCell align="center">{user.username}</StyledTableCell>
                                        <StyledTableCell align="center">{user.firstName + " " + user.lastName}</StyledTableCell>
                                        <StyledTableCell align="center">{user.phone}</StyledTableCell>
                                        <StyledTableCell align="center">{user.email}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <ShowButton user={user}/>
                                            <Fab
                                                size="small"
                                                color="secondary"
                                                aria-label="Delete"
                                                className="button"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: "Bạn có chắc chắn xóa!",
                                                        subTitle: "Bạn sẽ không thể hoàn tác lại thao tác này!",
                                                        onConfirm: () => { deleteUser(user.id) },

                                                    })
                                                }}
                                            >
                                                <Icon>delete</Icon>
                                            </Fab>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                </Box>
            </SimpleCard>
            <>
                <Notify
                    notify={notify}
                    setNotify={setNotify}
                >
                </Notify>
                <AlertDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                >
                </AlertDialog>
            </>
        </Container>
    )
}

export default List