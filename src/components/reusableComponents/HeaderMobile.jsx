// React Imports
import { useEffect, useMemo, useState } from "react";

// Next Imports
import { useRouter } from 'next/router';

// NPM Imports
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

// MUI Imports
import { AppBar, Box, Toolbar, Stack, IconButton, Link, Avatar, 
  Typography, InputBase, List, Drawer, colors,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, ListItemAvatar, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';

// Icons
import { MenuOutlined, ArrowLeftOutlined , MoreOutlined, ShoppingCartOutlined,
  BellOutlined, SearchOutlined, HomeOutlined, ShopOutlined, BarcodeOutlined,
  LayoutOutlined, UserOutlined, CloudUploadOutlined, SettingOutlined  } from '@ant-design/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Brightness4Sharp, Brightness5Sharp, PersonOffOutlined } from "@mui/icons-material";

// Project Imports
import { addSearchTerm } from "@/redux/features/search/searchSlice";
import { setDarkMode, setLightMode } from "@/redux/features/theme/themeSlice";
import AppBarLinearProgress from './AppBarLinearProgress'
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';
import { logOut } from "@/redux/features/auth/authSlice";


const HeaderMobile = () => {
  const searchTerm = useSelector((state) => state.search.searchTerm)
  const userProfile = useSelector((state) => state.auth.profileInfo)
  const currentLoggedInUser = useSelector((state) => state.auth.userInfo)
  const pageNavigated = useSelector((state) => state.navigation.pageChanged)
  const theme = useTheme()
  const router = useRouter()
  const dispatch = useDispatch()
  const pathName = router.pathname
  const { v, search_query } = router.query
  const pathnameLength = pathName.split("/")
  const [showSearch, setShowSearch] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mySearchTerm, setMySearchTerm] = useState(searchTerm)

  const formattedSearchTerm = mySearchTerm?.replace(/%2/g, "+")

  const updateSearchTerm = (e) => {
    if (e.key === 'Enter') {
      dispatch(pageHasChanged(true))
      router.push({pathname: `/results/`, query: { search_query: formattedSearchTerm }})
      dispatch(addSearchTerm(mySearchTerm))
    }
  }

  const updateSearchTermClick = () => {
      dispatch(pageHasChanged(true))
      router.push({pathname: `/results/`, query: { search_query: formattedSearchTerm }})
      dispatch(addSearchTerm(mySearchTerm))
  }

  useEffect(() => {
    setMySearchTerm(searchTerm)
  }, [searchTerm])


  const navItems = [
    {
      icon: <HomeOutlined style={{fontSize: 25}} />, 
      label: 'Home',
      link: '/',
      path: '/_viewport/mobile'
    },
    {
      icon: <ShopOutlined style={{fontSize: 25}} />, 
      label: 'Shop',
      link: '/shop',
      path: '/_viewport/mobile/shop'
    },
    {
      icon: <BarcodeOutlined style={{fontSize: 25}} />, 
      label: 'Events',
      link: '/events',
      path: '/_viewport/mobile/events'
    },
    // {
    //   icon: <LayoutOutlined style={{fontSize: 25}} />,
    //   label: 'Dashboard',
    //   link: '/dashboard',
    //   path: '/_viewport/mobile/dashboard'
    // },
    // {
    //   icon: <UserOutlined style={{fontSize: 25}} />,
    //   label: 'Profile',
    //   link: '/profile',
    //   path: '/_viewport/mobile/profile'
    // },
    // {
    //   icon: <CloudUploadOutlined style={{fontSize: 25}} />,
    //   label: 'Uploads',
    //   link: '/upload',
    //   path: '/_viewport/mobile/upload'
    // },
    // {
    //   icon: <SettingOutlined style={{fontSize: 25}} />,
    //   label: 'Settings',
    //   link: '/settings',
    //   path: '/_viewport/mobile/settings'
    // },
  ]


  // More Icon Menu
  const [anchorEl, setAnchorEl] = useState(null);
    const openNavMenu = Boolean(anchorEl);
    const handleClickNavMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
      setAnchorEl(null);
    };


    // Dark Mode
   const [cookie, setCookie] = useCookies(["Mode"])
   const is_darkMode = useSelector((state) => state.theme.isDarkMode)
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
   
   const handleSetDarkMode = () => {
     dispatch(setDarkMode("dark"))
     setCookie("LightMode", "dark", {
       path: "/",
       maxAge: 3600 * 24 * 365, // Expires after 1yr
       sameSite: true,
       domain: process.env.COOKIE_DOMAIN
     })
   }
   const handleSetLightMode = () => { 
     dispatch(setLightMode("light"))
     setCookie("LightMode", "light", {
       path: "/",
       maxAge: 3600 * 24 * 365, // Expires after 1yr
       sameSite: true,
       domain: process.env.COOKIE_DOMAIN
     })
   }

    //  Logout
  const handleLogout = () => {
    dispatch(logOut())
    fetch("api/logout", {
      method: 'POST',
      body: JSON.stringify({ refreshToken: '' }),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  });
  }


  // Login/Register
  const handleLoginRegister = () => {
    dispatch(pageHasChanged(true))
    router.push({ pathname: '/account/login' })
  }


  
   const handleNavigateToProfile = () => {
    dispatch(pageHasChanged(true))
    router.push("/account/profile")
  }
  const handleNavigateToProfileSettings = () => {
    dispatch(pageHasChanged(true))
    router.push("/account/profile/settings")
  }

const navMenuItems = useMemo(() => [
{
primaryText: currentLoggedInUser ? currentLoggedInUser?.stage_name : "User not logged in",
secondaryText: currentLoggedInUser ? currentLoggedInUser?.role : "---",
icon: currentLoggedInUser ? <Person2OutlinedIcon /> :  <PersonOffOutlined/>,
onClick: handleNavigateToProfile
},
{
primaryText: "Appearance",
secondaryText: is_darkMode === "dark" ? "Light Mode" : "Dark Mode",
icon: is_darkMode === "dark" ? <Brightness5Sharp/> : <Brightness4Sharp/>,
onClick: is_darkMode === "dark" ? handleSetLightMode : handleSetDarkMode
},
],[currentLoggedInUser, is_darkMode])

const navMenuItems2 = useMemo(() => [
{
primaryText: "Profile",
secondaryText: "Settings",
icon: <SettingsApplicationsOutlinedIcon/>,
onClick: handleNavigateToProfileSettings
},
// {
//   primaryText: "User",
//   secondaryText: "Settings",
//   icon: <ManageAccountsOutlinedIcon/>,
//   onClick: () => router.push("/")
// },
{
primaryText: "Dukaflani Accounts",
secondaryText: currentLoggedInUser ? "Logout" : "Login/Register",
icon: currentLoggedInUser ? <LogoutOutlinedIcon/> : <LoginOutlinedIcon/>,
onClick: currentLoggedInUser ? handleLogout : handleLoginRegister
},
],[currentLoggedInUser])



// Navigation
useEffect(() => {
  dispatch(pageHasChanged(false))
}, [pathName, v, search_query])


  return (
    <>
      <AppBar color='inherit' elevation={1}>
      {pageNavigated && <AppBarLinearProgress  darkMode={is_darkMode}  prefersDarkMode={prefersDarkMode}   />}
        <Toolbar variant="dense">
          {showSearch ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: '100%'}} >
            <IconButton onClick={() => setShowSearch(false)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <ArrowLeftOutlined  style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]  }} />
            </IconButton>
            <Box sx={{flex: 1,}}>
              <InputBase 
                  autoComplete="true" 
                  autoFocus 
                  fullWidth 
                  id="standard-basic" 
                  placeholder="Search Dukaflani" 
                  variant="standard" 
                  value={mySearchTerm}
                  onChange={(e) => setMySearchTerm(e.target.value)}
                  onKeyDown={updateSearchTerm}
                  />
            </Box>
            <IconButton onClick={updateSearchTermClick} edge="start" color="inherit" aria-label="menu" sx={{ ml: 1 }}>
                <SearchOutlined  style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]  }} />
            </IconButton>

          </Box>
          :
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: '100%'}} >
            <IconButton onClick={() => setDrawerOpen(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <MenuOutlined style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]  }} />
            </IconButton>
            <Link 
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(pageHasChanged(true))
                  router.push({ pathname: '/' })
                  setTimeout(() => {
                    dispatch(pageHasChanged(false))
                  }, 5000)
                }}
                title='Dukaflani Home'>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                  <img style={{height: 25}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
                </Box>
              </Link>
              <Stack direction='row' spacing={0.5} sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <IconButton onClick={() => setShowSearch(true)} edge="start" color="inherit" aria-label="search">
                  <SearchOutlined  style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]  }} />
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="notifications">
                  <BellOutlined style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]  }} />
              </IconButton>
                <IconButton edge="start" color="inherit" aria-label="shopping cart">
                  <ShoppingCartOutlined style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]  }} />
              </IconButton>
              <Avatar sx={{ width: 24, height: 24 }} src={userProfile?.profile_avatar} alt={`${userProfile?.first_name} ${userProfile?.last_name}`}/>
              <IconButton
                   id="basic-button"
                   edge="start" 
                   color="inherit" 
                   aria-label="more" 
                   sx={{marginRight: 1}}
                   aria-controls={openNavMenu ? 'basic-menu' : undefined}
                   aria-haspopup="true"
                   aria-expanded={openNavMenu ? 'true' : undefined}
                   onClick={handleClickNavMenu} 
                   >
                  <MoreVertIcon fontSize="small" sx={{ color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]  }} />
                </IconButton>
                {/* Video Options Menu */}
                <Menu
                 id="basic-menu"
                 anchorEl={anchorEl}
                 open={openNavMenu}
                 onClose={handleCloseNavMenu}
                 MenuListProps={{
                   'aria-labelledby': 'basic-button',
                 }}
                 PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                 anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {navMenuItems?.map((navMenuItem, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                        <ListItem onClick={navMenuItem.onClick} disableGutters>
                          <ListItemAvatar>
                            <Avatar>
                              {navMenuItem.icon}
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={navMenuItem.primaryText} secondary={navMenuItem.secondaryText} />
                          </ListItem>
                      </MenuItem>
                      ))}
                      <MenuItem onClick={handleCloseNavMenu}>
                          <Link href='https://hub.dukaflani.com' underline='none' target="_blank" rel="noopener">
                            <ListItem disableGutters>
                                <ListItemAvatar>
                                  <Avatar>
                                    <DashboardOutlinedIcon/>
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Creator's Hub!" secondary="Dashboard" />
                              </ListItem>
                          </Link>
                      </MenuItem>
                      {navMenuItems2?.map((navMenuItem, index) => (
                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                            <ListItem key={index} onClick={navMenuItem.onClick} disableGutters>
                              <ListItemAvatar>
                                <Avatar>
                                  {navMenuItem.icon}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={navMenuItem.primaryText} secondary={navMenuItem.secondaryText} />
                            </ListItem>
                        </MenuItem>
                      ))}
                </Menu>

              </Stack>
          </Box>}
        </Toolbar>
      </AppBar>

      <Drawer 
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <div style={{minWidth: 250, minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
              <Toolbar variant="dense" sx={{width: '100%'}}>
                <IconButton onClick={() => setDrawerOpen(false)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                  <MenuOutlined style={{ fontSize: 16, color: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[100] : is_darkMode === "light" && prefersDarkMode === true ? colors.grey[800] : colors.grey[800]  }} />
                </IconButton>
                <Link 
                  onClick={(e) => {
                    e.preventDefault()
                    router.push({ pathname: '/' })
                  }}
                  title='Dukaflani Home'>
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                    <img style={{height: 25}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
                  </Box>
                </Link>
              </Toolbar>
              <Box sx={{paddingTop: 1, flexGrow: 1}}>
                <nav>
                  <List>
                  {navItems.map((navItem, i) => (
                    <ListItem key={i} disablePadding>
                      <ListItemButton
                        selected={pathName === navItem.path}
                        onClick={() =>{ 
                          dispatch(pageHasChanged(true))
                          router.push({ pathname: navItem.link });
                          setDrawerOpen(false);
                        }}
                      >
                        <ListItemIcon>
                          {navItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={navItem.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  </List>
                </nav>
              </Box>
              <Stack sx={{paddingX: 2}} direction="row" spacing={2}>
                <Typography sx={{cursor: 'pointer'}} onClick={() => {
                  setDrawerOpen(false);
                  dispatch(pageHasChanged(true))
                  router.push({ pathname: '/links/contact_us' })
                  }} variant='subtitle2'>Contuct us</Typography>
                <Typography sx={{cursor: 'pointer'}} onClick={() => {
                  setDrawerOpen(false);
                  dispatch(pageHasChanged(true))
                  router.push({ pathname: '/legal/terms_and_conditions' })
                  }} variant='subtitle2'>Terms</Typography>
              </Stack>
              <Box sx={{paddingX: 2}}>
                <Typography variant='caption'>&copy; {new Date().getFullYear()} Jidraff Gathura</Typography>
              </Box>
          </div>
        </Drawer>
    </>
  )
}

export default HeaderMobile