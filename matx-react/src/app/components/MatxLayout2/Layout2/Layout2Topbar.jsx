import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSettings from 'app/hooks/useSettings'
import { styled, useTheme, Box } from '@mui/system'
import { Span } from '../../Typography'
import { MatxMenu } from 'app/components'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import {
    Icon,
    IconButton,
    MenuItem,
    Avatar,
    useMediaQuery,
    Hidden,
} from '@mui/material'
import { localStorageService, AuthService } from 'app/services'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { topBarHeight } from 'app/utils/constant'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,
}))

const TopbarRoot = styled('div')(({ theme }) => ({
    top: 0,
    zIndex: 96,
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[8],
    height: topBarHeight,
}))

const TopbarContainer = styled(Box)(({ theme }) => ({
    padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
    },
}))

const UserMenu = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 24,
    padding: 4,
    '& span': {
        margin: '0 8px',
    },
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': {
        marginRight: '10px',
        color: theme.palette.text.primary,
    },
}))


const Layout1Topbar = () => {
    const theme = useTheme()
    const { settings, updateSettings } = useSettings()
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))

    const navigate = useNavigate()
    const [auth, setAuth] = useState({})

    const logOut = () => {
        localStorageService.setItem('accessToken', null)
        navigate('/login')
    }

    useEffect(() => {
        AuthService.infor().then((response) => {
            const data = response.data.data
            const user = { id: data.id, username: data.username }
            setAuth(user)
        }).catch(error => {
            const response = error.response
            if (response.status === 401 && (response.data.message === "Access is denied")) {
                localStorageService.setItem('accessToken', null)
                navigate('/login')
            }
            navigate('/login')
        })
    }, [])

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode
        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'compact'
                    ? 'mobile'
                    : 'compact'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'compact' : 'full'
        }
        updateSidebarMode({ mode })
    }

    return (
        <TopbarRoot>
            <TopbarContainer>
                <Box display="flex">
                    <StyledIconButton onClick={handleSidebarToggle}>
                        <Icon>menu</Icon>
                    </StyledIconButton>
                </Box>
                <Box display="flex" alignItems="center">
                    <MatxMenu
                        menuButton={
                            <UserMenu>
                                <AccountCircleIcon />
                                <Hidden xsDown>
                                    <Span>
                                        Xin chào <strong>{auth.username}</strong>
                                    </Span>
                                </Hidden>
                            </UserMenu>
                        }
                    >
                        <StyledItem onClick={logOut}>
                            <Icon> power_settings_new </Icon>
                            <Span> Đăng xuất </Span>
                        </StyledItem>
                    </MatxMenu>
                </Box>
            </TopbarContainer>
        </TopbarRoot>
    )
}

export default React.memo(Layout1Topbar)
