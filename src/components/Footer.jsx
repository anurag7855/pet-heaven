import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  Pets,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Adoption', href: '/adoption' },
        { name: 'Cart', href: '/cart' },
      ],
    },
    {
      title: 'Pet Services',
      links: [
        { name: 'Pet Grooming', href: '#' },
        { name: 'Veterinary Care', href: '#' },
        { name: 'Pet Training', href: '#' },
        { name: 'Pet Boarding', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'FAQs', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'rgba(255, 105, 180, 0.8)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Pets sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Pet Shop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Your one-stop destination for all pet needs. We provide quality products
              and adoption services to ensure your pets live their best lives.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links Sections */}
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontFamily: 'Playfair Display',
                  fontWeight: 600,
                }}
              >
                {section.title}
              </Typography>
              {section.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  sx={{
                    display: 'block',
                    color: 'white',
                    opacity: 0.9,
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>

        {/* Contact Information */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">support@petshop.com</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">123 Pet Street, CA 90210</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Copyright */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © {currentYear} Pet Shop. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
