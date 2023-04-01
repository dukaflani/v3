// MUI Imports
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"

// Icons
import { HomeFilled, ShopFilled, BarcodeOutlined } from '@ant-design/icons'

// Components



const BottomNavMobile = ({ value, setValue}: any) => {

  return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Videos" icon={<HomeFilled  style={{fontSize: 20}}  />} />
            <BottomNavigationAction label="Products" icon={<ShopFilled style={{fontSize: 20}}  />} />
            <BottomNavigationAction label="Events" icon={<BarcodeOutlined style={{fontSize: 20}}  />} />
          </BottomNavigation>
      </Paper>
  )
}

export default BottomNavMobile