// React imports
import { useEffect, useState } from 'react'

// Next Imports
import { useRouter } from 'next/router';
import Image from "next/legacy/image";

// Mui Imports
import { Box, Tabs, Tab, AppBar, Toolbar, IconButton, Stack, Avatar, 
  InputBase, Tooltip, Link, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { styled, alpha, useTheme } from '@mui/material/styles';

// NPM Import
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from 'react-redux';

// Icons
import { MenuOutlined, ShoppingCartOutlined, BellOutlined,
   SearchOutlined, HomeFilled, ShopFilled, BarcodeOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// Project Imports
import { addSearchTerm, deleteSearchTerm } from '@/redux/features/search/searchSlice';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.10),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.20),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));








const HeaderDesktop = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
  const searchTerm = useSelector((state) => state.search.searchTerm)
  const userProfile = useSelector((state) => state.auth.profileInfo)
  const theme = useTheme()
  const router = useRouter()
  const pathName = router.pathname
  const pathnameLength = pathName.split("/")
  const [mySearchTerm, setMySearchTerm] = useState(searchTerm)
  const [showTabs, setShowTabs] = useState(true)
  
  const [drawerOpen, setDrawerOpen] = useState(false)

  const dispatch = useDispatch()
  const formattedSearchTerm = mySearchTerm?.replace(/%2/g, "+")

  const updateSearchTerm = (e) => {
    if (e.key === 'Enter') {
      router.push({pathname: `/results/`, query: { search_query: formattedSearchTerm }})
      dispatch(addSearchTerm(mySearchTerm))
    }
  }

  useEffect(() => {
    setMySearchTerm(searchTerm)
  }, [searchTerm])
  

  const navItems = [
    {
      icon: <HomeOutlined style={{fontSize: 25}} />, 
      label: 'Home',
      link: '/',
      path: '/_viewport/desktop'
    },
    {
      icon: <ShopOutlined style={{fontSize: 25}} />, 
      label: 'Shop',
      link: '/shop',
      path: '/_viewport/desktop/shop'
    },
    {
      icon: <BarcodeOutlined style={{fontSize: 25}} />, 
      label: 'Events',
      link: '/events',
      path: '/_viewport/desktop/events'
    },
    // {
    //   icon: <LayoutOutlined style={{fontSize: 25}} />,
    //   label: 'Dashboard',
    //   link: '/dashboard',
    //   path: '/_viewport/desktop/dashboard'
    // },
    // {
    //   icon: <UserOutlined style={{fontSize: 25}} />,
    //   label: 'Profile',
    //   link: '/profile',
    //   path: '/_viewport/desktop/profile'
    // },
    // {
    //   icon: <CloudUploadOutlined style={{fontSize: 25}} />,
    //   label: 'Uploads',
    //   link: '/upload',
    //   path: '/_viewport/desktop/upload'
    // },
    // {
    //   icon: <SettingOutlined style={{fontSize: 25}} />,
    //   label: 'Settings',
    //   link: '/settings',
    //   path: '/_viewport/desktop/settings'
    // },
  ]
  



  useEffect(() => {
    if (pathnameLength.length > 3) {
      setShowTabs(false)
    }  
  }, [pathName, pathnameLength.length])
  

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [cookie, setCookie] = useCookies(["Mode"])

  const setDarkMode = () => {
    setIsDarkMode(true)
    setCookie("LightMode", "Dark", {
      path: "/",
      maxAge: 3600 * 24 * 365, // Expires after 1yr
      sameSite: true,
      })
  }
  const setLightMode = () => {
    setIsDarkMode(false)
    setCookie("LightMode", "Light", {
      path: "/",
      maxAge: 3600 * 24 * 365, // Expires after 1yr
      sameSite: true,
      })
  }


  useEffect(() => {
    if (cookie.LightMode == "Dark") {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
  }, [cookie.LightMode])
  


  return (
    <>
        <AppBar sx={{ backgroundColor: theme.myColors.myBackground }} elevation={1}>
          <Toolbar variant="dense">
            <IconButton onClick={() => setDrawerOpen(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <MenuOutlined style={{ fontSize: 16, color: theme.myColors.textDark }} />
            </IconButton>
            <Link 
              onClick={(e) => {
                e.preventDefault()
                router.push({ pathname: '/' })
              }}
              title='Dukaflani Home'>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <img style={{height: 30}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
              </Box>
            </Link>
            <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={showTabs ? {display: 'block'} : {display: 'none'}}>
                <Box sx={{display: { xs: 'none', md: 'block' }}}>
                  <Tabs 
                      value={value} 
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary" 
                      aria-label="icon label tabs example">
                        <Tooltip title="Videos">
                            <Tab icon={<HomeFilled style={{fontSize: 20}} />} />
                        </Tooltip>
                        <Tooltip title="Products">
                            <Tab icon={<ShopFilled style={{fontSize: 20}} />} />
                        </Tooltip>
                        <Tooltip title="Events">
                            <Tab icon={<BarcodeOutlined style={{fontSize: 20}} />} />
                        </Tooltip>
                  </Tabs>
                </Box>
              </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'end', cursor: 'pointer',  paddingRight: 1}}>
            <Search >
              <SearchIconWrapper>
                <SearchOutlined style={{ color: theme.myColors.textDark }} />
              </SearchIconWrapper>
              <StyledInputBase
                style={{ color: theme.myColors.textDark }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={mySearchTerm}
                onChange={(e) => setMySearchTerm(e.target.value)}
                onKeyDown={updateSearchTerm}
              />
            </Search>
            </Box>
            <Stack direction="row" spacing={1}>
            <Tooltip title="Notifications">
              <IconButton>
                <BellOutlined />
              </IconButton>
              </Tooltip>
              <Tooltip title="Shopping Cart">
                <IconButton>
                  <ShoppingCartOutlined />
                </IconButton>
              </Tooltip>
              <Avatar src={userProfile?.profile_avatar} alt={`${userProfile?.first_name} ${userProfile?.last_name}`}/>
              <Tooltip title="More Options">
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </AppBar>

        <Drawer 
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <div style={{minWidth: 250, backgroundColor: theme.myColors.myBackground, minHeight: '100%', display: 'flex', flexDirection: 'column'}}>
              <Toolbar variant="dense" sx={{width: '100%'}}>
                <IconButton onClick={() => setDrawerOpen(false)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                  <MenuOutlined style={{ fontSize: 16, color: theme.myColors.textDark }} />
                </IconButton>
                <Link 
                  onClick={(e) => {
                    e.preventDefault()
                    router.push({ pathname: '/' })
                  }}
                  title='Dukaflani Home'>
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                    <img style={{height: 30}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
                  </Box>
                </Link>
              </Toolbar>
              <Box sx={{ paddingTop: 1, flexGrow: 1 }}>
                <Box>
                  <nav>
                    <List>
                    {navItems.map((navItem, i) => (
                      <ListItem disablePadding key={i}>
                        <ListItemButton
                          selected={pathName === navItem.path}
                          onClick={() =>{ 
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
              </Box>
              <Stack sx={{paddingX: 2}} direction="row" spacing={2}>
                <Typography sx={{cursor: 'pointer'}} onClick={() => router.push({ pathname: '/links/contact_us' })} variant='subtitle2'>Contuct us</Typography>
                <Typography sx={{cursor: 'pointer'}} onClick={() => router.push({ pathname: '/legal/terms_and_conditions' })} variant='subtitle2'>Terms</Typography>
              </Stack>
              <Box sx={{paddingX: 2}}>
                <Typography variant='caption'>&copy; {new Date().getFullYear()} Jidraff Gathura</Typography>
              </Box>
          </div>
        </Drawer>
    </>
  )
}

export default HeaderDesktop