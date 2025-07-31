'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';

const menuItemMyReviews = 'Mis reseñas';
const menuItemMyProfile = 'Mi perfil';
const menuItemLogOut = 'Cerrar sesión';
const menuItemsSettings = [
    {
        label: menuItemMyReviews,
        onClickRedirectPath: '/my-reviews',
    },

        {
        label: menuItemMyProfile,
        onClickRedirectPath: '/my-profile',
    },

    {
        label: menuItemLogOut,
        onClickRedirectPath: '/',
    },
]

export function Header() {
    const accessToken = localStorage.getItem('access_token');
    const isLoggedIn = !!accessToken;
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const router = useRouter();

    const handleOnClick = (path: string, label?: string) => (() => {
        if (label === menuItemLogOut){
            localStorage.removeItem('access_token');
        }
        handleCloseNavMenu();
        handleCloseUserMenu();
        router.push(path);
    });

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FOMES
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuItem key='Escribe tu reseña' onClick={handleOnClick('/new-review')}>
                                <Typography sx={{ textAlign: 'center' }}>Escribe tu reseña</Typography>
                            </MenuItem>

                            {!isLoggedIn && <MenuItem key='Iniciar sesión' onClick={handleOnClick('/login')}>
                                <Typography sx={{ textAlign: 'center' }}>Iniciar sesión</Typography>
                            </MenuItem>}

                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FOMES
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end', marginRight: '20px', gap: '20px' }}>
                        <Button
                            key='Escribe tu reseña'
                            onClick={handleOnClick("/new-review")}
                            sx={{ my: 2, color: 'white', backgroundColor: '#2E7D32', display: 'block' }}
                            variant='contained'
                        >
                            Escribe tu reseña
                        </Button>
                        {!isLoggedIn && <Button
                            key='Iniciar sesión'
                            onClick={handleOnClick("/login")}
                            sx={{ my: 2, color: 'white', backgroundColor: '#2E7D32', display: 'block' }}
                            variant='contained'
                        >
                            Iniciar sesión
                        </Button>}
                    </Box>
                    {isLoggedIn && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {menuItemsSettings.map((setting) => (
                                <MenuItem key={setting.label} onClick={handleOnClick(setting.onClickRedirectPath, setting.label)}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}


