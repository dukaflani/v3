// React Imports
import { useState } from "react";

// Next Imports
import { useRouter } from 'next/router';

// MUI Imports
import { AppBar, Box, Toolbar, Stack, IconButton, Link, Avatar, TextField, InputBase, List, Drawer,
  ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useTheme } from '@mui/material/styles';

// Icons
import { MenuOutlined, ArrowLeftOutlined , MoreOutlined, ShoppingCartOutlined,
  BellOutlined, SearchOutlined, HomeOutlined, ShopOutlined, BarcodeOutlined,
  LayoutOutlined, UserOutlined, CloudUploadOutlined, SettingOutlined  } from '@ant-design/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert';


const HeaderMobile = () => {
  const theme = useTheme()
  const router = useRouter()
  const pathName = router.pathname
  const pathnameLength = pathName.split("/")
  const [showSearch, setShowSearch] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)


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


  return (
    <>
      <AppBar sx={{ backgroundColor: theme.myColors.myBackground }} elevation={1}>
        <Toolbar variant="dense">
          {showSearch ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: '100%'}} >
            <IconButton onClick={() => setShowSearch(false)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                <ArrowLeftOutlined  style={{ fontSize: 16, color: theme.myColors.textDark }} />
            </IconButton>
            <Box sx={{flex: 1,}}>
              <InputBase autoComplete="true" autoFocus fullWidth id="standard-basic" placeholder="Search Dukaflani" variant="standard" />
            </Box>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ ml: 1 }}>
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
              <Avatar sx={{ width: 24, height: 24 }} src='/no-image.png' alt='Jidraff Gathura'/>
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
          <div style={{minWidth: 250, backgroundColor: theme.myColors.myBackground, minHeight: '100%'}}>
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
              <Box sx={{paddingTop: 1}}>
                <nav>
                  <List>
                  {navItems.map((navItem, i) => (
                    <ListItem disablePadding>
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
          </div>
        </Drawer>
    </>
  )
}

export default HeaderMobile