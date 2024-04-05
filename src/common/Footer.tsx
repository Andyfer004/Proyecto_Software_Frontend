import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1c2331', color: 'white', mt: 5, width:'100%' }}>
      <Container maxWidth="lg">
        <Box
          sx={{ p: 4, bgcolor: '#1976d2' }}
          display="flex"
          justifyContent="space-between"
        >
          <Typography>
            Get connected with us on social networks:
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <FacebookIcon />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <TwitterIcon />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <GoogleIcon />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <InstagramIcon />
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              <LinkedInIcon />
            </Link>
            <Link href="#" color="inherit">
              <GitHubIcon />
            </Link>
          </Box>
        </Box>

        <Grid container spacing={5} sx={{ mt: 5, justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company name
            </Typography>
            <Typography variant="body2">
              Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" gutterBottom>
              Useful links
            </Typography>
            <Link href="#" color="inherit" display="block">Your Account</Link>
            <Link href="#" color="inherit" display="block">Become an Affiliate</Link>
            <Link href="#" color="inherit" display="block">Shipping Rates</Link>
            <Link href="#" color="inherit" display="block">Help</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <HomeIcon sx={{ mr: 1 }} /> New York, NY 10012, US
              </Box>
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ mr: 1 }} /> info@example.com
              </Box>
              <Box component="span" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ mr: 1 }} /> + 01 234 567 88
              </Box>
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <PrintIcon sx={{ mr: 1 }} /> + 01 234 567 89
              </Box>
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{ py: 3, bgcolor: 'rgba(0, 0, 0, 0.2)', textAlign: 'center', mt: 5 }}
        >
          © 2020 Copyright:
          <Link href="https://mdbootstrap.com/" color="inherit" sx={{ ml: 1 }}>
            Group 6
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
