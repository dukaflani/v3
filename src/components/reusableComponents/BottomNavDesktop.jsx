// MUI Imports
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"

// Icons
import { HomeFilled, ShopFilled, BarcodeOutlined } from '@ant-design/icons'

// Components



const BottomNavDesktop = ({ value, setValue}) => {

  return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Links" icon={<HomeFilled  style={{fontSize: 20}}  />} />
            <BottomNavigationAction label="Shop" icon={<ShopFilled style={{fontSize: 20}}  />} />
            <BottomNavigationAction label="Events" icon={<BarcodeOutlined style={{fontSize: 20}}  />} />
          </BottomNavigation>
      </Paper>
  )
}

export default BottomNavDesktop