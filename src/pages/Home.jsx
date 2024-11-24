import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  IconButton,
  useTheme,
} from '@mui/material';
import { ArrowBack, ArrowForward, Pets, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { images } from '../assets/images';

const carouselItems = [
  {
    image: images.pets.dog1,
    title: 'Find Your Perfect Companion',
    description: 'Adopt a pet and give them a loving home',
  },
  {
    image: images.pets.cat1,
    title: 'Every Pet Deserves Love',
    description: 'Make a difference in a pet\'s life',
  },
  {
    image: images.pets.dog2,
    title: 'Quality Pet Products',
    description: 'Everything your pet needs to thrive',
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
      {carouselItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              width: '80%',
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {item.description}
            </Typography>
          </Box>
        </Box>
      ))}
      <IconButton
        onClick={handlePrevSlide}
        sx={{
          position: 'absolute',
          left: theme.spacing(2),
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.3)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.5)',
          },
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={handleNextSlide}
        sx={{
          position: 'absolute',
          right: theme.spacing(2),
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.3)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.5)',
          },
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box>
      <Carousel />
      
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
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
                height="300"
                image={images.banners.adoption}
                alt="Adopt a Pet"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2" align="center">
                  Adopt a Pet
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph align="center">
                  Give a loving home to a pet in need. Browse our available pets and start your adoption journey today.
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/adoption')}
                  startIcon={<Pets />}
                  sx={{ mt: 2 }}
                >
                  Find Your Companion
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
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
                height="300"
                image={images.banners.shop}
                alt="Shop Products"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h2" align="center">
                  Shop Products
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph align="center">
                  Find everything your pet needs. From food to toys, we have a wide selection of quality pet products.
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/products')}
                  startIcon={<ShoppingCart />}
                  sx={{ mt: 2 }}
                >
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
