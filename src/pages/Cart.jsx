import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Box,
  Paper,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Delete, ShoppingCart, Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    updateQuantity(itemId, currentQuantity + change);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Add some products to your cart and they will appear here
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ mb: { xs: 4, md: 0 } }}>
            <List>
              {cartItems.map((item, index) => (
                <Box key={item.id}>
                  <ListItem sx={{ py: 3 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 1,
                        mr: 2,
                      }}
                    />
                    <ListItemText
                      primary={
                        <Typography variant="h6" gutterBottom>
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            ${item.price.toFixed(2)} each
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Remove />
                            </IconButton>
                            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ mr: 2 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{ 
                            color: 'error.main',
                            '&:hover': {
                              color: 'error.dark',
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">Subtotal</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                      ${getCartTotal().toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Shipping</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                      Free
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">
                    ${getCartTotal().toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleCheckout}
                sx={{
                  mt: 3,
                  py: 1.5,
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
