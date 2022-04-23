import React, {useEffect, useState} from 'react';
import {Avatar, 
    Button, 
    CssBaseline, 
    TextField,  
    Box, 
    Typography, 
    Container, 
    Card, 
    MenuItem,
    AppBar, 
    Toolbar
} from '@mui/material'
import { AssignmentIndOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import  {createUserProfile} from '../redux/authSlice';


export default function CreateProfile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [hostel, setHostel] = useState("");
    const [department, setDept] = useState("");
    const [availableHostels, setAvailableHostels] = useState([])
    const [availableDepts, setAvailableDepts] = useState([])

    useEffect(()=> {
      fetch(`http://localhost:5000/api/profile/get-hostels`)
        .then(res=> res.json())
        .then(data=> setAvailableHostels(data))
    }, [])

    useEffect(()=> {
      fetch(`http://localhost:5000/api/profile/get-departments`)
        .then(res=> res.json())
        .then(data=> setAvailableDepts(data))
    }, [])

    // console.log({availableHostels, availableDepts})

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {publicKey, jwt_token, isLoggedIn} = useSelector((state) => state.auth)
    
    const handleHostelChange = (event) => {
        setHostel(event.target.value);
    };
    const handleDeptChange = (event) => {
        setDept(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      const userData = {
        name,
        phone,
        email,
        hostel,
        department,
        publicKey,
        jwt_token
      }
      
      dispatch(createUserProfile(userData))
      
      // navigate('/dashboard')
    };
    useEffect(() => {
     
      if (isLoggedIn) { 
        navigate('/dashboard')
      } else if(jwt_token){
        navigate('/create-profile')
      } else {
        navigate('/')
      }
    }, [isLoggedIn]);

  return (
      <Box  className="create-profile" 
            sx={{flexGrow: 1, height:'auto', minHeight: '100vh',
                display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'
                }}>
                   <AppBar position="static" color="transparent" elevation={0} >
        <Toolbar sx={{width: '80%', margin: '0 auto'}}>
          <Typography onClick={()=> navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1,fontWeight: 600 }}>
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

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 5,
            borderRadius:2,
            margin: 2
          }}
          elevation={2}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AssignmentIndOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Complete your profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <TextField
                id="select-dept"
                select
                margin="normal"
                required
                fullWidth
                label="Select Department"
                value={department}
                onChange={handleDeptChange}
                variant="outlined"
            >
            {availableDepts.map((option) => (
                <MenuItem key={option.name} value={option._id}>
                {option.name}
                </MenuItem>
            ))}
            </TextField>
            <TextField
                id="select-hostel"
                select
                margin="normal"
                required
                fullWidth
                label="Select Hostel"
                value={hostel}
                onChange={handleHostelChange}
                variant="outlined"
            >
            {availableHostels.map((option) => (
                <MenuItem key={option.name} value={option._id}>
                {option.name}
                </MenuItem>
            ))}
            </TextField>
            
            <Box textAlign='center'>
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 1, paddingLeft: 6, paddingRight:6 }}>
                Submit
                </Button>
            </Box>
          </Box>
        </Card>
      </Container>
      </Box>

  );
}