import React, { useState, useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Card, Grid, Button, CircularProgress } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { AuthService } from 'app/services';
import { Notify, AlertDialog, showError} from 'app/views/action'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRegister = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
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

const JwtRegister = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const registerAccount = async (e) => {
        setLoading(true)
        AuthService.register(state).then((response) => {
            window.setTimeout(function () {
                window.location.href = '/login';
            }, 1000);
            setNotify({
                isOpen: true,
                message: '????ng k?? th??nh c??ng, vui l??ng ch???!',
                type: 'success'
            })
            
        }).catch(error => {
            setLoading(false)
            setNotify({
                isOpen: true,
                message: 'T??i kho???n ho???c email ???? t???n t???i!',
                type: 'error'
            })
        })
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    let { username, email, password, confirmPassword } = state

    return (
        <JWTRegister>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <ContentBox>
                            <IMG
                                src="/assets/images/illustrations/posting_photo.svg"
                                alt=""
                            />
                        </ContentBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Box p={4} height="100%">
                            <ValidatorForm onSubmit={registerAccount}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="T??n t??i kho???n"
                                    onChange={handleChange}
                                    type="text"
                                    name="username"
                                    value={username || ''}
                                    validators={['required']}
                                    errorMessages={['Vui l??ng nh???p t??n t??i kho???n']}
                                />
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'Vui l??ng nh???p email',
                                        'Email kh??ng h???p l???',
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="M???t kh???u"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['Vui l??ng nh???p m???t kh???u']}
                                />
                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Nh???p l???i m???t kh???u"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword || ''}
                                    validators={['required', 'isPasswordMatch']}
                                    errorMessages={[
                                        'Vui l??ng nh???p l???i m???t kh???u',
                                        "M???t kh???u nh???p l???i kh??ng ????ng",
                                    ]}
                                />
                                <FlexBox>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        type="submit"
                                    >
                                        ????ng k??
                                    </Button>
                                    {loading && (
                                        <StyledProgress
                                            size={24}
                                            className="buttonProgress"
                                        />
                                    )}
                                    <Span sx={{ mr: 1, ml: '20px' }}>Ho???c</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/login")}
                                    >
                                        ????ng nh???p
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </Box>
                    </Grid>
                    <>
                <Notify
                    notify={notify}
                    setNotify={setNotify}
                >

                </Notify>
            </>
                </Grid>
                
            </Card>
            
        </JWTRegister>
    )
}

export default JwtRegister
