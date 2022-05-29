import React, { Fragment, useState, useEffect } from 'react'
import { Box, styled, useTheme } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import useSettings from 'app/hooks/useSettings'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import { topBarHeight } from 'app/utils/constant'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import {
    Icon,
    Badge,
    IconButton,
    Drawer,
    Button,
    Link,
    ThemeProvider,
} from '@mui/material'
import { localStorageService, URL_IMG } from 'app/services'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    '& span': {
        color: theme.palette.text.primary,
    },
    '& #disable': {
        color: theme.palette.text.disabled,
    },
}))

const MiniCart = styled('div')(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: "300px",
}))

const CartBox = styled('div')(() => ({
    padding: '4px',
    paddingLeft: '16px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: themeShadows[6],
    height: topBarHeight,
    '& h5': {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: '16px',
        fontWeight: '500',
    },
}))

const ProductBox = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    transition: 'background 300ms ease',
    '&:hover': {
        background: 'rgba(0,0,0,0.01)',
    },
}))

const IMG = styled('img')(() => ({
    width: 55,
}))

const Color = styled('div')(({ color }) => ({
    width: 14,
    height: 14,
    background: color,
    borderRadius: "50%",
    marginLeft: 5,
    display: "inline-block",
}))

const Detail = styled('div')(() => ({
    marginBottom: 4,
    display: "flex",
    alignItems: "center",
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

function ShoppingCart({ container }) {
    const [totalCost, setTotalCost] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)
    const [panelOpen, setPanelOpen] = useState(false)
    const [listCart, setListCart] = useState([])

    const { settings } = useSettings()

    const { palette } = useTheme()
    const textColor = palette.text.primary

    const navigate = useNavigate()

    const handleDrawerToggle = () => {
        if (!panelOpen) {
            getData()
        }
        setPanelOpen(!panelOpen)
    }

    const handleCheckoutClick = () => {
        if (totalCost > 0) {
            navigate('/checkout')
            setPanelOpen(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        const list = localStorageService.getItem('listCart')
        if (list) {
            setListCart(list)
            let total = 0
            list.forEach((p) => {
                total += p.price * p.quantity
            })
            setTotalCost(total)
            setTotalOrder(list.length)
        } else {
            localStorageService.setItem('listCart', [])
        }
    }

    return (
        <Fragment>
            <IconButton onClick={handleDrawerToggle}>
                <Badge color="secondary" badgeContent={totalOrder}>
                    < ShoppingBagOutlinedIcon  sx={{ color: textColor, marginLeft:'10px' }}/>
                </Badge>
            </IconButton>

            <ThemeProvider theme={settings.themes[settings.activeTheme]}>
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={'right'}
                    open={panelOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <MiniCart>
                        <CartBox>
                            < ShoppingBagOutlinedIcon  color="primary" sx={{ marginLeft: '10px' }}/>
                            <h3>Giỏ hàng</h3>
                        </CartBox>

                        <Box flexGrow={1} overflow="auto">
                            {listCart.map((p, index) => (
                                <ProductBox key={index}>
                                    <Box mr={1}>
                                        <IMG src={URL_IMG + p.avatar} />
                                    </Box>
                                    <ProductDetails>
                                        <Link textAlign="left" underline="hover" color="black" href={"/detail/"+p.seo}>
                                            {p.productName}
                                        </Link>
                                        <Detail sx={{ display: "flex", alignItems: "center" }}>
                                            {p.sizeName + " / "}
                                            <Color color={p.colorCode} />
                                        </Detail>
                                        <Detail sx={{ display: "flex", alignItems: "center" }}>
                                            <div>
                                                {p.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </div>
                                            <Box marginLeft="30px" display="flex" alignItems='center' >
                                                {'x ' + p.quantity}
                                            </Box>
                                        </Detail>
                                    </ProductDetails>
                                </ProductBox>
                            ))}
                        </Box>

                        <Button
                            sx={{ width: '100%', borderRadius: 0 }}
                            variant="contained"
                            color="primary"
                            onClick={handleCheckoutClick}
                        >
                            Đặt hàng ({totalCost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })})
                        </Button>
                    </MiniCart>
                </Drawer>
            </ThemeProvider>
        </Fragment>
    )
}

export default ShoppingCart
