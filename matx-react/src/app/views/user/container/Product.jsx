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
    Autocomplete
} from '@mui/material'
import { ValidatorForm } from 'react-material-ui-form-validator'
import SearchIcon from '@mui/icons-material/Search';
import { ProductService, CategoryService } from 'app/services'


const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: '200px',
    color: '#000',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #ccc',
    backgroundColor: 'white',
    marginLeft: 0,
    width: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        width: '120%'
    },
}));

const AppUser = () => {
    const navigate = useNavigate()
    const [content, setContent] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState()


    const [search, setSearch] = useState('')
    const [priceMin, setPriceMin] = useState()
    const [priceMax, setPriceMax] = useState()
    const [category, setCategory] = useState()


    const { categorySeo } = useParams();
    const [subCategory, setSubCategory] = useState([])
    const [check, setCheck] = useState(false)

    const handleChangePage = (event, value) => {
        if (check) {
            setPage(value - 1)
            getDataByCategorySeo(categorySeo, value - 1)
        } else {
            setPage(value - 1)
            getDataBySearch(value - 1, search, priceMin, priceMax, category)
        }
    };

    const handleChangeSearch = (event) => {
        const search = event.target.value
        setSearch(search)
        getDataBySearch(page, search, priceMin, priceMax, category)
    }

    const handleChangePriceMin = (event) => {
        const priceMin = event.target.value
        setPriceMin(priceMin)
        getDataBySearch(page, search, priceMin, priceMax, category)
    }

    const handleChangePriceMax = (event) => {
        const priceMax = event.target.value
        setPriceMax(priceMax)
        getDataBySearch(page, search, priceMin, priceMax, category)
    }

    const handleChangeCategory = (category) => {
        setCategory(category)
        getDataBySearch(page, search, priceMin, priceMax, category)

    }

    const getDataBySearch = (page, search, priceMin, priceMax, category) => {

        const data = { search: -1, priceMin: -1, priceMax: -1, categoryId: -1 }

        if (search) data.search = search
        if (priceMin) data.priceMin = priceMin
        if (priceMax) data.priceMax = priceMax
        if (category) data.categoryId = category.id

        ProductService.getAllProductsBySearch(page, data.search, data.priceMin, data.priceMax, data.categoryId).then((response) => {
            const data = response.data
            setContent(data.content)
            setPage(data.page)
            setTotalPages(data.totalPages)
            setCheck(false)
        }).catch(error => {
            console.log(error)
        })
    }

    const getDataByCategorySeo = (seo, page) => {
        CategoryService.getProductsByCategory(seo, page).then((response) => {
            const data = response.data
            setContent(data.content)
            setPage(data.page)
            setTotalPages(data.totalPages)
            setCheck(true)
        }).catch(error => {
            console.log(error)
        })
    }

    const getSubCategory = (seo) => {
        CategoryService.getSubCategory(seo).then((response) => {
            setSubCategory(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getDataByCategorySeo(categorySeo, page)
        getSubCategory(categorySeo)
    }, [useParams()])

    return (
        <Container>
            <Grid container maxWidth='1300px' margin='auto' spacing={2} paddingBottom={7.5} paddingTop={2}>
                <Grid item xs={3}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1.2} columns={{ xs: 12, sm: 0, md: 0 }}>
                            <Grid item xs={12} sm={0} md={0}>
                                <Item>
                                    <ValidatorForm onSubmit={() => null} onError={() => null}>
                                        <Grid container spacing={6}>
                                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                                <Search sx={{ marginBottom: "10px" }}>
                                                    <SearchIconWrapper>
                                                        <SearchIcon />
                                                    </SearchIconWrapper>
                                                    <StyledInputBase
                                                        placeholder="Từ khóa…"
                                                        inputProps={{ 'aria-label': 'search' }}
                                                        onChange={handleChangeSearch}
                                                    />
                                                </Search>
                                                <Autocomplete
                                                    disablePortal
                                                    size='small'
                                                    options={subCategory}
                                                    getOptionLabel={(subCategory) => subCategory.name}
                                                    onChange={(event, subCategory) => { handleChangeCategory(subCategory) }}
                                                    sx={{ width: '100%' }}
                                                    value={category}
                                                    renderInput={(params) => <TextField {...params} label="Chọn danh mục con" />}
                                                />
                                                <TextField
                                                    size='small'
                                                    type="number"
                                                    name="priceMin"
                                                    onChange={(e) => handleChangePriceMin(e)}
                                                    value={priceMin}
                                                    label="Giá bắt đầu"
                                                />
                                                <TextField
                                                    size='small'
                                                    type="number"
                                                    name="priceMax"
                                                    onChange={(e) => handleChangePriceMax(e)}
                                                    value={priceMax}
                                                    label="Giá kết thúc"
                                                />
                                            </Grid>
                                        </Grid>
                                    </ValidatorForm>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1.5} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {content.map((product) => (
                                <Grid key={product.seo} item xs={2} sm={4} md={4}>
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