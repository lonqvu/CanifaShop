import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardProduct, Container } from '../base'
import Carousel from 'react-elastic-carousel'
import { Grid, Paper, styled, Box, CardMedia } from '@mui/material'
import { ProductService, URL_IMG, CategoryService } from 'app/services'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: '200px',
    color: '#000',
}))

const AppUser = () => {
    const navigate = useNavigate()
    const [listProducts, setListProducts] = useState([])
    const [listProductsCate, setListProductsCate] = useState([])
    const [listProductsBoy, setListProductsBoy] = useState([])
    const [seo, setSeo] = useState('')
    const [avatar, setAvatar] = useState('')
    const getData = () => {
        ProductService.getAllProductsHot()
            .then((response) => {
                setListProducts(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
        ProductService.getAllProductsByCate(4)
            .then((response) => {
                setListProductsCate(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getCateWomen = () => {
        CategoryService.getCategoryParentWomen().then((response) => {
            setSeo(response.data.data[1].seo)
            setAvatar(response.data.data[1].avatar)
        })
    }
    const getCateBoy = () => {
        ProductService.getProductsParentBoy().then((response) => {
            setListProductsBoy(response.data.data)
        })
    }
    useEffect(() => {
        getData()
        getCateBoy()
        getCateWomen()
    }, [])
    const breakPoints = [
        { width: 600, itemsToShow: 1 },
        { width: 600, itemsToShow: 2 },
        { width: 600, itemsToShow: 3 },
        { width: 600, itemsToShow: 4 },
        { width: 600, itemsToShow: 4 },
    ]
    return (
        <Container>
            <Grid
                container
                maxWidth="98%"
                margin="auto"
                spacing={2}
                paddingBottom={7.5}
                border="none"
            >
                <Grid item xs={12}>
                    <Item sx={{ flexGrow: 1, border: 'none' }} height="300px">
                        <img
                            src="assets/images/banner_name_tablet1647252505.png"
                            width="100%"
                            onClick={() => navigate('/category/nam')}
                        ></img>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <label
                            style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                opacity: '90%',
                            }}
                        >
                            SẢN PHẨM HOT
                        </label>
                        <Grid
                            container
                            spacing={1.5}
                            columns={{ xs: 6, sm: 8, md: 12 }}
                        >
                            <Grid item xs={2.5} sm={2.5} md={2.5}>
                                <img
                                    src="https://media.canifa.com/Simiconnector/list_image_tablet_third1649392540.png"
                                    width="100%"
                                ></img>
                            </Grid>
                            <Grid
                                item
                                xs={9.5}
                                sm={9.5}
                                md={9.5}
                                style={{ width: '1200px' }}
                            >
                                <Carousel breakPoints={breakPoints}>
                                    {listProducts.map((product) => (
                                        <CardProduct data={product} />
                                    ))}
                                </Carousel>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                <label
                            style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                opacity: '90%',
                            }}
                        >
                            ÁO SƠ MI NỮ
                        </label>
                    <Item sx={{ flexGrow: 1, border: 'none' }} height="300px">
                        <img
                            src={URL_IMG + avatar}
                            width="100%"
                            onClick={() => navigate('/categoryBy/' + seo)}
                        ></img>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ flexGrow: 1 }}>
                        <label
                            style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                opacity: '90%',
                            }}
                        >
                            DÀNH CHO BÉ
                        </label>
                        <Grid
                            container
                            spacing={1.5}
                            columns={{ xs: 6, sm: 8, md: 12 }}
                        >
                            <Grid item xs={2.5} sm={2.5} md={2.5}>
                                <img
                                    src="https://media.canifa.com/Simiconnector/list_image_tablet1650513265.png"
                                    width="100%"
                                    onClick={() => navigate('/categoryBy/be-trai')}
                                ></img>
                            </Grid>
                            <Grid
                                item
                                xs={9.5}
                                sm={9.5}
                                md={9.5}
                                style={{ width: '1200px' }}
                            >
                                <Carousel breakPoints={breakPoints}>
                                    {listProductsBoy.map((product) => (
                                        <CardProduct data={product} />
                                    ))}
                                </Carousel>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AppUser
