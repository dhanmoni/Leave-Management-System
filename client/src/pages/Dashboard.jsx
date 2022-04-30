import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";
import StudentDashboard from "../components/StudentDashboard";
import SystemAdminDashboard from "../components/SystemAdminDashboard";
import {getDepartment, getHostel} from '../redux/dataSlice'

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicKey, jwt_token, user, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getHostel())
    dispatch(getDepartment())
    
  }, [])

  return (
    <Layout>
      <Box
        sx={{
          background: "#F5F6FA",
          flexGrow: 1,
          minHeight: "100vh",
          padding: 5,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={6}>
            {/* Profile info */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                }}
                elevation={4}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
                  My Profile
                </Typography>
                <Divider variant="middle" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection:'column',
                    alignItems: "center",
                    justifyContent:'center',
                    padding: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      height: "150px",
                      width: "150px",
                      bgcolor: "primary.main",
                      fontSize: 48,
                    }}
                  >
                    {user.name[0]}
                  </Avatar>
                  <Typography sx={{ fontWeight: "bold", fontSize: 28, padding: 2 }} noWrap>
                      {user.name}
                    </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection:'column',
                      width: '100%'
                    }}
                  >
                    <Typography noWrap>
                      Public Key: {user.publicKey}
                    </Typography>
                    <Typography noWrap>
                      Email: {user.email}
                    </Typography>
                    <Typography noWrap>
                      Phone: {user.phone}
                    </Typography>

                    {user.roles[0] == "STUDENT" ? (
                      <>
                        <Typography noWrap>
                          Department: {user.department.name}
                        </Typography>
                        <Typography noWrap>
                          Hostel: {user.hostel.name}
                        </Typography>
                      </>
                    ) : user.roles[0] == "HOD" ? (
                      <>
                        <Typography noWrap>
                          Role: Admin (HoD)
                        </Typography>
                        <Typography noWrap>
                          Department: {user.department.name}
                        </Typography>
                      </>
                    ) : user.roles[0] == "WARDEN" ? (
                      <>
                        <Typography noWrap>
                          Role: Admin (Warden)
                        </Typography>
                        <Typography noWrap>
                          Hostel: {user.hostel.name}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography noWrap>
                          Role: System Admin
                        </Typography>
                      </>
                    )}

                    <Typography noWrap>
                      Profile status: {user.isApproved ? "Approved" : "Pending"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {user.roles[0] == "HOD" || user.roles[0] == "WARDEN" ? (
              <AdminDashboard />
            ) : user.roles[0] == "SYSTEM_ADMIN" ? (
              <SystemAdminDashboard />
            ) : (
              <StudentDashboard />
            )}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default Dashboard;
