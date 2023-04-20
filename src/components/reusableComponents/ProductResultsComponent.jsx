// MUI Imports
import { Box, Grid, Typography } from '@mui/material'

// NPM Imports
import { useSelector } from 'react-redux'

// Project Imports
import ProductResultsCard from './ProductResultsCard'

const ProductResultsComponent = ({ isLoading, products }) => {

  const searchTerm = useSelector((state) => state.search.searchTerm)


  return (
    <Box>
        {isLoading && <Typography variant='body2'>Loading products...</Typography>}
        {products?.length == 0 && <Typography variant='body2'>{`Oops! Looks like there are no products available for "${searchTerm}"`}</Typography>}
        <Grid container spacing={3}>
          {products?.map((product, i) => (
              <Grid xs={6} md={4}  item key={i}>
                <ProductResultsCard product={product} />
              </Grid>
          ))}
        </Grid>
    </Box>
  )
}

export default ProductResultsComponent