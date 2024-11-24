import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Pets as PetsIcon,
  ShoppingCart as CartIcon,
  Home as HomeIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Products', path: '/products', icon: <StoreIcon /> },
    { text: 'Adoption', path: '/adoption', icon: <PetsIcon /> },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        background: 'rgba(255, 105, 180, 0.9)',
        height: '100%',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Typography variant="h6" sx={{ my: 2, color: 'white' }}>
        Pet Shop
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                color: 'white',
                '& .MuiListItemText-primary': {
                  fontWeight: location.pathname === item.path ? 600 : 400,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(255, 105, 180, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <PetsIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Playfair Display',
              cursor: 'pointer',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            onClick={() => navigate('/')}
          >
            Pet Shop
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  color: 'white',
                  opacity: location.pathname === item.path ? 1 : 0.8,
                  position: 'relative',
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&::after': location.pathname === item.path ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '20px',
                    height: '2px',
                    backgroundColor: 'white',
                    borderRadius: '2px',
                  } : {},
                }}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{
              ml: 2,
              opacity: location.pathname === '/cart' ? 1 : 0.8,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Badge 
              badgeContent={getCartCount()} 
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ffd700',
                  color: '#000',
                  fontWeight: 600,
                },
              }}
            >
              <CartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            background: 'rgba(255, 105, 180, 0.9)',
            backdropFilter: 'blur(8px)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
