// React Imports
import { useEffect, useState } from "react";

// Next Imports
import { useRouter } from 'next/router';

// NPM Imports
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import { AppBar, Box, Toolbar, Stack, IconButton, Link, Avatar, Typography, InputBase, List, Drawer,
  ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useTheme } from '@mui/material/styles';

// Icons
import { MenuOutlined, ArrowLeftOutlined , MoreOutlined, ShoppingCartOutlined,
  BellOutlined, SearchOutlined, HomeOutlined, ShopOutlined, BarcodeOutlined,
  LayoutOutlined, UserOutlined, CloudUploadOutlined, SettingOutlined  } from '@ant-design/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Project Imports
import { addSearchTerm } from "@/redux/features/search/searchSlice";


const HeaderMobile = () => {
  const searchTerm = useSelector((state) => state.search.searchTerm)
  const userProfile = useSelector((state) => state.auth.profileInfo)
  const theme = useTheme()
  const router = useRouter()
  const dispatch = useDispatch()
  const pathName = router.pathname
  const pathnameLength = pathName.split("/")
  const [showSearch, setShowSearch] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mySearchTerm, setMySearchTerm] = useState(searchTerm)

  const formattedSearchTerm = mySearchTerm?.replace(/%2/g, "+")

  const updateSearchTerm = (e) => {
    if (e.key === 'Enter') {
      router.push({pathname: `/results/`, query: { search_query: formattedSearchTerm }})
      dispatch(addSearchTerm(mySearchTerm))
    }
  }

  const updateSearchTermClick = () => {
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


  return (
    <>
      <AppBar sx={{ backgroundColor: theme.myColors.myBackground }} elevation={1}>
        <Toolbar variant="dense">
          {showSearch ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: '100%'}} >
            <IconButton onClick={() => setShowSearch(false)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <ArrowLeftOutlined  style={{ fontSize: 16, color: theme.myColors.textDark }} />
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
                <SearchOutlined  style={{ fontSize: 16, color: theme.myColors.textDark }} />
            </IconButton>

          </Box>
          :
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: '100%'}} >
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
                  <img style={{height: 25}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
                </Box>
              </Link>
              <Stack direction='row' spacing={0.5} sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <IconButton onClick={() => setShowSearch(true)} edge="start" color="inherit" aria-label="search">
                  <SearchOutlined  style={{ fontSize: 16, color: theme.myColors.textDark }} />
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="notifications">
                  <BellOutlined style={{ fontSize: 16, color: theme.myColors.textDark }} />
              </IconButton>
                <IconButton edge="start" color="inherit" aria-label="shopping cart">
                  <ShoppingCartOutlined style={{ fontSize: 16, color: theme.myColors.textDark }} />
              </IconButton>
              <Avatar sx={{ width: 24, height: 24 }} src={userProfile?.profile_avatar} alt={`${userProfile?.first_name} ${userProfile?.last_name}`}/>
                <IconButton edge="start" color="inherit" aria-label="more" sx={{marginRight: 1}}>
                  <MoreVertIcon fontSize="small" sx={{ color: theme.myColors.textDark }} />
              </IconButton>
              </Stack>
          </Box>}
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

export default HeaderMobile