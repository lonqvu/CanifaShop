import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Card, Grid, Button, CircularProgress } from '@mui/material'
import { Span } from 'app/components/Typography'
import { AuthService, localStorageService } from 'app/services'
import { Notify, AlertDialog, showError } from 'app/views/action'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

const JwtLogin = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    })
    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const signinAccount = async (e) => {
        setLoading(true)

        AuthService.login(state)
            .then((response) => {
                localStorageService.setItem('accessToken', response.data.data)
                let jwt = response.data.data
                let jwtData = jwt.split('.')[1]
                let decodedJwtJsonData = window.atob(jwtData)
                let decodedJwtData = JSON.parse(decodedJwtJsonData)
                let isAdmin = decodedJwtData.roles[0]
                if(isAdmin == 'ROLE_ADMIN'){
                    window.setTimeout(function () {
                        window.location.href = '/admin'
                    }, 1000)
                    setNotify({
                        isOpen: true,
                        message: '????ng nh???p v???i t?? c??ch ng?????i qu???n tr???!',
                        type: 'success',
                    })
                }

                else if(isAdmin == 'ROLE_STAFF'){
                    window.setTimeout(function () {
                        window.location.href = '/staff'
                    }, 1000)
                    setNotify({
                        isOpen: true,
                        message: '????ng nh???p v???i t?? c??ch nh??n vi??n!',
                        type: 'success',
                    })
                }
               
                else{
                    window.setTimeout(function () {
                        window.location.href = '/'
                    }, 1000)
                    setNotify({
                        isOpen: true,
                        message: '????ng nh???p th??nh c??ng!',
                        type: 'success',
                    })
                }
            })
            .catch((error) => {
                setLoading(false)
                setNotify({
                    isOpen: true,
                    message: 'Sai ng??????i du??ng ho???c m???t kh???u',
                    type: 'error',
                })
            })
        setNotify({
            ...notify,
            isOpen: false,
        })
    }

    const { palette } = useTheme()
    const textPrimary = palette.primary.main

    let { username, password } = state

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            <ValidatorForm onSubmit={signinAccount}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="T??n t??i kho???n"
                                    onChange={handleChange}
                                    type="text"
                                    name="username"
                                    value={username}
                                    validators={['required']}
                                    errorMessages={['Vui l??ng nh???p t??n t??i kho???n']}
                                />
                                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    label="M???t kh???u"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password}
                                    validators={['required']}
                                    errorMessages={['Vui l??ng nh???p m???t kh???u']}
                                />

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            ????ng nh???p
                                        </Button>
                                        {loading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                    <Span sx={{ mr: 1, ml: '20px' }}>Ho???c</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate('/register')}
                                    >
                                        ????ng k??
                                    </Button>
                                </FlexBox>
                                <Button
                                    sx={{ color: textPrimary }}
                                    onClick={() => navigate('/forgot-password')}
                                >
                                    Qu??n m???t kh???u?
                                </Button>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
                <>
                    <Notify notify={notify} setNotify={setNotify}></Notify>
                </>
            </Card>
        </JWTRoot>
    )
}

export default JwtLogin
