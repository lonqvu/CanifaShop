import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Card, Grid, Button, CircularProgress } from '@mui/material'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { AuthService } from 'app/services';
import { Notify, AlertDialog, showError} from 'app/views/action'

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

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
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

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({})
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = () => {
        AuthService.resetPassword(state.email).then((response) => {
            setNotify({
                isOpen: true,
                message: 'Cấp lại mật khẩu thành công, vui lòng kiểm tra email!',
                type: 'success'
            })
        }).catch(error => {
            setLoading(false)
            setNotify({
                isOpen: true,
                message: 'Email không tồn tại!',
                type: 'error'
            })
        })
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    let { email } = state

    return (
        <ForgotPasswordRoot>
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
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    label="Email"
                                    onChange={handleChange}
                                    name="email"
                                    size="small"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'Vui lòng nhập email',
                                        'Email không đúng định dạng',
                                    ]}
                                />
                                <FlexBox>
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Lấy mật khẩu
                                        </Button>
                                        {loading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                    <Span sx={{ mr: 1, ml: '16px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Đăng nhập
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
                <>
                <Notify
                    notify={notify}
                    setNotify={setNotify}
                >

                </Notify>
            </>
            </Card>
            
        </ForgotPasswordRoot>
        
    )
}

export default ForgotPassword
