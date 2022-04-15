import React, {useState} from 'react';
import {Avatar, 
    Button, 
    CssBaseline, 
    TextField,  
    Box, 
    Typography, 
    Container, 
    Card, 
    MenuItem,
    AppBar, Toolbar
} from '@mui/material'
import { AssignmentIndOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom'


export default function CreateProfile() {

    const [hostel, setHostel] = useState("");
    const [dept, setDept] = useState("");

    const navigate = useNavigate()
    const depts = [
        {
          value: 'Computer Science Engineering',
          label: 'Computer Science Engineering',
        },
        {
          value: 'Electrical & Telecommunication Engineering',
          label: 'Electrical & Telecommunication Engineering',
        },
        {
          value: 'Masters of Computer Application',
          label: 'Masters of Computer Application',
        },
        {
          value: 'Mechanical Engineering',
          label: 'Mechanical Engineering',
        },
      ];
    const hostels = [
        {
            value: 'Hostel 1',
            label: 'Hostel 1',
        },
        {
            value: 'Hostel 2',
            label: 'Hostel 2',
        },
        {
            value: 'Hostel 3',
            label: 'Hostel 3',
        },
        {
            value: 'Hostel 4',
            label: 'Hostel 4',
        },
        {
            value: 'Hostel 5',
            label: 'Hostel 5',
        },
        {
            value: 'Hostel 6',
            label: 'Hostel 6',
        },
    ];
    const handleHostelChange = (event) => {
        setHostel(event.target.value);
    };
    const handleDeptChange = (event) => {
        setDept(event.target.value);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        data
    });
    navigate('/dashboard')
    };

  return (
      <Box  className="create-profile" 
            sx={{flexGrow: 1, height:'auto', minHeight: '100vh',
                display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'
                }}>
                    <AppBar position="static" color="transparent" elevation={0} >
        <Toolbar sx={{width: '80%', margin: '0 auto'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontWeight: 600 }} onClick={() => navigate('/')}>
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

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background:'white',
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
              variant="standard"
              size="small"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
            />
            <TextField
              variant="standard"
              size="small"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              variant="standard"
              size="small"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
            />
            <TextField
                id="standard-select-dept"
                select
                margin="normal"
                required
                fullWidth
                label="Select Department"
                value={dept}
                onChange={handleDeptChange}
                helperText="Please select your department"
                variant="standard"
            >
            {depts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
            <TextField
                id="standard-select-hostel"
                select
                margin="normal"
                required
                fullWidth
                label="Select Hostel"
                value={hostel}
                onChange={handleHostelChange}
                helperText="Please select your hostel"
                variant="standard"
            >
            {hostels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
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