import React, {useState} from 'react';
import {ethers} from 'ethers'
import {AppBar, Box, Toolbar, Typography, Container, MenuItem, Grid, Button} from '@mui/material/';
import {AddOutlined} from '@mui/icons-material'
import blockchain from '../assets/blockchain.png'
import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import  {setUserProfile, setUserPublicKey} from '../redux/authSlice';

const {ethereum} = window

export default function Landing() {

  const {isLoading, isError, user, isLoggedIn} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let provider;
  let userProfile;
  let userPublicKey;


  const handleAuthenticate = async ({publicKey,signature}) =>{
		const res = await fetch(`http://localhost:5000/api/auth/`, {
			body: JSON.stringify({ publicKey, signature }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})

    return res.json()
  }

  const handleSignup = async (publicKey) =>{
		const res = await fetch(`http://localhost:5000/api/auth/register`, {
			body: JSON.stringify({ publicKey }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})
    return res.json();
}
  
  const handleSignMessage = async ({publicKey,nonce}) => {
		try {
      const signer = provider.getSigner()
			const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`);
      console.log({publicKey, nonce, signature})
			return { publicKey, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};


  const saveAndRedirect = (data)=> {
    localStorage.setItem('auth-token', data.token)
    console.log({userProfile})
    console.log({userPublicKey})
    dispatch(setUserPublicKey(userPublicKey))
    if(userProfile && userProfile.email){
      dispatch(setUserProfile(userProfile))
      console.log('profile exists', userProfile)
      navigate('/dashboard')
    } else {
      console.log('user profile doesnot exists')
      navigate('/create-profile')
    }
  }


  const connectWallet = async ()=> {
      if(!ethereum) return alert('Please install metamask!');
      // const accounts = await ethereum.request({method:'eth_requestAccounts'});

      provider = new ethers.providers.Web3Provider(window.ethereum)

      // MetaMask requires requesting permission to connect users accounts
      const accounts = await provider.send("eth_requestAccounts", []);

      console.log({accounts})
      if(!accounts.length){
        return alert('No account found!')
      } 
      
      userPublicKey = accounts[0]

      fetch(`http://localhost:5000/api/auth/get-user/${accounts[0]}`)
        .then((response) => response.json())
        // If yes, retrieve it. If no, create it.
        .then((user) => {
          if(user){
            userProfile = user;
          }
          return (user ? user : handleSignup(accounts[0]))
        }
        )
        // Popup MetaMask confirmation modal to sign message
        .then(handleSignMessage)
        // // Send signature to backend on the /auth route
        .then(handleAuthenticate)
        // // Pass accessToken back to parent component (to save it in localStorage)
        .then(saveAndRedirect)
        .catch((err) => {
          console.log({err})
        });

     
   
  }


  

  return (
    <Box className='landing' sx={{ flexGrow: 1, height: '100vh', width: '100vw' }}>
      <AppBar position="static" color="transparent" elevation={0} >
        <Toolbar sx={{width: '80%', margin: '0 auto'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontWeight: 600 }}>
            Leave Management System
          </Typography>
          
          <MenuItem>
            <Typography variant="h6" textAlign="center" sx={{ fontWeight: 600 }}>Help</Typography>
          </MenuItem>
          <MenuItem>
            <Typography variant="h6" textAlign="center" sx={{ fontWeight: 600 }}>About Us</Typography>
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
          {userPublicKey ? (
            <Button
            variant="outlined"
            color="primary"
            sx={{mt:2, fontWeight: 'bold'}}
            onClick={connectWallet}
          >
            Wallet Connected
          </Button>
          ) : (
            <Button
            variant="contained"
            color="primary"
            sx={{mt:2, fontWeight: 'bold'}}
            endIcon={<AddOutlined />}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
          )} 
          {userPublicKey}
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