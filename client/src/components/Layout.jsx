import React, {useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Chip,
  Avatar,
  Drawer,
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import avatar from "../assets/me.jpeg";

import "../App.css";
import {
  AccountCircleOutlined,
  AddOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import  {signOutUser} from '../redux/authSlice';

const drawerWidth = 240;

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const {publicKey, jwt_token, isLoggedIn, user} = useSelector((state) => state.auth)

  const menuItems = [
    {
      text: "Dashboard",
      icon: <AccountCircleOutlined />,
      path: "/dashboard",
    },
    {
      text: "Apply Leave",
      icon: <AddOutlined />,
      path: "/apply",
    },
  ];

  const handleSignOut = ()=> {
    dispatch(signOutUser())
    navigate('/')
  }


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap onClick={() => navigate("/")}>
            Leave Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <Box
            sx={{
              display: "flex",
              mt: "20px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{ height: "100px", width: "100px" }}
              src={avatar}
              alt="user"
            />
            <Typography variant="h6" noWrap>
              {user.name}
            </Typography>
            <Typography variant="subtitle2" noWrap sx={{padding:1}}>
              Profile status:<span style={{color:'green', border: '1px solid green', borderRadius:'10px', padding:'0px 10px 0px 10px'}}>Approved</span>
            </Typography>
          </Box>
          <List>, 
            {menuItems.map((item) => (
              <ListItem
                button
                onClick={() => navigate(item.path)}
                sx={
                  location.pathname == item.path
                    ? {
                        background: "#F5F6FA",
                        color: "primary.main",
                      }
                    : null
                }
                key={item.text}
              >
                <ListItemIcon
                  sx={
                    location.pathname == item.path
                      ? {
                          color: "primary.main",
                        }
                      : null
                  }
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="h6">{item.text}</Typography>}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Sign Out</Typography>}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
