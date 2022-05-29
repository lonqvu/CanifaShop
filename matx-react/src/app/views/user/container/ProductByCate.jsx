import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CardProduct, Container, TextField } from '../base'
import {
    Grid,
    styled,
    Box,
    Card,
    InputBase,
    Pagination,
    Stack,
    Autocomplete,
} from '@mui/material'
import { ValidatorForm } from 'react-material-ui-form-validator'
import SearchIcon from '@mui/icons-material/Search'
import { ProductService, CategoryService } from 'app/services'
import { width } from '@mui/system'

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: '200px',
    color: '#000',
}))

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ccc',
    backgroundColor: 'white',
    marginLeft: 0,
    width: '100%',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        width: '120%',
    },
}))

const AppUser = () => {
    const navigate = useNavigate()
    const [content, setContent] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState()

    const [search, setSearch] = useState('')

    const { categorySeo } = useParams()
    const [subCategory, setSubCategory] = useState([])
    const [check, setCheck] = useState(false)

    const handleChangePage = (event, value) => {
        if (check) {
            setPage(value - 1)
            getDataByCategorySeo(categorySeo, value - 1)
        } else {
            setPage(value - 1)
            getDataBySearch(value - 1, search)
        }
    }

    const handleChangeSearch = (event) => {
        const search = event.target.value
        setSearch(search)
        getDataBySearch(page, search)
    }

    const getDataBySearch = (page, search) => {
        // const data = { search: -1 }
        const data = { search: -1, priceMin: -1, priceMax: -1, categoryId: -1 }
        if (search) data.search = search

        ProductService.getAllProductsBySearch(
            page,
            data.search,
            data.priceMin,
            data.priceMax,
            data.categoryId
        )
            .then((response) => {
                const data = response.data
                setContent(data.content)
                setPage(data.page)
                setTotalPages(data.totalPages)
                setCheck(false)
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getDataByCategorySeo = (seo, page) => {
        CategoryService.getProductsByCategory(seo, page)
            .then((response) => {
                const data = response.data
                setContent(data.content)
                setPage(data.page)
                setTotalPages(data.totalPages)
                setCheck(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getSubCategory = (seo) => {
        CategoryService.getSubCategory(seo)
            .then((response) => {
                setSubCategory(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getDataByCategorySeo(categorySeo, page)
        getSubCategory(categorySeo)
    }, [useParams()])

    return (
        <Container >
            
            <Grid
                container
                maxWidth="1300px"
                margin="auto"
                spacing={2}
                paddingBottom={7.5}
                paddingTop={2}
            >
                <Grid item xs={12}>
                <Stack justifyContent="end" >
            <ValidatorForm onSubmit={() => null} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Search sx={{ marginBottom: '10px', width: "200px"}}>
                            <SearchIconWrapper>
                               
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Từ khóa…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleChangeSearch}
                            />
                        </Search>
                    </Grid>
                </Grid>
            </ValidatorForm>
            </Stack>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid
                            container
                            spacing={1.5}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {content.map((product) => (
                                <Grid
                                    key={product.seo}
                                    item
                                    xs={2}
                                    sm={4}
                                    md={4}
                                >
                                    <CardProduct data={product} />
                                </Grid>
                            ))}
                        </Grid>
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
                </Grid>
            </Grid>
        </Container>
    )
}

export default AppUser
