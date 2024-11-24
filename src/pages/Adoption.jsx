import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Paper,
  Chip,
} from '@mui/material';
import { Favorite, Pets } from '@mui/icons-material';
import { images } from '../assets/images';

// Mock data for available pets
const mockPets = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    image: images.pets.dog1,
    description: 'Friendly and energetic Golden Retriever looking for an active family.',
    traits: ['Friendly', 'Energetic', 'Good with kids'],
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    age: '1 year',
    image: images.pets.cat1,
    description: 'Sweet and gentle Siamese cat who loves to cuddle.',
    traits: ['Gentle', 'Affectionate', 'Indoor only'],
  },
  {
    id: 3,
    name: 'Rocky',
    type: 'Dog',
    breed: 'German Shepherd',
    age: '3 years',
    image: images.pets.dog2,
    description: 'Loyal and intelligent German Shepherd, great guard dog.',
    traits: ['Loyal', 'Intelligent', 'Protective'],
  },
  {
    id: 4,
    name: 'Milo',
    type: 'Cat',
    breed: 'Persian',
    age: '2 years',
    image: images.pets.cat2,
    description: 'Beautiful Persian cat with a calm and loving personality.',
    traits: ['Calm', 'Loving', 'Low energy'],
  },
];

const AdoptionForm = ({ open, onClose, pet }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', typography: 'h4' }}>
        Adopt {pet?.name}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={2}
                value={formData.address}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pet Care Experience"
                name="experience"
                multiline
                rows={3}
                value={formData.experience}
                onChange={handleChange}
                required
                variant="outlined"
                helperText="Please describe your experience with pets and your home environment."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit Application
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const Adoption = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setFormOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Adopt a Pet
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Give a loving home to one of our wonderful pets. Each pet has been cared for and is ready for their forever home.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {mockPets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image={pet.image}
                alt={pet.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Pets sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h5" component="div">
                    {pet.name}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" color="text.secondary">
                    Type: {pet.type}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Breed: {pet.breed}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Age: {pet.age}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {pet.description}
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {pet.traits.map((trait, index) => (
                    <Chip
                      key={index}
                      label={trait}
                      sx={{ mr: 1, mb: 1 }}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => handleAdoptClick(pet)}
                  startIcon={<Favorite />}
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  Adopt Me
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AdoptionForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        pet={selectedPet}
      />
    </Container>
  );
};

export default Adoption;
