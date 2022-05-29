import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SimpleCard } from 'app/components'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {
    Grid,
    styled,
    Card,
    Button,
    Autocomplete,
    Checkbox,
    Label,
    DialogTitle,
} from '@mui/material'
import {
    Container,
    ButtonForm,
    TextField,
    BreadcrumbCustom,
} from '../../admin/base'
import { UserAddressService } from 'app/services'
import Notify from 'app/views/action/Notify'
import dataVietNam from 'app/db/db.vietnam.json'

const AppForm = () => {
    const [name, setName] = useState('')
    // const { username } = useParams();
    const navigate = useNavigate()
    const { id } = useParams()
    const listCity = dataVietNam.city
    const [listDistrict, setListDistrict] = useState(dataVietNam.district[0])
    const [listWard, setListWard] = useState([])
    const [city, setCity] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const [detailAddress, setDetailAddress] = useState()
    const [phone, setPhone] = useState()
    const [detail, setDetail] = useState()
    const [stateAddress, setStateAddress] = useState('Vui lòng nhập đia chỉ')
    const [isDefault, setIsDefault] = useState(false)
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })

    const setAddress = (city, district, ward) => {
        if (city) {
            setListDistrict(
                dataVietNam.district.filter((d) => d.idCity === city.idCity)
            )
            setCity(city.name)
        }
        if (district) {
            setListWard(
                dataVietNam.ward.filter(
                    (w) => w.idDistrict === district.idDistrict
                )
            )
            setDistrict(district.name)
        }
        if (ward) {
            setWard(ward.name)
        }
    }

    const createOrUpdate = (e) => {
        e.preventDefault()
        const address = {
            city,
            district,
            ward,
            detail,
            phone,
            isDefault,
            userName: id,
        }

        UserAddressService.updateAddress(address, id)
            .then((response) => {
                window.setTimeout(function () {
                    navigate(-1)
                }, 1000)
                setNotify({
                    isOpen: true,
                    message: 'Cập nhật thành công!',
                    type: 'success',
                })
            })
            .catch((error) => {
                console.log(error)
                setNotify({
                    isOpen: true,
                    message: 'Cập nhật thất bại!',
                    type: 'error',
                })
            })
    }

    useEffect(() => {}, [])

    return (
        <Container>
            <div className="breadcrumb">
                <BreadcrumbCustom id={id} name="Danh mục" />
            </div>
            <SimpleCard title={'Địa chỉ'}>
                <div>
                    <ValidatorForm
                        onSubmit={createOrUpdate}
                        onError={() => null}
                    >
                        <Grid container spacing={6}>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 2 }}
                            >
                                <Autocomplete
                                    disablePortal
                                    options={listCity}
                                    getOptionLabel={(listCity) => listCity.name}
                                    onChange={(event, city) => {
                                        setAddress(city, null, null)
                                    }}
                                    value={city}
                                    sx={{
                                        width: '100%',
                                        marginTop: '16px',
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tỉnh/Thành phố"
                                        />
                                    )}
                                />
                                <Autocomplete
                                    disablePortal
                                    options={listDistrict}
                                    getOptionLabel={(listDistrict) =>
                                        listDistrict.name
                                    }
                                    onChange={(event, district) => {
                                        setAddress(null, district, null)
                                    }}
                                    value={district}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Quận/Huyện"
                                        />
                                    )}
                                />
                                <Autocomplete
                                    disablePortal
                                    options={listWard}
                                    getOptionLabel={(listWard) => listWard.name}
                                    onChange={(event, ward) => {
                                        setAddress(null, null, ward)
                                    }}
                                    value={ward}
                                    sx={{ width: '100%' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Phường/Xã"
                                        />
                                    )}
                                />
                                <TextField
                                    type="text"
                                    value={detailAddress}
                                    onChange={(e) => {
                                        setDetail(e.target.value)
                                    }}
                                    name="detailAddress"
                                    label="Địa chỉ"
                                />
                                <TextField
                                    type="text"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                    }}
                                    name="phone"
                                    label="Số điện thoại nhận hàng"
                                />
                            </Grid>
                        </Grid>
                        <ButtonForm id={id} />
                    </ValidatorForm>
                </div>
            </SimpleCard>
            <>
                <Notify notify={notify} setNotify={setNotify}></Notify>
            </>
        </Container>
    )
}
export default AppForm
