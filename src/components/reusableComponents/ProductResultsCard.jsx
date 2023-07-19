// React Imports
import { useEffect, useState } from "react";

// Nextjs Imports
import { useRouter } from "next/router"
import Image from "next/legacy/image";

// MUI Imports
import { Box, Stack, Typography, Card, CardMedia, CardContent, colors, Button, CardActionArea, useMediaQuery } from "@mui/material"

// NPM Imports
import numeral from 'numeral';

// Tanstack query
import { useMutation } from "@tanstack/react-query";

// Icons
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { useDispatch } from "react-redux";
import { pageHasChanged, setRegularPageView } from "@/redux/features/navigation/navigationSlice";
import { addProductView } from "@/axios/axios";

const ProductResultsCard = ({ product }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const userCountry = useSelector((state) => state.auth.country)
    const userIpAddress = useSelector((state) => state.auth.ip_address)
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [user_country, setUser_country] = useState(null)
    const [user_ip, setUser_ip] = useState(null)

    useEffect(() => {
        setUser_country(userCountry)
        setUser_ip(userIpAddress)
    }, [userCountry, userIpAddress])

    const newProductView = {
        product: product?.id,
        product_profile: product?.customuserprofile,
        ip_address: user_ip,
        country: user_country,
        referral_url: "https://dukaflani.com",
    }

    const { mutate: addNewProductView } = useMutation(addProductView, {
        onSuccess: (data, _variables, _context) => {
        //   console.log("product view success:", data)
        },
        onError: (error, _variables, _context) => {
        //   console.log("product view error:", error)
        },
      })

    

    const handleProductClick = () => {
        dispatch(pageHasChanged(true))
        dispatch(setRegularPageView())
        addNewProductView(newProductView)
        router.push({ pathname: `/shop/${product?.id}`})
    }


  return (
    <Box>
        <Card variant="outlined" onClick={handleProductClick} square>
            <CardActionArea>
                    <Box 
                        sx={{ backgroundColor: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[800] : is_darkMode === "light" && prefersDarkMode === true ?  colors.grey[200] : colors.grey[200], width: '100%', position: "relative", cursor:'pointer'}}
                        >
                        <Image 
                            src={product?.image}
                            layout='responsive'
                            alt={product?.title}
                            width='100%'
                            height={100}
                            />
                    </Box>
                    <Box sx={{padding:0.5, backgroundColor: colors.grey[300]}}>
                        <Typography sx={{color: colors.grey[800]}} variant="body2">{product?.status_description}</Typography>
                    </Box>
                    <CardContent>
                        <Box>
                            <Stack>
                                <Box sx={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
                                    <Typography className="line-clamp-2 line-clamp" variant="subtitle1">{product?.title}</Typography>
                                    {/* <Tooltip title='Order on WhatsApp'>
                                        <IconButton>
                                            <WhatsAppOutlined style={{cursor: 'pointer', fontSize: 20}} />
                                        </IconButton>
                                    </Tooltip> */}
                                </Box>
                                <Stack>
                                    <Typography variant="h6">{product?.local_currency}{numeral(product?.local_price).format('0,0')}</Typography>
                                </Stack>
                                <Stack>
                                    <Typography className="line-clamp-2 line-clamp" variant="body2">{product?.description}</Typography>
                                </Stack>
                                <Box sx={{paddingTop: 2, width: '100%'}}>
                                    <Button startIcon={<LocalOfferOutlinedIcon/>} fullWidth size="small" variant="contained">View details</Button>
                                </Box>
                            </Stack>
                        </Box>
                    </CardContent>
            </CardActionArea>
        </Card>
    </Box>
  )
}

export default ProductResultsCard