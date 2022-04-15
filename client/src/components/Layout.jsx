import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import avatar from '../assets/me.jpeg'

import '../App.css'
import { AccountCircleOutlined, AddOutlined, LogoutOutlined } from '@mui/icons-material';

const drawerWidth = 240


export default function Layout({ children }) {

  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <AccountCircleOutlined />, 
      path: '/dashboard' 
    },
    { 
      text: 'Apply leave', 
      icon: <AddOutlined />, 
      path: '/apply' 
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography 
          variant="h6" 
          noWrap
          onClick={() => navigate('/')} 
          >
            Leave Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{display:'flex', mt: '20px', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Avatar sx={{ height: '100px',width: '100px' }} src={avatar} alt="user"/>
            <Typography variant="h6" noWrap>
            Dhanmoni Nath
            </Typography>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem 
              button
              onClick={() => navigate(item.path)} 
              sx={location.pathname == item.path ? {
                background: '#f4f4f4',
                color: 'primary.main'
              } : null}
              key={item.text}>
                <ListItemIcon 
                sx={location.pathname == item.path ? {
                color: 'primary.main'
              } : null}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            
              <ListItem 
              button 
              onClick={() => navigate('/')}
              >
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar/>
        {children}
      </Box>
    </Box>
  )
}