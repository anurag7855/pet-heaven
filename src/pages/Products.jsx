import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { ShoppingCart, Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

// Mock products data
const products = [
  {
    id: 1,
    name: 'Premium Dog Food',
    price: 29.99,
    image: 'https://images.pexels.com/photos/6568943/pexels-photo-6568943.jpeg',
    description: 'High-quality nutrition for your furry friend',
    category: 'Food',
  },
  {
    id: 2,
    name: 'Cat Toy Set',
    price: 14.99,
    image: 'https://images.pexels.com/photos/6568676/pexels-photo-6568676.jpeg',
    description: 'Interactive toys to keep your cat entertained',
    category: 'Toys',
  },
  {
    id: 3,
    name: 'Luxury Pet Bed',
    price: 49.99,
    image: 'https://images.pexels.com/photos/6568676/pexels-photo-6568676.jpeg',
    description: 'Comfortable and stylish bed for your furry friend',
    category: 'Accessories',
  },
  {
    id: 4,
    name: 'Premium Cat Food',
    price: 24.99,
    image: 'https://images.pexels.com/photos/6568943/pexels-photo-6568943.jpeg',
    description: 'Nutritious cat food made with premium ingredients',
    category: 'Food',
  },
];

const Products = () => {
  const { addToCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarMessage(`${product.name} added to cart!`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Pet Products
      </Typography>

      {/* Search Bar */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Products;
