import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, Container, MenuItem, Grid, Button} from '@mui/material/';
import {AddOutlined} from '@mui/icons-material'
import blockchain from '../assets/blockchain.png'
import '../App.css'

import { useLocation, useNavigate } from 'react-router-dom'

export default function Landing() {

  const navigate = useNavigate()

  return (
    <Box className='landing' sx={{ flexGrow: 1, height: '100vh', width: '100vw' }}>
      <AppBar position="static" color="transparent" elevation={0} >
        <Toolbar sx={{width: '80%', margin: '0 auto'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontWeight: 600 }}>
            Leave Management System
          </Typography>
          
          <MenuItem>
            <Typography textAlign="center" sx={{ fontWeight: 400 }}>Help</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center" sx={{ fontWeight: 400 }}>About Us</Typography>
          </MenuItem>
            
        </Toolbar>
      </AppBar>
      
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
      }}>
      <Grid container sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent:'center'
      }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{fontWeight: 800}}>
            Unleash the power of <br/> Blockchain
          </Typography>
          <Typography variant="subtitle1">
            Connect Metamask wallet to continue...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{mt:2, fontWeight: 'bold'}}
            endIcon={<AddOutlined />}
            onClick={() => navigate('/dashboard')}
          >
            Connect Wallet
          </Button>
        </Grid>
        <img item src={blockchain} alt="Blockchain" style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto'
          }} />
      </Grid>
    </Box>
      
    </Box>
  );
}
{/* <a href='https://pngtree.com/so/Network'>Network png from pngtree.com/</a> */}