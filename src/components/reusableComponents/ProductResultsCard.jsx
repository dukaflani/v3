// Nextjs Imports
import { useRouter } from "next/router"

// MUI Imports
import { Box, Stack, Typography, Card, CardMedia, CardContent, colors, Button, CardActionArea } from "@mui/material"

// NPM Imports
import numeral from 'numeral';

// Icons
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

const ProductResultsCard = ({ product }) => {
    const router = useRouter()


  return (
    <Box>
        <Card onClick={() => router.push({ pathname: `/shop/${product?.id}` })} square>
            <CardActionArea>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={product?.image}
                        title={product?.title}
                    />
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
                                    <Button startIcon={<LocalOfferOutlinedIcon/>} fullWidth size="small" variant="contained">Product Details</Button>
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