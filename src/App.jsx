import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Adoption from './pages/Adoption';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

// Custom theme with pink color scheme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff69b4', // Hot pink
      light: '#ff8dc7',
      dark: '#d44a91',
    },
    secondary: {
      main: '#ffd700',
      light: '#ffe033',
      dark: '#ccac00',
    },
  },
  typography: {
    fontFamily: [
      'Quicksand',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Playfair Display, serif',
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
    },
    h4: {
      fontFamily: 'Playfair Display, serif',
    },
    h5: {
      fontFamily: 'Playfair Display, serif',
    },
    h6: {
      fontFamily: 'Playfair Display, serif',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 105, 180, 0.8)', // Translucent pink
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fff5f8 0%, #fff 100%)'
          }}>
            <Navbar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/adoption" element={<Adoption />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
