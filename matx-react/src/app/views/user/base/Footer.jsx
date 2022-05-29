import React from 'react'
import { Container, Grid, Box, Link } from '@mui/material'

const Footer = () => {
    return (
        <footer>
            <Box bgcolor="text.secondary" color="white">
                <Container maxWidth="95%" style={{ background: '#333f48' }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <h3>CÔNG TY CỔ PHẦN CANIFA</h3>
                            <Box>
                                <label>
                                    {' '}
                                    Số ĐKKD: 0107574310, ngày cấp: 23/09/2016
                                    <br></br>
                                    nơi cấp: Sở Kế hoạch và đầu tư Hà Nội
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>
                                    {' '}
                                    Trụ sở chính: Số 688, Đường Quang Trung,
                                    Phường La Khê, Quận Hà Đông, Hà Nội, Việt
                                    Nam<br></br>
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>
                                    {' '}
                                    Địa chỉ liên hệ: Phòng 301 Tòa nhà GP
                                    Invest, 170 La Thành, P. Ô Chợ Dừa, Q. Đống
                                    Đa, Hà Nội
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label> Số điện thoại: +8424 - 7303.0222</label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>Fax: +8424 - 6277.6419</label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label> Địa chỉ email: hello@canifa.com</label>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                        <h3>THƯƠNG HIỆU</h3>
                            <Box>
                                <label>
                                Giới thiệu
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>
                                Tin tức
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>
                                Tuyển dụng
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label> Với cộng đồng</label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>Hệ thống cửa hàng</label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>Liên hệ</label>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                        <h3>HỖ TRỢ</h3>
                            <Box>
                                <label>
                                Hỏi đáp
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>
                                Chính sách KHTT
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>
                                Hướng dẫn chọn size
                                </label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label> Kiểm tra đơn hàng</label>
                            </Box>
                            <Box style={{ marginTop: 10 }}>
                                <label>Chính sách bảo mật</label>
                            </Box>
                           
                        </Grid>
                    </Grid>
                   
                </Container>
            </Box>
        </footer>
    )
}

export default Footer
