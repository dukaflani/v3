// Nextjs Imports
import { useRouter } from "next/router"

// MUI Imports
import { Box, Stack, Typography, Card, CardMedia, CardContent, colors, Button } from "@mui/material"

// NPM Imports
import numeral from 'numeral';

// Icons
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';




const TabProductCard = ({ product, data, loadingProduct }) => {
    const router = useRouter()


  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">PRODUCTS & MERCHANDISE</Typography>
                    <Typography variant="caption">{`Buy products promoted or sold by ${data?.stage_name}`}</Typography>
                </Stack>
            </Box>
            {loadingProduct ? (<Typography variant="caption">Loading product card...</Typography>) : (<Box>
                <Card onClick={() => router.push({ pathname: `/shop/${product?.id}` })} square>
                        <CardMedia
                            sx={{ height: 320 }}
                            image={product?.image}
                            title={product?.title}
                        />
                        {product?.is_sponsored ? <Box sx={{padding:0.5, backgroundColor: colors.blue[100]}}>
                            <Typography sx={{color: colors.blue[800]}} variant="body2">Sponsored</Typography>
                        </Box>
                        :
                        <Box sx={{padding:0.5, backgroundColor: colors.grey[300]}}>
                            <Typography sx={{color: colors.grey[800]}} variant="body2">{product?.status_description}</Typography>
                        </Box>
                        }
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
                                        <Button startIcon={<LocalOfferOutlinedIcon/>} fullWidth size="small" variant="contained">Product Details</Button>
                                    </Box>
                                </Stack>
                            </Box>
                        </CardContent>
                </Card>
            </Box>)}
        </Stack>
    </Box>
  )
}

export default TabProductCard