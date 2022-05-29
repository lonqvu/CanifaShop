import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SimpleCard } from 'app/components'
import { ValidatorForm } from 'react-material-ui-form-validator'
import Autocomplete from '@mui/material/Autocomplete'
import { Grid } from '@mui/material'
import { Container, ButtonForm, TextField, BreadcrumbCustom } from '../../base'
import { CategoryService, UserService } from 'app/services'
import Notify from 'app/views/action/Notify'

const AppForm = () => {
    const [parent, setParent] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })
    const [listRole, setListRole] = useState([])

    const getNameRole = () => {
        UserService.getNameRole().then((response) => {
            setListRole(response.data.data)
        })
    }
    const getRoleByUserId = () => {
        UserService.getRoleByUserId(id).then((response) => {
            setParent(response.data.data)
        })
    }
    const createOrUpdate = (e) => {
        e.preventDefault()
        UserService.updateRole(id, parent)
            .then((response) => {
                window.setTimeout(function () {
                   navigate(-1)
                }, 1000)
                setNotify({
                    isOpen: true,
                    message: 'Cập nhật thành công, vui lòng chờ!',
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
  
   

    useEffect(() => {
        getNameRole()
        getRoleByUserId()
    }, [])
    return (
        <Container>
            <div className="breadcrumb">
                <BreadcrumbCustom id={id} name="Danh mục" />
            </div>
            <SimpleCard title={'Phân quyền'}>
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
                                    options={listRole}
                                    onChange={(event, listRole) => {
                                        setParent(listRole)
                                    }}
                                    sx={{ width: '100%' }}
                                    value={parent}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Danh mục cha"
                                        />
                                    )}
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
