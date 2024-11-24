import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

// Mock cart data (in a real app, this would come from a cart context/state)
const mockCartItems = [
  {
    id: 1,
    name: 'Premium Dog Food',
    price: 29.99,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Cat Toy Set',
    price: 14.99,
    quantity: 2,
  },
];

const ShippingForm = ({ formData, setFormData }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        label="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="City"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="Postal Code"
        value={formData.postalCode}
        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
      />
    </Grid>
  </Grid>
);

const PaymentForm = ({ formData, setFormData }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        label="Card Number"
        value={formData.cardNumber}
        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="Expiry Date"
        placeholder="MM/YY"
        value={formData.expiryDate}
        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="CVV"
        value={formData.cvv}
        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
      />
    </Grid>
  </Grid>
);

const ReviewOrder = ({ shippingData, paymentData }) => {
  const calculateTotal = () => {
    return mockCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      {mockCartItems.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Typography>
            {item.name} x {item.quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">
        Total: ${calculateTotal().toFixed(2)}
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Typography>
          {shippingData.firstName} {shippingData.lastName}
        </Typography>
        <Typography>{shippingData.address}</Typography>
        <Typography>
          {shippingData.city}, {shippingData.postalCode}
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <Typography>
          Card ending in {paymentData.cardNumber.slice(-4)}
        </Typography>
        <Typography>Expires: {paymentData.expiryDate}</Typography>
      </Box>
    </Box>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Place order
      setOrderPlaced(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShippingForm formData={shippingData} setFormData={setShippingData} />;
      case 1:
        return <PaymentForm formData={paymentData} setFormData={setPaymentData} />;
      case 2:
        return <ReviewOrder shippingData={shippingData} paymentData={paymentData} />;
      default:
        throw new Error('Unknown step');
    }
  };

  if (orderPlaced) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Order placed successfully!
        </Alert>
        <Typography>
          Redirecting to home page...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ py: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              color={activeStep === steps.length - 1 ? 'secondary' : 'primary'}
            >
              {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;
