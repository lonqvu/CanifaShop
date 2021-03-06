import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Card, Icon, IconButton, Tooltip } from '@mui/material'
import { Box, styled } from '@mui/system'
import { Small } from 'app/components/Typography'
import {
    HomeService,
    localStorageService,
    StatisTicalService,
} from 'app/services'

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const ContentBox = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': {
        color: theme.palette.text.secondary,
    },
    '& .icon': {
        opacity: 0.6,
        fontSize: '44px',
        color: theme.palette.primary.main,
    },
}))

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontWeight: '500',
    fontSize: '14px',
    color: theme.palette.primary.main,
}))

const StatCards = () => {
    const [userNumber, setUserNumber] = useState(0)
    const [orderNumber, setOrderNumber] = useState(0)
    const [productNumber, setProductNumber] = useState(0)
    const [money, setMoney] = useState([])
    const navigate = useNavigate()

    const sumUser = () => {
        HomeService.getUserSumStaff('users')
            .then((response) => {
                setUserNumber(response.data)
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
        HomeService.getUserSumStaff('orders').then((response) => {
            setOrderNumber(response.data)
        })
        HomeService.getUserSumStaff('products').then((response) => {
            setProductNumber(response.data)
        })
        StatisTicalService.getRevenueByCompleteStaff(0, 1672543800000).then(
            (res) => {
                setMoney(res.data)
            }
        )
    }
    useEffect(() => {
        sumUser()
    }, [])
    return (
        <Grid container spacing={3} sx={{ mb: '24px' }}>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">group</Icon>
                        <Box ml="12px">
                            <Small>Ng?????i d??ng</Small>
                            <Heading>{userNumber}</Heading>
                        </Box>
                    </ContentBox>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">attach_money</Icon>
                        <Box ml="12px">
                            <Small sx={{ lineHeight: 1 }}>Doanh thu</Small>
                            <Heading>
                                {money
                                    .reduce((a, v) => (a = a + v.total), 0)
                                    .toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                            </Heading>
                        </Box>
                    </ContentBox>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">store</Icon>
                        <Box ml="12px">
                            <Small>S???n ph???m</Small>
                            <Heading>{productNumber}</Heading>
                        </Box>
                    </ContentBox>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard elevation={6}>
                    <ContentBox>
                        <Icon className="icon">shopping_cart</Icon>
                        <Box ml="12px">
                            <Small>????n ?????t h??ng</Small>
                            <Heading>{orderNumber}</Heading>
                        </Box>
                    </ContentBox>
                </StyledCard>
            </Grid>
        </Grid>
    )
}

export default StatCards
